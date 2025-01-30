import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import { MovieApp } from '@/movie/MovieApp';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export const App = () => {

  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/album' element={<AlbumApp />} />
            <Route path='/movie' element={<MovieApp />} />

            <Link to='/album'>ALBUM</Link>
            <Link to='/movie'>MOVIE</Link>
          </Routes>
        </BrowserRouter>
      </main >
    </>
  )
}