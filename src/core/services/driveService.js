import { authService } from './authService';
import { dbAdapter } from '../adapters/sqliteAdapter';

class DriveService {
  constructor() {
    this.driveApiUrl = 'https://www.googleapis.com/drive/v3/files';
    this.driveUploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
    this.folderName = 'ProFicha_Respaldos_2026';
  }

  async getAuthHeaders() {
    const user = await authService.getCurrentUser();
    if (!user || !user.accessToken) {
      throw new Error('Sesión de Google no encontrada. Inicia sesión primero.');
    }
    return {
      'Authorization': `Bearer ${user.accessToken}`
    };
  }

  async ensureAppFolder() {
    const headers = await this.getAuthHeaders();
    
    // 1. Buscar si la carpeta ya existe
    const query = encodeURIComponent(`name='${this.folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`);
    const searchRes = await fetch(`${this.driveApiUrl}?q=${query}&fields=files(id, name)`, {
      method: 'GET',
      headers: headers
    });
    
    const searchData = await searchRes.json();
    
    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }

    // 2. Si no existe, crearla
    const createRes = await fetch(this.driveApiUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.folderName,
        mimeType: 'application/vnd.google-apps.folder'
      })
    });

    const createData = await createRes.json();
    return createData.id;
  }

  async uploadDatabaseBackup() {
    try {
      const folderId = await this.ensureAppFolder();
      
      // Extraer toda la información de la base de datos local SQLite
      const pacientesRes = await dbAdapter.executeQuery('SELECT * FROM pacientes;');
      const expedientesRes = await dbAdapter.executeQuery('SELECT * FROM expedientes;');
      
      // Estructurar el respaldo (ej. datos de bienestar muscular integral, acupuntura, etc.)
      const backupData = {
        version_sistema: '2026.1.0',
        fecha_respaldo: new Date().toISOString(),
        pacientes: pacientesRes.values || [],
        expedientes: expedientesRes.values || []
      };

      const fileContent = JSON.stringify(backupData, null, 2);
      const fileName = `respaldo_proficha_${new Date().getTime()}_2026.json`;

      const headers = await this.getAuthHeaders();
      
      // Preparar el cuerpo del mensaje multipart para Google Drive
      const boundary = '-------314159265358979323846';
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;

      const metadata = {
        name: fileName,
        mimeType: 'application/json',
        parents: [folderId]
      };

      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        fileContent +
        closeDelimiter;

      const uploadRes = await fetch(this.driveUploadUrl, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartRequestBody
      });

      if (!uploadRes.ok) {
        throw new Error('Falló la subida del archivo a Google Drive.');
      }

      return await uploadRes.json();
    } catch (error) {
      console.error('Error en el servicio de Drive:', error);
      throw error;
    }
  }
}

export const driveService = new DriveService();
