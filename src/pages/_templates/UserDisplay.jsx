/* IMPORTS START */
import { Toast } from "bootstrap";
import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Transition from "./Transition";
/* IMPORTS END */

/* MODULE START */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const BAD_PASSWORD_REGEX = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
/* MODULE END */

/* COMPONENT START */
const UserDisplay = (props) => {
    // state
    const [data, setData] = useState(props.data);
    const [passwordMatch, setPasswordMatch] = useState("");
    const [visibility, setVisibility] = useState(props.visibility);
    const [toastMessage, setToastMessage] = useState({
        success: false,
        message: [],
    });
    const [isFetching, setIsFetching] = useState(false);

    // module
    const view = visibility === "view";
    const edit = visibility === "edit";
    const create = visibility === "create";

    const toTitleCase = (string) => {
        return string
            .split(" ")
            .map((word) => {
                if (word.length === 0) return "";
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            })
            .join(" ");
    };

    const navigate = useNavigate();

    // handlers
    const handleRegistration = async (e, unit) => {
        e.preventDefault();

        const FREIGHBLE_ALERT = document.getElementById("freighble_alert");
        const toast = Toast.getOrCreateInstance(FREIGHBLE_ALERT);

        if (create) {
            if (passwordMatch !== data.auth.password) {
                setToastMessage({
                    success: false,
                    message: ["Password don't match."],
                });
                window.scrollTo(0, 0);
                toast.show();
                return false;
            }

            const URL = "/api/users/public/create";

            setIsFetching(true);

            const RES = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unit),
            });

            const RES_DATA = await RES.json();

            try {
                if (!RES.ok) {
                    throw new Error(`${JSON.stringify(RES_DATA.error.errors)}`);
                }

                setData(props.data);
                setToastMessage({
                    success: true,
                    message: [RES_DATA.msg],
                });
                window.scrollTo(0, 0);
                toast.show();
                setTimeout(() => {
                    navigate("/login");
                }, 2250);
            } catch (error) {
                setIsFetching(false);
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
        }

        if (edit) {
            const URL = `/api/users/public/edit/${data._id}`;

            setIsFetching(true);

            const RES = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unit),
            });

            const RES_DATA = await RES.json();

            try {
                if (!RES.ok) {
                    throw new Error(`${JSON.stringify(RES_DATA.error.errors)}`);
                }

                setToastMessage({
                    success: true,
                    message: [
                        `${RES_DATA.msg} Some changes may require you to log out and then log back in to be reflected.`,
                    ],
                });
                window.scrollTo(0, 0);
                setVisibility("view");
                toast.show();
                setIsFetching(false);
            } catch (error) {
                setIsFetching(false);
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
        }
    };

    const handleDelete = async (e) => {
        const FREIGHBLE_ALERT = document.getElementById("freighble_alert");
        const toast = Toast.getOrCreateInstance(FREIGHBLE_ALERT);
        e.preventDefault();

        const URL = `/api/users/public/delete/${data._id}`;

        setIsFetching(true);

        const RES = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const RES_DATA = await RES.json();

        try {
            if (!RES.ok) {
                throw new Error(`${JSON.stringify(RES_DATA.error.errors)}`);
            }

            setToastMessage({
                success: true,
                message: [RES_DATA.msg],
            });
            window.scrollTo(0, 0);
            setVisibility("view");
            toast.show();
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                props.CONDITIONAL_RENDERING.setSession(
                    JSON.parse(localStorage.getItem("user"))
                );
                navigate("/");
            }, 1250);
        } catch (error) {
            setIsFetching(false);
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

    // early return
    if (!(view || edit || create)) {
        return (
            <Transition
                variables={{
                    type: ["Authenticating", "Redirecting", "Loading"][2],
                    loader: ["spinner-border", "spinner-grow"][0],
                    message:
                        "Something went wrong. If this problem persists, please contact support.",
                }}
            />
        );
    }

    // render
    return (
        <Fragment>
            {!isFetching ? (
                <div
                    className={`row justify-content-center${
                        create ? " pt-5" : ""
                    }`}
                >
                    <div className="col-11 col-md-9 py-4">
                        <h5
                            className={`display-5 ${
                                props.theme === "light" ? "" : "text-light"
                            } py-4`}
                        >
                            {view ? (
                                <Fragment>
                                    User Profile
                                    <br />
                                    <button
                                        className={`btn btn-sm btn-${
                                            props.theme === "light"
                                                ? "dark"
                                                : "primary"
                                        } bg-gradient rounded-3 fw-medium me-2`}
                                        onClick={() => {
                                            setVisibility("edit");
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary bg-gradient rounded-3 fw-medium me-2"
                                        data-bs-dismiss="offcanvas"
                                    >
                                        Back to Dashboard
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger bg-gradient rounded-3 fw-medium me-2"
                                        data-bs-dismiss="offcanvas"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user");

                                            props.CONDITIONAL_RENDERING.setSession(
                                                JSON.parse(
                                                    localStorage.getItem("user")
                                                )
                                            );
                                        }}
                                    >
                                        Log Out
                                    </button>
                                </Fragment>
                            ) : create ? (
                                "User Registration"
                            ) : (
                                <Fragment>
                                    User Profile
                                    <br />
                                    <button
                                        className={`btn btn-sm btn-${
                                            props.theme === "light"
                                                ? "dark"
                                                : "primary"
                                        } bg-gradient rounded-3 fw-medium me-2`}
                                        onClick={(e) => {
                                            handleRegistration(e, data);
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary bg-gradient rounded-3 fw-medium"
                                        onClick={() => {
                                            setData(props.data);
                                            setVisibility("view");
                                        }}
                                    >
                                        Cancel Edit
                                    </button>
                                </Fragment>
                            )}
                        </h5>
                        <form
                            id="user_register"
                            className={`shadow-sm border rounded-4 p-4 bg-${
                                props.theme === "light"
                                    ? "light"
                                    : "black bg-gradient border-secondary"
                            } needs-validation`}
                            onSubmit={(e) => handleRegistration(e, data)}
                        >
                            {/* Auth details */}
                            {create && (
                                <Fragment>
                                    <div
                                        className={`row border-bottom ${
                                            props.theme === "light"
                                                ? ""
                                                : "border-secondary"
                                        } mb-4`}
                                    >
                                        <div className="col-12">
                                            <h6
                                                className={`display-6 text-${
                                                    props.theme === "light"
                                                        ? "dark"
                                                        : "light"
                                                } fw-bold brand-font`}
                                            >
                                                SIGN-UP DETAILS
                                            </h6>
                                        </div>
                                    </div>

                                    <fieldset className="row mb-4">
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="email_address"
                                                className={`fw-medium text-${
                                                    props.theme === "light"
                                                        ? "dark-emphasis"
                                                        : "light text-opacity-75"
                                                }`}
                                            >
                                                email address{" "}
                                                <strong
                                                    className={`text-${
                                                        data.email &&
                                                        EMAIL_REGEX.test(
                                                            data.email
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.email &&
                                                    EMAIL_REGEX.test(
                                                        data.email
                                                    ) ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                id="email_address"
                                                name="email_address"
                                                value={data.email}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            email: e.target.value.toLowerCase(),
                                                        };
                                                    });
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="user_password"
                                                className={`fw-medium text-${
                                                    props.theme === "light"
                                                        ? "dark-emphasis"
                                                        : "light text-opacity-75"
                                                }`}
                                            >
                                                password{" "}
                                                <strong
                                                    className={`text-${
                                                        data.auth.password &&
                                                        !BAD_PASSWORD_REGEX.test(
                                                            data.auth.password
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.auth.password &&
                                                    !BAD_PASSWORD_REGEX.test(
                                                        data.auth.password
                                                    ) ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>{" "}
                                                <small className="fw-light text-secondary">
                                                    (at least 8 characters long,
                                                    including lowercase,
                                                    uppercase, number, and
                                                    special characters)
                                                </small>{" "}
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                id="user_password"
                                                name="user_password"
                                                value={data.auth.password}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            auth: {
                                                                ...prev.auth,
                                                                password:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        };
                                                    });
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="confirm_user_password"
                                                className={`fw-medium text-${
                                                    props.theme === "light"
                                                        ? "dark-emphasis"
                                                        : "light text-opacity-75"
                                                }`}
                                            >
                                                confirm password{" "}
                                                <strong
                                                    className={`text-${
                                                        passwordMatch &&
                                                        passwordMatch ===
                                                            data.auth
                                                                .password &&
                                                        !BAD_PASSWORD_REGEX.test(
                                                            data.auth.password
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {passwordMatch &&
                                                    passwordMatch ===
                                                        data.auth.password &&
                                                    !BAD_PASSWORD_REGEX.test(
                                                        data.auth.password
                                                    ) ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                id="confirm_user_password"
                                                name="confirm_user_password"
                                                value={passwordMatch}
                                                onChange={(e) => {
                                                    setPasswordMatch(
                                                        e.target.value
                                                    );
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mb-2">
                                            <span className="text-secondary fw-normal">
                                                already a Freighble user?{" "}
                                                <Link
                                                    className="fw-medium"
                                                    to="/login"
                                                >
                                                    Log in here
                                                </Link>
                                            </span>
                                        </div>
                                    </fieldset>
                                </Fragment>
                            )}

                            {/* Profile info */}
                            <div
                                className={`row border-bottom ${
                                    props.theme === "light"
                                        ? ""
                                        : "border-secondary"
                                } mb-4`}
                            >
                                <div className="col-12">
                                    <h6
                                        className={`display-6 text-${
                                            props.theme === "light"
                                                ? "dark"
                                                : "light"
                                        } fw-bold brand-font`}
                                    >
                                        PROFILE INFORMATION
                                    </h6>
                                </div>
                            </div>

                            <fieldset className={`row${view ? "" : " mb-4"}`}>
                                {view ? (
                                    <Fragment>
                                        <div className="col-12">
                                            <h2
                                                className={`text-${
                                                    props.theme === "light"
                                                        ? "primary-emphasis"
                                                        : "light text-opacity-75"
                                                } fw-bold mb-3`}
                                            >
                                                {data.first_name}{" "}
                                                {data.last_name}
                                            </h2>
                                            <div className="input-group mb-2">
                                                <span className="input-group-text border-secondary text-bg-secondary">
                                                    <i className="bi bi-envelope-fill"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={data.email}
                                                    disabled
                                                />
                                            </div>
                                            {data.company && (
                                                <div className="input-group mb-2">
                                                    <span className="input-group-text border-secondary text-bg-secondary">
                                                        <i className="bi bi-building-fill"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.company}
                                                        disabled
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12 mt-4">
                                            <button
                                                className={`btn btn-block btn-${
                                                    props.theme === "light"
                                                        ? "dark"
                                                        : "primary"
                                                } bg-gradient rounded-3 fw-medium w-100 me-2`}
                                                onClick={() => {
                                                    setVisibility("edit");
                                                }}
                                            >
                                                Edit Profile
                                            </button>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="user_first_name"
                                                className={`fw-medium text-${
                                                    props.theme === "light"
                                                        ? "dark-emphasis"
                                                        : "light text-opacity-75"
                                                }`}
                                            >
                                                first name{" "}
                                                <strong
                                                    className={`text-${
                                                        data.first_name
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.first_name ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First name"
                                                id="user_first_name"
                                                name="user_first_name"
                                                value={data.first_name}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            first_name:
                                                                toTitleCase(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        };
                                                    });
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="user_last_name"
                                                className={`fw-medium text-${
                                                    props.theme === "light"
                                                        ? "dark-emphasis"
                                                        : "light text-opacity-75"
                                                }`}
                                            >
                                                last name{" "}
                                                <strong
                                                    className={`text-${
                                                        data.last_name
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.last_name ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last name"
                                                id="user_last_name"
                                                name="user_last_name"
                                                value={data.last_name}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            last_name:
                                                                toTitleCase(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        };
                                                    });
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        {edit && (
                                            <div className="col-12 mb-2">
                                                <label
                                                    htmlFor="email_address"
                                                    className={`fw-medium text-${
                                                        props.theme === "light"
                                                            ? "dark-emphasis"
                                                            : "light text-opacity-75"
                                                    }`}
                                                >
                                                    email address{" "}
                                                    <strong
                                                        className={`text-${
                                                            data.email &&
                                                            EMAIL_REGEX.test(
                                                                data.email
                                                            )
                                                                ? "success"
                                                                : "danger"
                                                        }`}
                                                    >
                                                        {data.email &&
                                                        EMAIL_REGEX.test(
                                                            data.email
                                                        ) ? (
                                                            <i className="bi bi-check"></i>
                                                        ) : (
                                                            "*"
                                                        )}
                                                    </strong>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    id="email_address"
                                                    name="email_address"
                                                    value={data.email}
                                                    onChange={(e) => {
                                                        setData((prev) => {
                                                            return {
                                                                ...prev,
                                                                email: e.target.value.toLowerCase(),
                                                            };
                                                        });
                                                    }}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                        )}
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="user_company"
                                                className={`fw-medium text-${
                                                    props.theme === "light"
                                                        ? "dark-emphasis"
                                                        : "light text-opacity-75"
                                                }`}
                                            >
                                                company
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Company name (optional)"
                                                id="user_company"
                                                name="user_company"
                                                value={data.company}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            company:
                                                                e.target.value.toUpperCase(),
                                                        };
                                                    });
                                                }}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </Fragment>
                                )}
                            </fieldset>

                            {!view && (
                                <Fragment>
                                    {create && (
                                        <div className="form-check my-4">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="accept_terms"
                                                name="accept_terms"
                                                checked={
                                                    data.auth.terms.accepted
                                                }
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            auth: {
                                                                ...prev.auth,
                                                                terms: {
                                                                    ...prev.auth
                                                                        .terms,
                                                                    accepted:
                                                                        e.target
                                                                            .checked,
                                                                    date_accepted:
                                                                        Date.now(),
                                                                },
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                            <label
                                                className={`form-check-label text-${
                                                    data.auth.terms.accepted
                                                        ? props.theme ===
                                                          "light"
                                                            ? "dark"
                                                            : "light"
                                                        : "secondary"
                                                }`}
                                                htmlFor="accept_terms"
                                            >
                                                By signing up, I acknowledge
                                                that I have read, understood,
                                                and accepted the{" "}
                                                <Link
                                                    to="/general-terms-and-conditions"
                                                    target="_blank"
                                                >
                                                    General Terms and Conditions
                                                </Link>{" "}
                                                of use.{" "}
                                                <strong
                                                    className={`text-${
                                                        data.auth.terms.accepted
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.auth.terms
                                                        .accepted ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className={`btn btn-${
                                            props.theme === "light"
                                                ? "dark"
                                                : "primary"
                                        } bg-gradient shadow-sm fw-medium w-100 rounded-3`}
                                    >
                                        {create ? "Sign Up" : "Save Changes"}
                                    </button>
                                    {edit && (
                                        <Fragment>
                                            <hr />
                                            <h5 className="text-danger text-uppercase">
                                                danger zone!
                                            </h5>
                                            <small
                                                className={`text-danger${
                                                    props.theme === "light"
                                                        ? "-emphasis"
                                                        : ""
                                                }`}
                                            >
                                                This is a{" "}
                                                <b>
                                                    <u>one-click deletion</u>
                                                </b>{" "}
                                                button, and once deleted, all
                                                your account's information is
                                                irrevocably removed from our
                                                database.
                                            </small>
                                            <button
                                                type="button"
                                                className="btn btn-danger bg-gradient fw-medium w-100 rounded-3 mt-2"
                                                onClick={(e) => handleDelete(e)}
                                            >
                                                Delete Account
                                            </button>
                                        </Fragment>
                                    )}
                                </Fragment>
                            )}
                        </form>
                    </div>
                </div>
            ) : (
                <Transition
                    variables={{
                        type: ["Authenticating", "Redirecting", "Loading"][2],
                        loader: ["spinner-border", "spinner-grow"][0],
                        message: "",
                    }}
                />
            )}

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

export default UserDisplay;
