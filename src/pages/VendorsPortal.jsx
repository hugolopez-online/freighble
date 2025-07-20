import { Link } from "react-router-dom";

const VendorsPortal = () => {
    return (
        <div className="row justify-content-center pt-5">
            <div className="col-10 py-4">
                <h1 className="display-1">Vendors Portal</h1>
            </div>
            <div className="col-10 pb-4">
                <p>
                    If you're already a Freighble Vendor, log in to review and
                    manage your information. Otherwise, you can register in just
                    a few minutes.
                </p>
                <Link
                    to="login"
                    className="btn btn-lg btn-dark bg-gradient"
                >
                    Vendor Log In
                </Link>
                <Link
                    to="vendor"
                    className="btn btn-lg btn-primary bg-gradient"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default VendorsPortal;
