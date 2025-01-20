import logoIcon from '../../../public/images/movie/logo.svg';
export const Header = () => {
    return (
        <>
            <header>
                <h1 className="l-header">
                    <img src={logoIcon} alt="BEST" className="headerLogo" />
                </h1>
            </header>
        </>
    );
};