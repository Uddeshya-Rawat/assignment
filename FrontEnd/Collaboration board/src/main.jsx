import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './Components/Router.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={AppRouter}>
     <App />
   </RouterProvider>
  </StrictMode>,
)
