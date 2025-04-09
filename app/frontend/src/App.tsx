import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import '@/css/home.css';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { MovieApp } from '@/movie/MovieApp';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

const TYPE = 'home';

export const App = () => {
  const location = useLocation();
  return (
    <>
      <main>
        <Routes location={location}>
          <Route path='/album' element={<AlbumApp key={location.pathname} />} />
          <Route path='/movie' element={<MovieApp key={location.pathname} />} />
        </Routes>
        {location.pathname === '/' && (
          <>
            <Header type={TYPE} />
            <ul className='linkWrapper'>
              <li className='l-linkCard'><Link to='/album' className='linkCard ta-center'><img src={albumLogoIcon}></img></Link></li>
              <li className='l-linkCard'><Link to='/movie' className='linkCard ta-center'><img src={movieLogoIcon}></img></Link></li>
            </ul>
          </>
        )}
      </main >
    </>
  )
}