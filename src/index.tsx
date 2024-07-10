import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, GlobalStyle } from '@react95/core';
import '@react95/icons/icons.css'
// import ErrorBoundary from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <ErrorBoundary>
  <React.StrictMode>
  <ThemeProvider>
    <GlobalStyle />
    <App />
    </ThemeProvider>
  </React.StrictMode>
  // </ErrorBoundary>
)
