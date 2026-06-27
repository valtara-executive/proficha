import { v4 as uuidv4 } from 'uuid';
import { recordRepository } from '../repositories/recordRepository';

class RecordService {
  async saveNewRecord(pacienteId, tipoFormulario, datosFormulario) {
    if (!pacienteId || !tipoFormulario || !datosFormulario) {
      throw new Error('Faltan datos obligatorios para crear el expediente.');
    }

    const newRecord = {
      id: uuidv4(),
      paciente_id: pacienteId,
      tipo_formulario: tipoFormulario, // ej. 'bienestar_muscular_integral', 'odontologia'
      datos_json: JSON.stringify(datosFormulario),
      fecha_creacion: new Date().toISOString(),
      version_local: 1,
      hash_integridad: this.generateSimpleHash(JSON.stringify(datosFormulario)),
      estado_sincronizacion: 0 // 0 = Pendiente de subir a Google Drive
    };

    return await recordRepository.create(newRecord);
  }

  async getRecordsForPatient(pacienteId) {
    const records = await recordRepository.findByPatient(pacienteId);
    // Parsear el JSON de vuelta a objeto Javascript para la UI
    return records.map(record => ({
      ...record,
      datos_json: JSON.parse(record.datos_json)
    }));
  }

  // Generador básico de hash para la futura sincronización incremental
  generateSimpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  }
}

export const recordService = new RecordService();
