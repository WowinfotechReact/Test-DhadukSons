import { Link } from "react-router-dom";
import logoLight from "/assets/img/logo-light.png"
import logo from "/assets/img/logo.png"
import MainMenu from './MainMenu';
import HeaderCart from './HeaderCart';
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useStickyMenu from "../../hooks/useStickyMenu";

const HeaderV2 = () => {

    const toggleSubMenu = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-style-one navbar-sticky navbar-default validnavs white navbar-fixed on no-full ${isMenuSticky ? 'sticked' : 'no-background'}`}>
                    <div className="container-full d-flex justify-content-between align-items-center">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                                <i className="fa fa-bars" />
                            </button>
                            <Link className="navbar-brand" to="/">
                                <img src={logoLight} className="logo desktop" alt="Logo" />
                                <img src={logo} className="logo logo-mobile" alt="Logo" />
                            </Link>
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

export default HeaderV2;