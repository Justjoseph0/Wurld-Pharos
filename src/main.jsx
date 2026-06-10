import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './config/appkit.js'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
