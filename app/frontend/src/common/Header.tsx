import homeLogoIcon from '@/images//homeLogo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBase = () => {

    return (
        <>
            <header className="l-header">
                <h1 className='u-p-left-1em'>
                    <img src={homeLogoIcon} alt="BEST - あなたの好きが見えるリスト作成サービス" className='m-logo' />
                </h1>
                <nav className='m-gnav'>
                    <ul className='m-gnav__list'>
                        <li className='m-gnav__list--items'>
                            <Link to='/' className='u-txt-white u-ta-center'>TOP</Link>
                        </li>
                        <li className='m-gnav__list--items'>
                            <Link to='/album' className='u-txt-white u-ta-center'>MUSIC</Link>
                        </li>
                        <li className='m-gnav__list--items'>
                            <Link to='/movie' className='u-txt-white u-ta-center'>MOVIE</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export const Header = React.memo(HeaderBase);
Header.displayName = 'Header';