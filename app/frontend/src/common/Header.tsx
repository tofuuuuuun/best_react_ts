import logoIcon from '../../public/images/logo.png';
export const Header = () => {
    return (
        <>
            <header>
                <div className="l-header ta-center">
                    <h1><img src={logoIcon} alt="タイトル" className="headerLogo" /></h1>
                </div>
            </header>
        </>
    );
};