// ═══════════════════════════════════════════════════════════════
// ProFicha — Google Drive Sync Engine v1.0
// Carpetas organizadas por sector + respaldo automático
// ═══════════════════════════════════════════════════════════════

const DRIVE_ROOT_FOLDER = 'ProFicha — Expedientes'
const SCOPES = 'https://www.googleapis.com/auth/drive.file'
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

// ── Intervalos de respaldo disponibles ─────────────────────────
export const BACKUP_INTERVALS = [
  { id: 'manual',  label: 'Solo manual',  labelEn: 'Manual only',  ms: null },
  { id: '1h',      label: 'Cada hora',    labelEn: 'Every hour',   ms: 1 * 60 * 60 * 1000 },
  { id: '5h',      label: 'Cada 5 horas', labelEn: 'Every 5 hours',ms: 5 * 60 * 60 * 1000 },
  { id: '8h',      label: 'Cada 8 horas', labelEn: 'Every 8 hours',ms: 8 * 60 * 60 * 1000 },
  { id: '24h',     label: 'Cada día',     labelEn: 'Every day',    ms: 24 * 60 * 60 * 1000 },
  { id: '168h',    label: 'Cada semana',  labelEn: 'Every week',   ms: 7 * 24 * 60 * 60 * 1000 },
]

// ── Storage helpers ─────────────────────────────────────────────
const store = {
  get: (k, d) => { try { const v = localStorage.getItem(`pf_drive_${k}`); return v ? JSON.parse(v) : d } catch { return d } },
  set: (k, v) => { try { localStorage.setItem(`pf_drive_${k}`, JSON.stringify(v)) } catch {} },
}

// ── Normaliza nombre de carpeta ─────────────────────────────────
const safeName = (str) =>
  (str || 'Sin nombre')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[<>:"/\\|?*]/g, '-')
    .trim()

// ── Formatear fecha para nombres de archivo ─────────────────────
const dateStamp = () => {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}m`
}

// ═══════════════════════════════════════════════════════════════
// CLASE PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export class DriveSync {
  constructor() {
    this.tokenClient = null
    this.accessToken = store.get('accessToken', null)
    this.rootFolderId = store.get('rootFolderId', null)
    this.sectorFolders = store.get('sectorFolders', {})
    this.patientFolders = store.get('patientFolders', {})
    this.backupInterval = store.get('backupInterval', 'manual')
    this.lastBackup = store.get('lastBackup', null)
    this._timer = null
    this.onStatusChange = null // callback externo
  }

  // ── Estado público ──────────────────────────────────────────
  isConnected() { return !!this.accessToken }
  getLastBackup() { return this.lastBackup }
  getBackupInterval() { return this.backupInterval }

  // ── Autenticación OAuth2 via Google Identity Services ───────
  async connect(clientId) {
    return new Promise((resolve, reject) => {
      if (!window.google?.accounts?.oauth2) {
        reject(new Error('Google Identity Services no cargado'))
        return
      }
      this.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES,
        callback: (resp) => {
          if (resp.error) { reject(new Error(resp.error)); return }
          this.accessToken = resp.access_token
          store.set('accessToken', resp.access_token)
          this._notify('connected')
          resolve(resp.access_token)
        },
      })
      this.tokenClient.requestAccessToken({ prompt: 'consent' })
    })
  }

  disconnect() {
    if (this.accessToken && window.google?.accounts?.oauth2) {
      window.google.accounts.oauth2.revoke(this.accessToken)
    }
    this.accessToken = null
    this.rootFolderId = null
    this.sectorFolders = {}
    this.patientFolders = {}
    store.set('accessToken', null)
    store.set('rootFolderId', null)
    store.set('sectorFolders', {})
    store.set('patientFolders', {})
    this._stopTimer()
    this._notify('disconnected')
  }

  // ── API fetch helper ────────────────────────────────────────
  async _api(method, endpoint, body = null, isUpload = false) {
    const base = isUpload
      ? 'https://www.googleapis.com/upload/drive/v3'
      : 'https://www.googleapis.com/drive/v3'
    const res = await fetch(`${base}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        ...(body && !isUpload ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? (isUpload ? body : JSON.stringify(body)) : null,
    })
    if (res.status === 401) { this.accessToken = null; store.set('accessToken', null); throw new Error('TOKEN_EXPIRED') }
    if (!res.ok) throw new Error(`Drive API error: ${res.status}`)
    return res.json()
  }

  // ── Crear o encontrar carpeta ───────────────────────────────
  async _findOrCreateFolder(name, parentId = null) {
    const q = `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false${parentId ? ` and '${parentId}' in parents` : ''}`
    const search = await this._api('GET', `/files?q=${encodeURIComponent(q)}&fields=files(id,name)`)
    if (search.files?.length) return search.files[0].id

    const meta = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      ...(parentId ? { parents: [parentId] } : {}),
    }
    const created = await this._api('POST', '/files', meta)
    return created.id
  }

  // ── Inicializar carpeta raíz ────────────────────────────────
  async _ensureRoot() {
    if (this.rootFolderId) return this.rootFolderId
    const id = await this._findOrCreateFolder(DRIVE_ROOT_FOLDER)
    this.rootFolderId = id
    store.set('rootFolderId', id)
    return id
  }

  // ── Carpeta de sector ───────────────────────────────────────
  // Ejemplo: ProFicha — Expedientes / Medicina General /
  async _ensureSectorFolder(sectorLabel) {
    const key = safeName(sectorLabel)
    if (this.sectorFolders[key]) return this.sectorFolders[key]
    const root = await this._ensureRoot()
    const id = await this._findOrCreateFolder(key, root)
    this.sectorFolders[key] = id
    store.set('sectorFolders', this.sectorFolders)
    return id
  }

  // ── Carpeta de paciente dentro de su sector ─────────────────
  // Ejemplo: Medicina General / Alfredo Guzmán Luna Pérez /
  async _ensurePatientFolder(patientName, sectorLabel) {
    const cacheKey = `${safeName(sectorLabel)}__${safeName(patientName)}`
    if (this.patientFolders[cacheKey]) return this.patientFolders[cacheKey]
    const sectorId = await this._ensureSectorFolder(sectorLabel)
    const folderName = safeName(patientName)
    const id = await this._findOrCreateFolder(folderName, sectorId)
    this.patientFolders[cacheKey] = id
    store.set('patientFolders', this.patientFolders)
    return id
  }

  // ── Subir un archivo JSON a la carpeta del paciente ─────────
  async _uploadFile(name, content, folderId) {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })

    const metadata = JSON.stringify({ name, parents: [folderId] })
    const boundary = 'proficha_boundary'
    const body = [
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}`,
      `\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${await blob.text()}`,
      `\r\n--${boundary}--`,
    ].join('')

    const res = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body,
      }
    )
    if (!res.ok) throw new Error(`Upload error: ${res.status}`)
    return res.json()
  }

  // ═══════════════════════════════════════════════════════════
  // BACKUP PRINCIPAL
  // Organiza: ProFicha / [Sector] / [Paciente] / expediente_fecha.json
  // ═══════════════════════════════════════════════════════════
  async backupAll(records, sectors) {
    if (!this.isConnected()) throw new Error('No conectado a Drive')
    if (!records?.length) return { uploaded: 0, skipped: 0 }

    const stamp = dateStamp()
    let uploaded = 0
    let errors = 0

    for (const record of records) {
      try {
        const sector = sectors?.find(s => s.id === record.sectorId)
        const sectorLabel = sector
          ? (record.lang === 'en' ? sector.label_en : sector.label) || sector.label
          : 'Sin sector'
        const patientName = record.patientName || 'Paciente sin nombre'

        const folderId = await this._ensurePatientFolder(patientName, sectorLabel)
        const fileName = `expediente_${safeName(patientName)}_${stamp}.json`
        await this._uploadFile(fileName, record, folderId)
        uploaded++
      } catch (e) {
        console.error(`Error subiendo expediente ${record.id}:`, e)
        errors++
      }
    }

    this.lastBackup = new Date().toISOString()
    store.set('lastBackup', this.lastBackup)
    this._notify('backup_done')
    return { uploaded, errors }
  }

  // ── Respaldo de configuración ───────────────────────────────
  async backupConfig(config) {
    if (!this.isConnected()) return
    const root = await this._ensureRoot()
    const stamp = dateStamp()
    await this._uploadFile(`config_${stamp}.json`, config, root)
  }

  // ═══════════════════════════════════════════════════════════
  // TIMER AUTOMÁTICO
  // ═══════════════════════════════════════════════════════════
  setBackupInterval(intervalId, records, sectors) {
    this._stopTimer()
    this.backupInterval = intervalId
    store.set('backupInterval', intervalId)

    const interval = BACKUP_INTERVALS.find(i => i.id === intervalId)
    if (!interval?.ms) return // manual

    this._timer = setInterval(async () => {
      try {
        await this.backupAll(records(), sectors)
        console.log(`[ProFicha Drive] Respaldo automático completado — ${new Date().toLocaleString()}`)
      } catch (e) {
        console.error('[ProFicha Drive] Error en respaldo automático:', e)
      }
    }, interval.ms)

    console.log(`[ProFicha Drive] Timer activo: respaldo cada ${interval.label}`)
  }

  _stopTimer() {
    if (this._timer) { clearInterval(this._timer); this._timer = null }
  }

  // ── Notificación interna ────────────────────────────────────
  _notify(event) {
    if (typeof this.onStatusChange === 'function') this.onStatusChange(event)
  }
}

// Instancia singleton exportada
export const driveSync = new DriveSync()
