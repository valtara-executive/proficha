import { useState, useCallback } from 'react';
import { recordService } from '../core/services/recordService';

export const useExpedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarExpedientesPaciente = useCallback(async (pacienteId) => {
    setLoading(true);
    try {
      const data = await recordService.getRecordsForPatient(pacienteId);
      setExpedientes(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando expedientes:', err);
      setError('No se pudieron cargar los expedientes.');
    } finally {
      setLoading(false);
    }
  }, []);

  const guardarExpediente = async (pacienteId, tipoFormulario, datosFormulario) => {
    setLoading(true);
    try {
      const nuevoExpediente = await recordService.saveNewRecord(pacienteId, tipoFormulario, datosFormulario);
      // Agregamos el nuevo expediente al inicio de la lista local
      setExpedientes(prev => [nuevoExpediente, ...prev]);
      setError(null);
      return nuevoExpediente;
    } catch (err) {
      console.error('Error guardando expediente:', err);
      setError(err.message || 'Error al guardar el expediente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    expedientes,
    loading,
    error,
    cargarExpedientesPaciente,
    guardarExpediente
  };
};
