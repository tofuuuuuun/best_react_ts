import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import { MovieApp } from '@/movie/MovieApp';
import { Link, Route, Routes } from 'react-router-dom';

const TYPE = 'home';

export const App = () => {

  return (
    <>
      <Header type={TYPE} />
      <main>
        <Routes>
          <Route path='/album' element={<AlbumApp />} />
          <Route path='/movie' element={<MovieApp />} />
        </Routes>
        <h1>Home</h1>
        <Link to='/album'>album</Link>
        <Link to='/movie'>movie</Link>
        <ul>
          <li>album</li>
          <li>movie</li>
        </ul>
      </main >
    </>
  )
}