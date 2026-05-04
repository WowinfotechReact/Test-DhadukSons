import logoMixLight from "/assets/img/logo-mix-light.png"
import { Link } from "react-router-dom";

const HeaderTopV2 = () => {
    return (
        <>
            <div className="top-bar top-style-two bg-dark text-light">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-xl-4 col-lg-4 col-md-4 info">
                            <ul>
                                <li>
                                    <div className="icon">
                                        <i className="fas fa-phone-alt" />
                                    </div>
                                    <div className="content">
                                        <span>Call Anytime</span>
                                        <a href="tel:+4733378901">+4733378901</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 logo">
                            <Link to="/">
                                <img src={logoMixLight} alt="Logo" />
                            </Link>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 text-end info">
                            <ul>
                                <li>
                                    <div className="icon">
                                        <i className="fas fa-comments-alt-dollar" />
                                    </div>
                                    <div className="content">
                                        <span>Write Email</span>
                                        <a href="mailto:info@agrul.com">info@agrul.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopV2;