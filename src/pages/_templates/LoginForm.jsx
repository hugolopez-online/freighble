/* IMPORTS START */
import { Toast } from "bootstrap";
import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Transition from "./Transition";
/* IMPORTS END */

/* MODULE START */
const BLANK_CREDENTIALS = {
    email: "",
    password: "",
};
/* MODULE END */

/* COMPONENT START */
const LoginForm = ({ role, CONDITIONAL_RENDERING, theme }) => {
    // state
    const [credentials, setCredentials] = useState(BLANK_CREDENTIALS);
    const [showPassword, setShowPassword] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        success: false,
        message: [],
    });

    // module
    const navigate = useNavigate();

    // handlers
    const handleLogin = async (e, login_credentials) => {
        e.preventDefault();

        const FREIGHBLE_ALERT = document.getElementById("freighble_alert");
        const toast = Toast.getOrCreateInstance(FREIGHBLE_ALERT);

        setAuthenticating(true);

        const URL = `/api/${role}s/login`;

        const RES = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login_credentials),
        });

        const RES_DATA = await RES.json();

        try {
            if (!RES.ok) {
                throw new Error(`${JSON.stringify(RES_DATA.error.errors)}`);
            }

            setCredentials(BLANK_CREDENTIALS);
            setToastMessage({
                success: true,
                message: [RES_DATA.msg],
            });
            localStorage.setItem("token", RES_DATA.token);
            localStorage.setItem("user", JSON.stringify(RES_DATA.user));
            CONDITIONAL_RENDERING.setSession(
                JSON.parse(localStorage.getItem("user"))
            );
            window.scrollTo(0, 0);
            toast.show();
            setTimeout(() => {
                navigate(`/dashboard`);
            }, 500);
        } catch (error) {
            setAuthenticating(false);
            const err_variables = Object.keys(RES_DATA.error.errors);
            const errors = err_variables.map((err) => {
                return RES_DATA.error.errors[err].message;
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
                    <div className="col-11 col-md-7 py-4">
                        <h5
                            className={`display-5 ${
                                theme === "light" ? "" : "text-light"
                            } text-capitalize py-4`}
                        >
                            {role} portal
                        </h5>
                        {role === "vendor" && (
                            <div
                                className={`border border-warning bg-warning bg-opacity-25 text-warning${
                                    theme === "light" ? "-emphasis" : ""
                                } rounded p-3 mb-3`}
                            >
                                Please note you're in our vendor's login portal,
                                reserved for Freighble vendors. If you're an app
                                user, please go to the{" "}
                                <Link
                                    className="fw-medium"
                                    to="/login"
                                >
                                    user's login portal
                                </Link>
                                .
                            </div>
                        )}
                        <form
                            id="user_login"
                            className={`shadow-sm border rounded-4 p-4 bg-${
                                theme === "light"
                                    ? "light"
                                    : "black bg-gradient border-secondary"
                            } needs-validation`}
                            onSubmit={(e) => handleLogin(e, credentials)}
                        >
                            <div
                                className={`row border-bottom ${
                                    theme === "light" ? "" : "border-secondary"
                                } mb-4`}
                            >
                                <div className="col-12">
                                    <h6
                                        className={`display-6 text-uppercase text-${
                                            theme === "light" ? "dark" : "light"
                                        } fw-bold brand-font`}
                                    >
                                        credentials
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
                                                : theme === "light"
                                                ? "dark-emphasis"
                                                : "light text-opacity-75"
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
                                                : theme === "light"
                                                ? "dark-emphasis"
                                                : "light text-opacity-75"
                                        }`}
                                    >
                                        password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
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
                                                        password:
                                                            e.target.value,
                                                    };
                                                });
                                            }}
                                            autoComplete="off"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={`btn border ${
                                                theme === "light"
                                                    ? ""
                                                    : "bg-light border-secondary"
                                            } border-start-0`}
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            <i
                                                className={`bi bi-eye-${
                                                    showPassword
                                                        ? "slash"
                                                        : "fill"
                                                }`}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <span className="text-secondary fw-normal">
                                        You don't have a Freighble {role}{" "}
                                        account?{" "}
                                        <Link
                                            className="fw-medium"
                                            to={
                                                role === "vendor"
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
                                className={`btn btn-${
                                    theme === "light" ? "dark" : "primary"
                                } bg-gradient shadow-sm fw-medium text-capitalize w-100 rounded-3`}
                            >
                                log in
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
                            message: "Verifying credentials.",
                        }}
                    />
                )}
            </div>

            {/* Informative toast */}
            <div className="toast-container rounded-3 position-fixed bottom-0 end-0 p-3">
                <div
                    id="freighble_alert"
                    className="toast rounded-3"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header rounded-top-3 border text-bg-primary">
                        <strong className="me-auto">Freighble alert</strong>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="toast-body rounded-bottom-3 text-bg-light">
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
                                    Something went wrong!
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
/* COMPONENT END */

export default LoginForm;
