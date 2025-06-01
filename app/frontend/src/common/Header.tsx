import homeLogoIcon from '@/images//homeLogo.svg';
import { headerProps } from "@/types/types";
import { Link } from 'react-router-dom';

export const Header = (props: headerProps) => {
    const { type } = props;
    // const logoIcon = type === '/album' ? albumLogoIcon : type === '/movie' ? movieLogoIcon : homeLogoIcon;
    const logoIcon = homeLogoIcon;
    const homeLogoClass = type === '/' ? 'homeLogo' : 'contentLogo';

    return (
        <>
            <header className="l-header ta-center m-both-auto">
                <h1 className='logoPosition m-left-1em'><img src={logoIcon} alt="best" className={`headerLogo ${homeLogoClass}`} /></h1>
                <nav className='navWrapper m-right-1em'>
                    <ul className='navList'>
                        <li className='navText'><Link to='/' className='txt-white ta-center'>TOP</Link></li>
                        <li className='navText'><Link to='/album' className='txt-white ta-center'>MUSIC</Link></li>
                        <li className='navText'><Link to='/movie' className='txt-white ta-center'>MOVIE</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};