import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)
