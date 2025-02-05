import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import '@/css/home.css';
import { MovieApp } from '@/movie/MovieApp';
import { Link, Route, Routes } from 'react-router-dom';

const TYPE = 'home';

export const App = () => {

  return (
    <>
      <Header type={TYPE} />
      <Routes>
        <Route path='/album' element={<AlbumApp />} />
        <Route path='/movie' element={<MovieApp />} />
      </Routes>
      <main>
        <ul>
          <li className='l-linkCard'><Link to='/album'>album</Link></li>
          <li className='l-linkCard'><Link to='/movie'>movie</Link></li>
        </ul>
      </main >
    </>
  )
}