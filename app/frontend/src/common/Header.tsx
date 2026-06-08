import homeLogoIcon from '@/images//homeLogo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBase = () => {

    return (
        <>
            <header className="l-header">
                <h1 className=''>
                    <img src={homeLogoIcon} alt="BEST - あなたの好きが見えるリスト作成サービス" className='c-logo' />
                </h1>
                <nav className='c-gnav'>
                    <ul className='c-gnav__list'>
                        <li className='c-gnav__list--items'>
                            <Link to='/'>TOP</Link>
                        </li>
                        <li className='c-gnav__list--items'>
                            <Link to='/album'>MUSIC</Link>
                        </li>
                        <li className='c-gnav__list--items'>
                            <Link to='/movie'>MOVIE</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export const Header = React.memo(HeaderBase);
Header.displayName = 'Header';