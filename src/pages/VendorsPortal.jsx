import { Link } from "react-router-dom";

const VendorsPortal = () => {
    return (
        <div className="row justify-content-center pt-5">
            <div className="col-10 py-4">
                <h1 className="display-1">Vendors Portal</h1>
            </div>
            <div className="col-10 pb-4">
                <p>Become a Freighble vendor today!</p>
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
