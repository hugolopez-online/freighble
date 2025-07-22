// imports
import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";

// module
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const bad_password_regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

const UserDisplay = (props) => {
    // state
    const [data, setData] = useState(props.data);
    const [passwordMatch, setPasswordMatch] = useState("");
    const [visibility, setVisibility] = useState(props.visibility);
    const [toastMessage, setToastMessage] = useState({
        success: false,
        message: [],
    });

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
        const freighble_alert = document.getElementById("freighble_alert");
        const toast = Toast.getOrCreateInstance(freighble_alert);
        e.preventDefault();

        if (visibility === "create") {
            if (passwordMatch !== data.auth.password) {
                setToastMessage({
                    success: false,
                    message: ["Password doesn't match."],
                });
                window.scrollTo(0, 0);
                toast.show();
                return false;
            }

            const url = "/api/users/public/create";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unit),
            });

            const response_data = await response.json(); // Parse the JSON response

            try {
                if (!response.ok) {
                    throw new Error(
                        `${JSON.stringify(response_data.error.errors)}`
                    );
                }

                setData(props.data);
                setToastMessage({
                    success: true,
                    message: [response_data.msg],
                });
                window.scrollTo(0, 0);
                toast.show();
                setTimeout(() => {
                    navigate(`/login`);
                }, 1250);
            } catch (error) {
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
        }

        if (visibility === "edit") {
            const url = `/api/users/public/edit/${data._id}`;

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unit),
            });

            const response_data = await response.json(); // Parse the JSON response

            try {
                if (!response.ok) {
                    throw new Error(
                        `${JSON.stringify(response_data.error.errors)}`
                    );
                }

                setToastMessage({
                    success: true,
                    message: [response_data.msg],
                });
                window.scrollTo(0, 0);
                setVisibility("view");
                toast.show();
            } catch (error) {
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
        }
    };

    // render
    return (
        (view || create || edit) && (
            <Fragment>
                <div className="row justify-content-center pt-5">
                    <div className="col-8 py-4">
                        <h5 className="display-5 py-4">
                            {view ? (
                                <Fragment>
                                    User Profile{" "}
                                    <button
                                        className="btn btn-secondary bg-gradient rounded-3 fw-medium"
                                        onClick={() => {
                                            setVisibility("edit");
                                        }}
                                    >
                                        Edit
                                    </button>
                                </Fragment>
                            ) : create ? (
                                "User Registration"
                            ) : edit ? (
                                <Fragment>
                                    User Profile{" "}
                                    <button
                                        className="btn btn-dark bg-gradient fw-medium me-2"
                                        onClick={(e) => {
                                            handleRegistration(e, data);
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="btn btn-secondary bg-gradient fw-medium"
                                        onClick={() => {
                                            setData(props.data);
                                            setVisibility("view");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </Fragment>
                            ) : (
                                "BAD REQUEST!"
                            )}
                        </h5>
                        <form
                            id="user_register"
                            className="shadow-sm border rounded-4 p-4 bg-light needs-validation"
                            onSubmit={(e) => handleRegistration(e, data)}
                        >
                            {/* Auth details */}
                            {create && (
                                <Fragment>
                                    <div className="row border-bottom mb-4">
                                        <div className="col-12">
                                            <h6 className="display-6 text-dark fw-bold brand-font">
                                                SIGN-UP DETAILS
                                            </h6>
                                        </div>
                                    </div>

                                    <fieldset className="row mb-4">
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="email_address"
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                email address{" "}
                                                <strong
                                                    className={`text-${
                                                        data.email &&
                                                        email_regex.test(
                                                            data.email
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.email &&
                                                    email_regex.test(
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
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                password{" "}
                                                <strong
                                                    className={`text-${
                                                        data.auth.password &&
                                                        !bad_password_regex.test(
                                                            data.auth.password
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.auth.password &&
                                                    !bad_password_regex.test(
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
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                confirm password{" "}
                                                <strong
                                                    className={`text-${
                                                        passwordMatch &&
                                                        passwordMatch ===
                                                            data.auth
                                                                .password &&
                                                        !bad_password_regex.test(
                                                            data.auth.password
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {passwordMatch &&
                                                    passwordMatch ===
                                                        data.auth.password &&
                                                    !bad_password_regex.test(
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
                            <div className="row border-bottom mb-4">
                                <div className="col-12">
                                    <h6 className="display-6 text-dark fw-bold brand-font">
                                        PROFILE INFORMATION
                                    </h6>
                                </div>
                            </div>

                            <fieldset className="row mb-4">
                                {view ? (
                                    <Fragment>
                                        <div className="col-12 mb-4">
                                            <h6 className="text-secondary fw-light">
                                                full name
                                            </h6>
                                            <span className="text-dark fw-medium fs-3">
                                                {data.first_name}{" "}
                                                {data.last_name}
                                            </span>
                                        </div>
                                        <div className="col-12">
                                            <h6 className="text-secondary fw-light">
                                                email
                                            </h6>
                                            <span className="text-dark fw-medium fs-3">
                                                {data.email}
                                            </span>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className="col-12">
                                            <label
                                                htmlFor="user_first_name"
                                                className="fw-medium text-dark-emphasis"
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
                                        <div className="col-12">
                                            <label
                                                htmlFor="user_last_name"
                                                className="fw-medium text-dark-emphasis"
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
                                        <div className="col-12">
                                            <label
                                                htmlFor="user_company"
                                                className="fw-medium text-dark-emphasis"
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
                                                        ? "dark"
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
                                        className="btn btn-dark bg-gradient shadow-sm fw-medium w-100 rounded-3"
                                    >
                                        {create
                                            ? "Sign Up"
                                            : edit
                                            ? "Save Changes"
                                            : "BAD REQUEST!"}
                                    </button>
                                </Fragment>
                            )}
                        </form>
                    </div>
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
                                                    <li
                                                        key={`error-msg_${index}`}
                                                    >
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
                                                    <li
                                                        key={`error-msg_${index}`}
                                                    >
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
        )
    );
};

export default UserDisplay;
