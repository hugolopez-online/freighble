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
                            <Link
                                className="btn text-light px-2"
                                to="/"
                            >
                                Pricing
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="register"
                            >
                                Register
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="login"
                            >
                                Login
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="dashboard"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
