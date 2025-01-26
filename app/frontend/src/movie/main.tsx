import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/css/common.css'
import '/css/movie/style.css'
import { MovieApp } from '/movie/MovieApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieApp />
  </StrictMode>,
)
