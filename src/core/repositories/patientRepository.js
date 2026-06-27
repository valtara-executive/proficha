import { dbAdapter } from '../adapters/sqliteAdapter';

class PatientRepository {
  
  async create(patientData) {
    const query = `
      INSERT INTO pacientes (id, nombre, correo, telefono, fecha_registro, estado_sincronizacion)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      patientData.id,
      patientData.nombre,
      patientData.correo,
      patientData.telefono,
      patientData.fecha_registro,
      patientData.estado_sincronizacion
    ];
    
    const result = await dbAdapter.executeRun(query, values);
    
    if (result.changes && result.changes.changes > 0) {
      return patientData;
    }
    throw new Error('No se pudo guardar el paciente en la base de datos local.');
  }

  async findAll() {
    const query = `SELECT * FROM pacientes ORDER BY nombre ASC;`;
    const result = await dbAdapter.executeQuery(query);
    return result.values || [];
  }
}

export const patientRepository = new PatientRepository();
