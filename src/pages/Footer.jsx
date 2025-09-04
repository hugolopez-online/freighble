import { Link } from "react-router-dom";

const Footer = ({ anchor, setAnchor }) => {
    return (
        <footer className="row justify-content-center text-bg-dark">
            <div className="col-10 py-5">
                <div className="row">
                    {/* Left: Branding and tagline */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h4 className="fw-bold">Freighble Technologies</h4>
                        <p className="fw-light small">
                            Freight made reliable. Smart carrier search. No
                            clutter, just matches.
                        </p>
                    </div>

                    {/* Right: Quick links */}
                    <div className="col-md-6 d-flex flex-column align-items-md-end text-md-end">
                        <h4 className="fw-bold mb-3">Quick Links</h4>
                        <ul className="list-unstyled small">
                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="text-decoration-none link-light"
                                    onClick={() => setAnchor("website_hero")}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="text-decoration-none link-light"
                                    onClick={() => setAnchor("about")}
                                >
                                    About
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="text-decoration-none link-light"
                                    onClick={() => setAnchor("contact")}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/login"
                                    className="text-decoration-none link-light"
                                >
                                    User Portal
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/vendors/login"
                                    className="text-decoration-none link-light"
                                >
                                    Vendor Portal
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/general-terms-and-conditions"
                                    className="text-decoration-none link-light"
                                >
                                    Terms and Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-light my-4" />

                <div className="text-center small">
                    &copy; {new Date().getFullYear()} Freighble Technologies.
                    All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
