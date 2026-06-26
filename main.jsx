import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProFicha from './ProFicha.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProFicha />
  </StrictMode>
)
