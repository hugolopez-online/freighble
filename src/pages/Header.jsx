// imports

import { Link } from "react-router-dom";

import logo from "../assets/img/logo_206x40.webp";

const Header = () => {
    return (
        <div className="row">
            <nav className="col navbar border text-bg-light rounded-4 m-3">
                <div className="container-fluid">
                    <Link to="/">
                        <img
                            className="d-block"
                            height={20}
                            src={logo}
                            alt="Freighble logo"
                        />
                    </Link>
                    <div className="navbar text-secondary header-menu p-0">
                        <div className="container-fluid px-0">
                            <Link
                                className="btn btn-light px-2"
                                to="/"
                            >
                                Pricing
                            </Link>
                            <Link
                                className="btn btn-light px-2"
                                to="register"
                            >
                                Register
                            </Link>
                            <Link
                                className="btn btn-light px-2"
                                to="login"
                            >
                                Login
                            </Link>
                            <Link
                                className="btn btn-light px-2"
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
