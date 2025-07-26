// imports
import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import Transition from "./_templates/Transition";

// module
const blank_credentials = {
    email: "",
    password: "",
};

// component
const LoginForm = (props) => {
    // state
    const [credentials, setCredentials] = useState(blank_credentials);
    const [authenticating, setAuthenticating] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        success: false,
        message: [],
    });

    const navigate = useNavigate();

    // handlers
    const handleLogin = async (e, login_credentials) => {
        const freighble_alert = document.getElementById("freighble_alert");
        const toast = Toast.getOrCreateInstance(freighble_alert);
        e.preventDefault();
        setAuthenticating(true);

        const url = `/api/${
            props.role === "user"
                ? "users"
                : props.role === "vendor"
                ? "vendors"
                : "BAD_REQUEST"
        }/login`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login_credentials),
        });

        const response_data = await response.json(); // Parse the JSON response

        try {
            if (!response.ok) {
                throw new Error(
                    `${JSON.stringify(response_data.error.errors)}`
                );
            }

            setCredentials(blank_credentials);
            setToastMessage({
                success: true,
                message: [response_data.msg],
            });
            localStorage.setItem("token", response_data.token);
            localStorage.setItem("user", JSON.stringify(response_data.user));
            props.CONDITIONAL_RENDERING.setSession(
                JSON.parse(localStorage.getItem("user"))
            );
            window.scrollTo(0, 0);
            toast.show();
            setTimeout(() => {
                navigate(`/dashboard`);
            }, 500);
        } catch (error) {
            setAuthenticating(false);
            const err_variables = Object.keys(response_data.error.errors);
            const errors = err_variables.map((err) => {
                return response_data.error.errors[err].message;
            });

            setToastMessage({
                success: false,
                message: errors,
            });
            window.scrollTo(0, 0);
            toast.show();
        }
    };

    // render
    return (
        <Fragment>
            <div className="row justify-content-center pt-5">
                {!authenticating ? (
                    <div className="col-8 py-4">
                        <h5 className="display-5 py-4">
                            {props.role === "user"
                                ? "User"
                                : props.role === "vendor"
                                ? "Vendor"
                                : "BAD_REQUEST"}{" "}
                            Login
                        </h5>
                        <form
                            id="user_login"
                            className="shadow-sm border rounded-4 p-4 bg-light needs-validation"
                            onSubmit={(e) => handleLogin(e, credentials)}
                        >
                            <div className="row border-bottom mb-4">
                                <div className="col-12">
                                    <h6 className="display-6 text-dark fw-bold brand-font">
                                        FREIGHBLE CREDENTIALS
                                    </h6>
                                </div>
                            </div>

                            <fieldset className="row mb-4">
                                <div className="col-12 mb-2">
                                    <label
                                        htmlFor="login_email"
                                        className={`fw-medium text-${
                                            credentials.email
                                                ? "primary"
                                                : "dark-emphasis"
                                        }`}
                                    >
                                        email address
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${
                                            credentials.email
                                                ? "border-primary"
                                                : ""
                                        }`}
                                        placeholder="Email address"
                                        id="login_email"
                                        name="login_email"
                                        value={credentials.email}
                                        onChange={(e) => {
                                            setCredentials((prev) => {
                                                return {
                                                    ...prev,
                                                    email: e.target.value,
                                                };
                                            });
                                        }}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="col-12 mb-2">
                                    <label
                                        htmlFor="login_password"
                                        className={`fw-medium text-${
                                            credentials.password
                                                ? "primary"
                                                : "dark-emphasis"
                                        }`}
                                    >
                                        password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${
                                            credentials.password
                                                ? "border-primary"
                                                : ""
                                        }`}
                                        placeholder="Password"
                                        id="login_password"
                                        name="login_password"
                                        value={credentials.password}
                                        onChange={(e) => {
                                            setCredentials((prev) => {
                                                return {
                                                    ...prev,
                                                    password: e.target.value,
                                                };
                                            });
                                        }}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="col-12 mb-2">
                                    <span className="text-secondary fw-normal">
                                        don't have a Freighble
                                        {props.role === "vendor"
                                            ? " vendor"
                                            : ""}{" "}
                                        account?{" "}
                                        <Link
                                            className="fw-medium"
                                            to={
                                                props.role === "vendor"
                                                    ? "/vendors/vendor"
                                                    : "/register"
                                            }
                                        >
                                            Register here
                                        </Link>
                                    </span>
                                </div>
                            </fieldset>

                            <button
                                type="submit"
                                className="btn btn-dark bg-gradient shadow-sm fw-medium w-100 rounded-3"
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                ) : (
                    <Transition
                        variables={{
                            type: [
                                "Authenticating",
                                "Redirecting",
                                "Loading",
                            ][0],
                            loader: ["spinner-border", "spinner-grow"][1],
                            message: "",
                        }}
                    />
                )}
            </div>

            {/* Informative toast */}
            <div className="toast-container rounded-3 position-fixed top-0 end-0 p-3">
                <div
                    id="freighble_alert"
                    className="toast rounded-3"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header rounded-top-3 border text-bg-primary">
                        <strong className="me-auto">Freighble</strong>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="toast-body rounded-bottom-3 bg-light">
                        {toastMessage.success ? (
                            <Fragment>
                                <i className="bi bi-check-circle-fill text-success"></i>{" "}
                                <span className="text-success fw-medium">
                                    Success!
                                </span>
                                <ul>
                                    {toastMessage.message.map(
                                        (bullet, index) => {
                                            return (
                                                <li key={`error-msg_${index}`}>
                                                    {bullet}
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <i className="bi bi-exclamation-circle-fill text-danger"></i>{" "}
                                <span className="text-danger fw-medium">
                                    Something went wrong
                                </span>
                                <ul>
                                    {toastMessage.message.map(
                                        (bullet, index) => {
                                            return (
                                                <li key={`error-msg_${index}`}>
                                                    {bullet}
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginForm;
