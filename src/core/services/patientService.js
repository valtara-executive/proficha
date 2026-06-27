import { v4 as uuidv4 } from 'uuid';
import { patientRepository } from '../repositories/patientRepository';

class PatientService {
  
  async registerPatient(data) {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del paciente es obligatorio para el expediente.');
    }

    const newPatient = {
      id: uuidv4(),
      nombre: data.nombre.trim(),
      correo: data.correo ? data.correo.trim() : null,
      telefono: data.telefono ? data.telefono.trim() : null,
      fecha_registro: new Date().toISOString(),
      estado_sincronizacion: 0 // 0 = Pendiente de subir a Google Drive
    };

    return await patientRepository.create(newPatient);
  }

  async getAllPatients() {
    return await patientRepository.findAll();
  }
}

export const patientService = new PatientService();
