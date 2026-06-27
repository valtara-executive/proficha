import { useState, useCallback } from 'react';
import { patientService } from '../core/services/patientService';

export const usePacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarPacientes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await patientService.getAllPatients();
      setPacientes(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando pacientes:', err);
      setError('No se pudieron cargar los pacientes.');
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarPaciente = async (datos) => {
    setLoading(true);
    try {
      const nuevoPaciente = await patientService.registerPatient(datos);
      setPacientes(prev => [...prev, nuevoPaciente]);
      setError(null);
      return nuevoPaciente;
    } catch (err) {
      console.error('Error registrando paciente:', err);
      setError(err.message || 'Error al guardar el paciente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    pacientes,
    loading,
    error,
    cargarPacientes,
    registrarPaciente
  };
};
