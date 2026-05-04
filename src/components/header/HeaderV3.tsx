import MainMenu from "./MainMenu";
import HeaderSidebar from "./HeaderSidebar";
import { Link } from "react-router-dom";
import logoMix from "/assets/img/logo-mix.png";
import logo from "/assets/img/logo.png";
import HeaderSearch from "./HeaderSearch";
import HeaderCart from "./HeaderCart";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useStickyMenu from "../../hooks/useStickyMenu";
import useSearchBar from "../../hooks/useSearchBar";
import useSidebarInfo from "../../hooks/useSidebarInfo";

const HeaderV3 = () => {

    const toggleSubMenu = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();
    const { openSearch, searchClose } = useSearchBar();
    const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav less-logo navbar-common nav-left-attr navbar-default validnavs navbar-sticky on no-full ${isMenuSticky ? 'sticked' : ''} ${isOpen ? "pause-sticked" : ""}`}>
                    <HeaderSearch openSearch={openSearch} searchClose={searchClose} />
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="navbar-brand-left">

                            <HeaderSidebar openInfoBar={openInfoBar} closeInfoBar={closeInfoBar} isInfoOpen={isInfoOpen} />

                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                    <i className="fa fa-bars" />
                                </button>
                                <Link className="navbar-brand" to="/">
                                    <img src={logoMix} className="logo" alt="Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className={`collapse navbar-collapse ${isOpen ? "show collapse-mobile" : "collapse-mobile"}`} id="navbar-menu">
                            <img src={logo} alt="Logo" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times" />
                            </button>
                            <MainMenu navbarPlacement="navbar-right" toggleSubMenu={toggleSubMenu} />
                        </div>
                        <HeaderCart />
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
                </nav>
            </header>
        </>
    );
};

export default HeaderV3;