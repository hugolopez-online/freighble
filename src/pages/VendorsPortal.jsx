import { Link } from "react-router-dom";

const VendorsPortal = () => {
    return (
        <div className="row justify-content-center pt-5">
            <div className="col-11 col-md-9 py-4">
                <h1 className="display-1">Vendors Portal</h1>
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
