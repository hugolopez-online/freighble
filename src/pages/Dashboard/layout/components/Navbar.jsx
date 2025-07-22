// imports
import { Link, useNavigate } from "react-router-dom";

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
    greeting,
}) => {
    const navigate = useNavigate();

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
                        {/* <button className="btn btn-sm btn-light border bg-gradient text-secondary rounded-pill px-3 mx-1">
                            <i className="bi bi-gear-fill"></i>
                        </button> */}
                        <span className="text-dark fw-medium">
                            Welcome, {greeting}!
                        </span>
                        <div className="dropdown ms-2">
                            <button
                                className="btn btn-sm btn-primary bg-gradient rounded-pill px-3 ms-1"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-three-dots"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="profile"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item text-danger fw-medium"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user");

                                            navigate("/login");
                                        }}
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
