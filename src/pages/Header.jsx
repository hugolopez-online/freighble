// imports

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo_206x40.webp";
import logo_lighter from "../assets/img/logo-lighter_206x40.svg";
import logo_light from "../assets/img/logo-light_206x40.svg";

const Header = () => {
    const [anchor, setAnchor] = useState("");

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
                    <div className="navbar header-menu p-0">
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
                        </div>
                    </div>
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
                    <div className="navbar header-menu p-0">
                        <div className="container-fluid px-0">
                            <Link
                                className="btn text-light px-2"
                                to="/register"
                                onClick={() => {
                                    setAnchor("");
                                }}
                            >
                                register
                            </Link>
                            <Link
                                className="btn text-light px-2"
                                to="/login"
                                onClick={() => {
                                    setAnchor("");
                                }}
                            >
                                login
                            </Link>
                            <Link
                                className="btn btn-sm btn-primary bg-gradient rounded-pill px-3"
                                to="/dashboard"
                                onClick={() => {
                                    setAnchor("");
                                }}
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
