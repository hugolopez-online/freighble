// imports
import { Link } from "react-router-dom";

import { Console } from "./";
import logo from "../../../../assets/img/logo_206x40.webp";
import icon from "../../../../assets/img/logo-icon_40x40.webp";

// component

const Navbar = ({
    specs,
    default_specs,
    resetSpecs,
    setSpecs,
    templateSpecs,
}) => {
    return (
        <nav className="navbar p-0">
            <div className="container-fluid">
                <Link
                    className="navbar-brand d-none d-md-block"
                    to="/"
                    target="_blank"
                >
                    <img
                        className="d-block"
                        height={20}
                        src={logo}
                        alt="Freighble logo"
                    />
                </Link>
                <Link
                    className="navbar-brand d-block d-md-none"
                    to="/"
                    target="_blank"
                >
                    <img
                        className="d-block"
                        height={30}
                        src={icon}
                        alt="Freighble icon"
                    />
                </Link>
                <div className="d-none d-md-block">
                    <Console
                        specs={specs}
                        default_specs={default_specs}
                        resetSpecs={resetSpecs}
                        setSpecs={setSpecs}
                        templateSpecs={templateSpecs}
                    />
                </div>
                <div className="navbar">
                    <div className="container-fluid">
                        <button className="btn btn-sm btn-light border bg-gradient text-secondary rounded-pill px-3 mx-1">
                            <i className="bi bi-gear-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-primary bg-gradient rounded-pill px-3 ms-1">
                            <i className="bi bi-person-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
