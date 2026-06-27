import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProFicha from './ProFicha.jsx'
import { dbAdapter } from './src/core/adapters/sqliteAdapter.js'

// Función asíncrona de arranque de la aplicación
const initApp = async () => {
  try {
    // 1. Encendemos el motor de base de datos local antes de mostrar la interfaz
    await dbAdapter.initDatabase();
    console.log('Motor SQLite inicializado correctamente.');
  } catch (error) {
    console.error('Error crítico al inicializar la base de datos local:', error);
  }

  // 2. Una vez encendida la DB, arrancamos tu aplicación de forma normal
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ProFicha />
    </StrictMode>
  )
};

// Ejecutamos el arranque
initApp();
