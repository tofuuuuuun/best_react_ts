import '@/css/common.css'
import '@/css/movie/style.css'
import { MovieApp } from '@/movie/MovieApp'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieApp />
  </StrictMode>,
)
