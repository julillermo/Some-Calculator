import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/openColor.css';
import './css/globals.css';

const {
  process: { versions }
} = window.electron;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log('node version:', versions.node);
console.log('chrome version:', versions.chrome);
console.log('electron version:', versions.electron);
