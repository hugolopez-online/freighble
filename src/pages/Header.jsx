// imports

import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo_206x40.webp";
import logo_lighter from "../assets/img/logo-lighter_206x40.svg";
import logo_light from "../assets/img/logo-light_206x40.svg";

const Header = ({ anchor, setAnchor, CONDITIONAL_RENDERING }) => {
    // effects
    useEffect(() => {
        setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 200);
        setAnchor("");
    }, [anchor]);

    // render
    return (
        <div
            id="website_header"
            className="row justify-content-center"
        >
            <nav className="col-11 navbar rounded-4 website-header position-fixed mt-3">
                <div className="container-fluid">
                    <Link
                        to="/"
                        onClick={() => {
                            setAnchor("website_hero");
                        }}
                    >
                        <img
                            className="d-block"
                            height={25}
                            src={logo_lighter}
                            alt="Freighble logo"
                        />
                    </Link>
                    <div className="dropdown brand-font d-md-none">
                        <button
                            className="btn btn-primary bg-gradient rounded-3"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-list"></i>
                        </button>
                        <ul
                            className="dropdown-menu dropdown-menu-end bg-light p-2 mt-3 text-center"
                            style={{ zIndex: "1020", width: "85vw" }}
                        >
                            <li>
                                <Link
                                    className="dropdown-item rounded py-2"
                                    to="/"
                                    onClick={() => {
                                        setAnchor("website_hero");
                                    }}
                                >
                                    home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item rounded py-2"
                                    to="/"
                                    onClick={() => {
                                        setAnchor("about");
                                    }}
                                >
                                    about
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item rounded py-2"
                                    to="/"
                                    onClick={() => {
                                        setAnchor("contact");
                                    }}
                                >
                                    contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item rounded py-2"
                                    to="/vendors"
                                    onClick={() => {
                                        setAnchor("");
                                    }}
                                >
                                    vendors
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            {!CONDITIONAL_RENDERING.session && (
                                <li>
                                    <Link
                                        className="dropdown-item rounded py-2"
                                        to="/register"
                                        onClick={() => {
                                            setAnchor("");
                                        }}
                                    >
                                        REGISTER
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    className="dropdown-item rounded py-2 text-bg-primary bg-gradient"
                                    to={
                                        !CONDITIONAL_RENDERING.session
                                            ? "/login"
                                            : "/dashboard"
                                    }
                                    onClick={() => {
                                        setAnchor("");
                                    }}
                                >
                                    {!CONDITIONAL_RENDERING.session
                                        ? "LOG IN"
                                        : "DASHBOARD"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar header-menu p-0 d-none d-md-block">
                        <div className="container-fluid px-0">
                            <Link
                                className="btn text-light px-2"
                                to="/"
                                onClick={() => {
                                    setAnchor("website_hero");
                                }}
                            >
                                home
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="/"
                                onClick={() => {
                                    setAnchor("about");
                                }}
                            >
                                about
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="/"
                                onClick={() => {
                                    setAnchor("contact");
                                }}
                            >
                                contact
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="/vendors"
                                onClick={() => {
                                    setAnchor("");
                                }}
                            >
                                vendors
                            </Link>
                            {!CONDITIONAL_RENDERING.session && (
                                <Fragment>
                                    <i className="bi bi-dot text-secondary"></i>
                                    <Link
                                        className="btn text-light px-2"
                                        to="/register"
                                        onClick={() => {
                                            setAnchor("");
                                        }}
                                    >
                                        REGISTER
                                    </Link>
                                </Fragment>
                            )}
                            <Link
                                className="btn btn-sm btn-primary bg-gradient rounded-3 px-3"
                                to={
                                    !CONDITIONAL_RENDERING.session
                                        ? "/login"
                                        : "/dashboard"
                                }
                                onClick={() => {
                                    setAnchor("");
                                }}
                            >
                                {!CONDITIONAL_RENDERING.session
                                    ? "LOG IN"
                                    : "DASHBOARD"}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
