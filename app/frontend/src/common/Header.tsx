import logoIcon from '/public/album/logo.svg';

export const Header = () => {
    return (
        <>
            <header>
                <div className="l-header ta-center">
                    <h1><img src={logoIcon} alt="bestMusic" className="headerLogo" /></h1>
                </div>
            </header>
        </>
    );
};