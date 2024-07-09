import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, GlobalStyle } from '@react95/core';
import '@react95/icons/icons.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider>
    <GlobalStyle />
    <App />
  </ThemeProvider>
  // </React.StrictMode>,
)
