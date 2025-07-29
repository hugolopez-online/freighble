import { Link } from "react-router-dom";

const VendorsPortal = () => {
    return (
        <div className="row justify-content-center pt-5">
            <div className="col-11 col-md-9 py-4">
                <h1 className="display-1">Vendors Portal</h1>
                <section className="container my-5">
                    <h2 className="text-center mb-4">Vendors Portal</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="p-4 border rounded shadow-sm bg-light">
                                <p className="lead text-center">
                                    Join our network and get matched with
                                    shippers who need exactly what you offer.
                                </p>
                                <ul className="list-group my-3">
                                    <li
                                        className="list-group-item"
                                        style={{ position: "inherit" }}
                                    >
                                        <i className="bi bi-geo-alt text-primary me-2"></i>{" "}
                                        Set your coverage and specializations
                                    </li>
                                    <li
                                        className="list-group-item"
                                        style={{ position: "inherit" }}
                                    >
                                        <i className="bi bi-person-check text-primary me-2"></i>{" "}
                                        Get discovered by verified clients
                                    </li>
                                    <li
                                        className="list-group-item"
                                        style={{ position: "inherit" }}
                                    >
                                        <i className="bi bi-toggle2-on text-primary me-2"></i>{" "}
                                        Stay in full control of your
                                        availability
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="col-11 col-md-9 pb-4">
                <p>
                    If you're already a Freighble Vendor, log in to review and
                    manage your information. Otherwise, you can register in just
                    a few minutes.
                </p>
                <Link
                    to="login"
                    className="btn btn-primary bg-gradient fw-medium me-2"
                >
                    Vendor Login
                </Link>
                <Link
                    to="vendor"
                    className="btn btn-dark fw-medium bg-gradient"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default VendorsPortal;
