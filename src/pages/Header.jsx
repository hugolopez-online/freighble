// imports

import { Link } from "react-router-dom";

import logo from "../assets/img/logo_206x40.webp";
import logo_lighter from "../assets/img/logo-lighter_206x40.svg";
import logo_light from "../assets/img/logo-light_206x40.svg";

const Header = () => {
    return (
        <div className="row sticky-top">
            <nav className="col navbar rounded-4 m-3 website-header">
                <div className="container-fluid">
                    <Link to="/">
                        <img
                            className="d-block"
                            height={20}
                            src={logo_lighter}
                            alt="Freighble logo"
                        />
                    </Link>
                    <div className="navbar text-light header-menu p-0">
                        <div className="container-fluid px-0">
                            <div className="btn-group">
                                <Link
                                    className="btn bg-gradient text-light rounded-start-pill ps-3"
                                    to="/"
                                >
                                    Services
                                </Link>
                                <Link
                                    className="btn bg-gradient text-light px-2"
                                    to="/"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    className="btn bg-gradient text-light rounded-end-pill pe-3"
                                    to="/"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="navbar header-menu p-0">
                        <div className="container-fluid px-0">
                            <Link
                                className="btn text-light px-2"
                                to="register"
                            >
                                register
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="login"
                            >
                                login
                            </Link>
                            <Link
                                className="btn btn-sm btn-primary bg-gradient rounded-pill px-2"
                                to="dashboard"
                            >
                                DASHBOARD
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
