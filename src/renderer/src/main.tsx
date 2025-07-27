import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
const { versions } = window

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

console.log('node version:', versions.node())
console.log('chrome version:', versions.chrome())
console.log('electron version:', versions.electron())
