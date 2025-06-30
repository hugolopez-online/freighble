import { Link } from "react-router-dom";

const Footer = ({ anchor, setAnchor }) => {
    return (
        <footer className="row justify-content-center text-bg-dark">
            <div className="col-10 py-5">
                <div className="row">
                    {/* Left: Branding and tagline */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h4 className="fw-bold">Freighble</h4>
                        <p className="fw-light small">
                            Freight made reliable. Your trusted carrier search
                            solution.
                        </p>
                    </div>

                    {/* Right: Quick links */}
                    <div className="col-md-6 d-flex flex-column align-items-md-end">
                        <h6 className="fw-bold mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
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
                                    to="/register"
                                    className="text-decoration-none link-light"
                                >
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-light my-4" />

                <div className="text-center small">
                    &copy; {new Date().getFullYear()} Freighble. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
