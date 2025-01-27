import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AlbumApp } from '/album/components/AlbumApp';
import { Header } from '/common/Header';
import { MovieApp } from '/movie/MovieApp';

export const App = () => {

  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/album' element={<AlbumApp />} />
            <Route path='/movie' element={<MovieApp />} />
          </Routes>
        </BrowserRouter>
      </main >
    </>
  )
}