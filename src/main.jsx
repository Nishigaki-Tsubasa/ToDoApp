import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';


const root = document.getElementById('root');


createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,

)
