import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { EnergyTokenProvider } from './context/EnergyTokenContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <EnergyTokenProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </EnergyTokenProvider>
)
