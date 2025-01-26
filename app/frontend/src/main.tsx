import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/common.css'
import { App } from '/App'
import '/css/album/style.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
