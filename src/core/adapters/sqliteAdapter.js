import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

class SQLiteAdapter {
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db = null;
    this.isInitialized = false;
  }

  async initDatabase() {
    if (this.isInitialized) return;
    
    try {
      if (Capacitor.getPlatform() === 'web') {
        return; 
      }
      
      this.db = await this.sqlite.createConnection(
        'proficha_db', false, 'no-encryption', 1, false
      );
      
      await this.db.open();
      await this.createTables();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error inicializando SQLite Adapter:', error);
      throw error;
    }
  }

  async createTables() {
    const queryPacientes = `
      CREATE TABLE IF NOT EXISTS pacientes (
        id TEXT PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        correo TEXT,
        telefono TEXT,
        fecha_registro TEXT NOT NULL,
        estado_sincronizacion INTEGER DEFAULT 0
      );
    `;

    const queryExpedientes = `
      CREATE TABLE IF NOT EXISTS expedientes (
        id TEXT PRIMARY KEY NOT NULL,
        paciente_id TEXT NOT NULL,
        tipo_formulario TEXT NOT NULL,
        datos_json TEXT NOT NULL,
        fecha_creacion TEXT NOT NULL,
        version_local INTEGER DEFAULT 1,
        hash_integridad TEXT,
        estado_sincronizacion INTEGER DEFAULT 0,
        FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
      );
    `;

    const queryArchivos = `
      CREATE TABLE IF NOT EXISTS archivos_adjuntos (
        id TEXT PRIMARY KEY NOT NULL,
        expediente_id TEXT NOT NULL,
        tipo TEXT NOT NULL,
        uri_local TEXT NOT NULL,
        drive_id TEXT,
        FOREIGN KEY(expediente_id) REFERENCES expedientes(id)
      );
    `;

    await this.db.execute(queryPacientes);
    await this.db.execute(queryExpedientes);
    await this.db.execute(queryArchivos);
  }

  async executeQuery(query, values = []) {
    if (!this.isInitialized) await this.initDatabase();
    return await this.db.query(query, values);
  }

  async executeRun(query, values = []) {
    if (!this.isInitialized) await this.initDatabase();
    return await this.db.run(query, values);
  }
}

export const dbAdapter = new SQLiteAdapter();
