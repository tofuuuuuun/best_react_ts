import { AlbumApp } from '@/album/components/AlbumApp';
import { App } from '@/App';
import homeLogoIcon from '@/images//homeLogo.svg';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { MovieApp } from '@/movie/MovieApp';
import { headerProps } from "@/types/types";
import { Link, Route, Routes } from 'react-router-dom';

export const Header = (props: headerProps) => {
    const { type } = props;
    const logoIcon = type === '/album' ? albumLogoIcon : type === '/movie' ? movieLogoIcon : homeLogoIcon;
    const homeLogoClass = type === '/' ? 'homeLogo' : '';

    return (
        <>
            <header className="l-header ta-center">
                <h1 className='logoPosition'><img src={logoIcon} alt="best" className={`headerLogo ${homeLogoClass}`} /></h1>
                <Routes location={location}>
                    <Route path="/" element={
                        <>
                            <ul className='linkWrapper'>
                                <li className=''><Link to='/' className='ta-center'>TOP</Link></li>
                                <li className=''><Link to='/album' className='ta-center'>MUSIC</Link></li>
                                <li className=''><Link to='/movie' className='ta-center'>MOVIE</Link></li>
                            </ul>
                        </>
                    } />
                    <Route path='/' element={<App key={location.pathname} />} />
                    <Route path='/album' element={<AlbumApp key={location.pathname} />} />
                    <Route path='/movie' element={<MovieApp key={location.pathname} />} />
                </Routes>
            </header>
        </>
    );
};