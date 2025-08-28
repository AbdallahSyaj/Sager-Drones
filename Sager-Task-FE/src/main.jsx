import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom' 
import store from './store/index.js'
import App from './App.jsx'
import './Style/styles.css'

// we use HashRouter for better compatibility in different hosting environments
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>  
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
