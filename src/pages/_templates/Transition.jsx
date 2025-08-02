import { Fragment } from "react";

const Transition = ({ variables }) => {
    const { type, loader, message } = variables;

    const AUTH = type === "Authenticating";
    const REDIRECT = type === "Redirecting";

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-10 col-md-4 pt-5">
                <div
                    className={`alert alert-${
                        AUTH ? "success" : REDIRECT ? "warning" : "primary"
                    } rounded-4`}
                    role="alert"
                >
                    <div className="d-flex align-items-center">
                        <strong role="status">{type}...</strong>
                        <div
                            className={`${loader} ms-auto`}
                            aria-hidden="true"
                        ></div>
                    </div>
                    {message && (
                        <Fragment>
                            <hr />
                            <small>{message}</small>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transition;
