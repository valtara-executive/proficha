import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProFicha from './proFicha.jsx'
import { dbAdapter } from './core/adapters/sqliteAdapter.js'

const initApp = async () => {
  try {
    await dbAdapter.initDatabase();
    console.log('Motor SQLite inicializado correctamente.');
  } catch (error) {
    console.error('Error crítico al inicializar la base de datos local:', error);
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ProFicha />
    </StrictMode>
  )
};

initApp();
