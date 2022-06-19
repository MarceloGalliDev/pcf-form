import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './services/firebase';
import './main.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


