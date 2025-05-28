import homeLogoIcon from '@/images//homeLogo.svg';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { headerProps } from "@/types/types";
import { Link } from 'react-router-dom';

export const Header = (props: headerProps) => {
    const { type } = props;
    const logoIcon = type === '/album' ? albumLogoIcon : type === '/movie' ? movieLogoIcon : homeLogoIcon;
    const homeLogoClass = type === '/' ? 'homeLogo' : '';

    return (
        <>
            <header className="l-header ta-center m-both-auto">
                <h1 className='logoPosition'><img src={logoIcon} alt="best" className={`headerLogo ${homeLogoClass}`} /></h1>
                <nav>
                    <ul className='navWrapper'>
                        <li className='navText'><Link to='/' className='txt-white ta-center'>TOP</Link></li>
                        <li className='navText'><Link to='/album' className='txt-white ta-center'>MUSIC</Link></li>
                        <li className='navText'><Link to='/movie' className='txt-white ta-center'>MOVIE</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};