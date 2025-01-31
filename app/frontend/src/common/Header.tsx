import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { headerProps } from "@/types/types";

export const Header = (props: headerProps) => {
    const { type } = props;
    const logoIcon = type === 'album' ? albumLogoIcon : movieLogoIcon;
    return (
        <>
            <header>
                <div className="l-header ta-center">
                    <h1><img src={logoIcon} alt="best" className="headerLogo" /></h1>
                </div>
            </header>
        </>
    );
};