import { dbAdapter } from '../adapters/sqliteAdapter';

class RecordRepository {
  async create(recordData) {
    const query = `
      INSERT INTO expedientes (id, paciente_id, tipo_formulario, datos_json, fecha_creacion, version_local, hash_integridad, estado_sincronizacion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      recordData.id,
      recordData.paciente_id,
      recordData.tipo_formulario,
      recordData.datos_json,
      recordData.fecha_creacion,
      recordData.version_local,
      recordData.hash_integridad,
      recordData.estado_sincronizacion
    ];
    
    const result = await dbAdapter.executeRun(query, values);
    return result.changes.changes > 0 ? recordData : null;
  }

  async findByPatient(paciente_id) {
    const query = `SELECT * FROM expedientes WHERE paciente_id = ? ORDER BY fecha_creacion DESC;`;
    const result = await dbAdapter.executeQuery(query, [paciente_id]);
    return result.values || [];
  }
}

export const recordRepository = new RecordRepository();
