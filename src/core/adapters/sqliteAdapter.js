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
      // Si por alguna razón pruebas en el navegador web local con Vite, evitamos que la app colapse.
      // En la APK final (Android), esto siempre pasará de largo y conectará con SQLite nativo.
      if (Capacitor.getPlatform() === 'web') {
        console.warn('Ejecutando en entorno Web. SQLite nativo no está disponible aquí. Usa un emulador o dispositivo físico para probar la base de datos.');
        return; 
      }
      
      this.db = await this.sqlite.createConnection(
        'proficha_db', false, 'no-encryption', 1, false
      );
      
      await this.db.open();
      await this.createTables();
      this.isInitialized = true;
      console.log('Base de datos SQLite inicializada correctamente.');
    } catch (error) {
      console.error('Error crítico inicializando SQLite Adapter:', error);
      throw error;
    }
  }

  async createTables() {
    const query = `
      CREATE TABLE IF NOT EXISTS pacientes (
        id TEXT PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        correo TEXT,
        telefono TEXT,
        fecha_registro TEXT NOT NULL,
        estado_sincronizacion INTEGER DEFAULT 0
      );
    `;
    await this.db.execute(query);
  }

  async executeQuery(query, values = []) {
    if (!this.isInitialized) await this.initDatabase();
    if (!this.db) return { values: [] }; // Prevención de errores en entorno web
    return await this.db.query(query, values);
  }

  async executeRun(query, values = []) {
    if (!this.isInitialized) await this.initDatabase();
    if (!this.db) return { changes: { changes: 0 } }; // Prevención de errores en entorno web
    return await this.db.run(query, values);
  }
}

export const dbAdapter = new SQLiteAdapter();
