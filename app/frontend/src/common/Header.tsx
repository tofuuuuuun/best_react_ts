import homeLogoIcon from '@/images//homeLogo.svg';
import React from 'react';

const HeaderBase = () => {

    return (
        <>
            <header className="l-header">
                <h1 className=''>
                    <img src={homeLogoIcon} alt="BEST-あなたの好きが見えるリスト作成サービス" className='c-logo' />
                </h1>
            </header>
        </>
    );
};

export const Header = React.memo(HeaderBase);
Header.displayName = 'Header';