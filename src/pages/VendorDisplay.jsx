// imports
import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import { geo_tree } from "data/geo_meta";
import geo_lookup from "data/geo_meta";
import {
    modes,
    modes_values,
    borders,
    borders_values,
    canDivisions,
    usaDivisions,
    mexDivisions,
} from "data/variables";

// module
const coverage_countries = Object.keys(geo_tree);

const countries_labels = {
    CAN: "Canada",
    USA: "United States",
    MEX: "Mexico",
};

const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const phone_regex = /^\d\d\d-\d\d\d-\d\d\d\d$/i;
const bad_password_regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

const VendorDisplay = (props) => {
    // state
    const [data, setData] = useState(props.data);
    const [passwordMatch, setPasswordMatch] = useState("");
    const [visibility, setVisibility] = useState(props.visibility);
    const [toastMessage, setToastMessage] = useState({
        success: false,
        message: [],
    });

    const [laneOrigin, setLaneOrigin] = useState({
        label: "origin",
        value: "Anywhere",
        city: "",
    });

    const [laneDestination, setLaneDestination] = useState({
        label: "destination",
        value: "Anywhere",
        city: "",
    });

    const [isBothWays, setIsBothWays] = useState(false);

    // module
    const GeoCoverage = props.GeoCoverage;
    const LaneList = props.LaneList;
    const LaneBuilder = props.LaneBuilder;
    const AddLane = props.AddLane;

    const view = visibility === "view";
    const edit = visibility === "edit";
    const create = visibility === "create";

    const additional_services = {
        hazmat: "Hazmat certified",
        team_drivers: "Team drivers",
        usa_bonded: "U.S. bonded",
        can_bonded: "Canada bonded",
        ctpat: "C-TPAT certified",
        twic: "TWIC drivers",
        tsa: "TSA drivers",
        fast: "FAST certified",
        tanker_endorsement: "Tanker Endorsement drivers",
    };

    const additional_services_values = Object.keys(additional_services);

    const lanes = {
        core: {
            ref: "core_lanes",
            label: "preferred",
        },
        exclusive: {
            ref: "exclusive_lanes",
            label: "exclusive",
        },
        banned: {
            ref: "banned_lanes",
            label: "banned",
        },
    };

    const is_cross_border =
        (data.coverage["Canada"].territory.length ||
            data.coverage["United States"].territory.length) &&
        data.coverage["Mexico"].territory.length;

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

    const toPhoneFormat = (phone) => {
        const digits = phone
            .split("")
            .filter((char) => Number.isInteger(Number(char)));

        if (digits.length < 10) {
            return digits.join("");
        } else {
            return digits
                .map((digit, index) => {
                    if (index === 2 || index === 5) {
                        return `${digit}-`;
                    }

                    return digit;
                })
                .join("");
        }
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

            const url = "/api/vendors/public/create";

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
                    navigate(`/vendors/vendor/${response_data.id}`);
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
            const url = `/api/vendors/public/edit/${data._id}`;

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

    const handleDelete = async (e) => {
        const freighble_alert = document.getElementById("freighble_alert");
        const toast = Toast.getOrCreateInstance(freighble_alert);
        e.preventDefault();

        const url = `/api/vendors/public/delete/${data._id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
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
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                props.CONDITIONAL_RENDERING.setSession(
                    JSON.parse(localStorage.getItem("user"))
                );
                navigate("/");
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
    };

    const modeSelection = (e) => {
        const mode_coverage = data.modes;
        const selection = e.target.value;

        if (mode_coverage.includes(selection)) {
            setData((prev) => {
                return {
                    ...prev,
                    modes: prev.modes.filter((mode) => mode !== selection),
                };
            });
        } else {
            setData((prev) => {
                return {
                    ...prev,
                    modes: [...prev.modes, selection],
                };
            });
        }
    };

    const borderSelection = (e) => {
        const border_coverage = data.borders;
        const selection = e.target.value;

        if (border_coverage.includes(selection)) {
            setData((prev) => {
                return {
                    ...prev,
                    borders: prev.borders.filter(
                        (border) => border !== selection
                    ),
                };
            });
        } else {
            setData((prev) => {
                return {
                    ...prev,
                    borders: [...prev.borders, selection],
                };
            });
        }
    };

    const serviceSelection = (e) => {
        const service = e.target.value;

        if (data[service]) {
            setData((prev) => {
                return {
                    ...prev,
                    [service]: false,
                };
            });
        } else {
            setData((prev) => {
                return {
                    ...prev,
                    [service]: true,
                };
            });
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
                                    Vendor Profile{" "}
                                    {props.CONDITIONAL_RENDERING.USER_ROLE ===
                                        "vendor" &&
                                    props.CONDITIONAL_RENDERING.USER_ID ===
                                        data._id ? (
                                        <Fragment>
                                            <button
                                                className="btn btn-secondary bg-gradient rounded-3 fw-medium me-2"
                                                onClick={() => {
                                                    setVisibility("edit");
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger bg-gradient rounded-3 fw-medium me-2"
                                                onClick={() => {
                                                    localStorage.removeItem(
                                                        "token"
                                                    );
                                                    localStorage.removeItem(
                                                        "user"
                                                    );

                                                    props.CONDITIONAL_RENDERING.setSession(
                                                        JSON.parse(
                                                            localStorage.getItem(
                                                                "user"
                                                            )
                                                        )
                                                    );

                                                    navigate("/vendors/login");
                                                }}
                                            >
                                                Log Out
                                            </button>
                                        </Fragment>
                                    ) : (
                                        ""
                                    )}
                                </Fragment>
                            ) : create ? (
                                "Vendor Registration"
                            ) : edit ? (
                                <Fragment>
                                    Vendor Profile{" "}
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
                            id="vendor_register"
                            className="shadow-sm border rounded-4 p-4 bg-light needs-validation"
                            onSubmit={(e) => handleRegistration(e, data)}
                        >
                            {/* Auth details */}
                            {create && (
                                <Fragment>
                                    <div className="row border-bottom mb-4">
                                        <div className="col-12">
                                            <h6 className="display-6 text-dark fw-bold brand-font">
                                                SING-UP DETAILS
                                            </h6>
                                        </div>
                                    </div>

                                    <fieldset className="row mb-4">
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="main_email_address"
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                main email address{" "}
                                                <strong
                                                    className={`text-${
                                                        data.main_email &&
                                                        email_regex.test(
                                                            data.main_email
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.main_email &&
                                                    email_regex.test(
                                                        data.main_email
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
                                                id="main_email_address"
                                                name="main_email_address"
                                                value={data.main_email}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            main_email:
                                                                e.target.value.toLowerCase(),
                                                        };
                                                    });
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label
                                                htmlFor="vendor_password"
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
                                                id="vendor_password"
                                                name="vendor_password"
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
                                                htmlFor="confirm_vendor_password"
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
                                                id="confirm_vendor_password"
                                                name="confirm_vendor_password"
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
                                                already a Freighble vendor?{" "}
                                                <Link
                                                    className="fw-medium"
                                                    to="/vendors/login"
                                                >
                                                    Log in here
                                                </Link>
                                            </span>
                                        </div>
                                    </fieldset>
                                </Fragment>
                            )}

                            {/* Company details */}
                            <div className="row border-bottom mb-4">
                                <div className="col-12">
                                    <h6 className="display-6 text-dark fw-bold brand-font">
                                        COMPANY DETAILS
                                    </h6>
                                </div>
                            </div>

                            <fieldset className="row mb-4">
                                <div className="col-6">
                                    {view ? (
                                        <Fragment>
                                            <h6 className="text-secondary">
                                                company name
                                            </h6>
                                            <span className="badge text-bg-primary bg-gradient fs-4 brand-font">
                                                {data.company}
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <label
                                                htmlFor="company_name"
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                company name{" "}
                                                <strong
                                                    className={`text-${
                                                        data.company
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.company ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Business DBA name"
                                                id="company_name"
                                                name="company_name"
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
                                                required
                                            />
                                        </Fragment>
                                    )}
                                </div>
                                <div className="col-6">
                                    {view ? (
                                        <Fragment>
                                            <h6 className="text-secondary">
                                                company type
                                            </h6>
                                            {data.type.asset_based && (
                                                <span className="badge text-bg-dark me-2">
                                                    asset-based{" "}
                                                    <i className="bi bi-check-lg"></i>
                                                </span>
                                            )}
                                            {data.type.freight_broker && (
                                                <span className="badge text-bg-dark me-2">
                                                    freight broker{" "}
                                                    <i className="bi bi-check-lg"></i>
                                                </span>
                                            )}
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <span className="fw-medium text-dark-emphasis">
                                                company type{" "}
                                                <strong
                                                    className={`text-${
                                                        data.type.asset_based ||
                                                        data.type.freight_broker
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.type.asset_based ||
                                                    data.type.freight_broker ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </span>
                                            <div className="col-12">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="asset_based"
                                                        name="asset_based"
                                                        checked={
                                                            data.type
                                                                .asset_based
                                                        }
                                                        onChange={(e) => {
                                                            setData((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    type: {
                                                                        ...prev.type,
                                                                        asset_based:
                                                                            e
                                                                                .target
                                                                                .checked,
                                                                    },
                                                                };
                                                            });
                                                        }}
                                                    />
                                                    <label
                                                        className={`form-check-label text-${
                                                            data.type
                                                                .asset_based
                                                                ? "primary fw-medium"
                                                                : "secondary"
                                                        }`}
                                                        htmlFor="asset_based"
                                                    >
                                                        asset-based
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="freight_broker"
                                                        name="freight_broker"
                                                        checked={
                                                            data.type
                                                                .freight_broker
                                                        }
                                                        onChange={(e) => {
                                                            setData((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    type: {
                                                                        ...prev.type,
                                                                        freight_broker:
                                                                            e
                                                                                .target
                                                                                .checked,
                                                                    },
                                                                };
                                                            });
                                                        }}
                                                    />
                                                    <label
                                                        className={`form-check-label text-${
                                                            data.type
                                                                .freight_broker
                                                                ? "primary fw-medium"
                                                                : "secondary"
                                                        }`}
                                                        htmlFor="freight_broker"
                                                    >
                                                        freight broker
                                                    </label>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </fieldset>

                            <fieldset className="row mb-4">
                                {view ? (
                                    <Fragment>
                                        <div className="col-6">
                                            <h6 className="text-secondary">
                                                pricing contact
                                            </h6>
                                            <ul>
                                                <li>{data.contact}</li>
                                                <li>
                                                    <i className="bi bi-envelope-fill"></i>{" "}
                                                    {data.email}
                                                </li>
                                                <li>
                                                    <i className="bi bi-telephone-fill"></i>{" "}
                                                    {data.ph_country_code}-
                                                    {data.phone}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-secondary">
                                                domicile
                                            </h6>
                                            <span>
                                                {data.domicile.city},{" "}
                                                {data.domicile.territory},{" "}
                                                {data.domicile.country}
                                            </span>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className="col-4">
                                            <label
                                                htmlFor="company_contact"
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                pricing contact{" "}
                                                <strong
                                                    className={`text-${
                                                        data.contact
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.contact ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Contact name"
                                                id="company_contact"
                                                name="company_contact"
                                                value={data.contact}
                                                onChange={(e) => {
                                                    setData((prev) => {
                                                        return {
                                                            ...prev,
                                                            contact:
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
                                        <div className="col-4">
                                            <label
                                                htmlFor="contact_email"
                                                className="fw-medium text-dark-emphasis"
                                            >
                                                pricing contact email{" "}
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
                                                placeholder="Contact email"
                                                id="contact_email"
                                                name="contact_email"
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
                                        <div className="row col-4">
                                            <span className="fw-medium text-dark-emphasis">
                                                pricing phone{" "}
                                                <strong
                                                    className={`text-${
                                                        data.ph_country_code &&
                                                        data.phone &&
                                                        phone_regex.test(
                                                            data.phone
                                                        )
                                                            ? "success"
                                                            : "danger"
                                                    }`}
                                                >
                                                    {data.ph_country_code &&
                                                    data.phone &&
                                                    phone_regex.test(
                                                        data.phone
                                                    ) ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        "*"
                                                    )}
                                                </strong>
                                            </span>
                                            <div className="col-4 pe-0">
                                                <select
                                                    className="form-select rounded-end-0 border-end-0"
                                                    id="contact_phone_country"
                                                    name="contact_phone_country"
                                                    value={data.ph_country_code}
                                                    onChange={(e) => {
                                                        setData((prev) => {
                                                            return {
                                                                ...prev,
                                                                ph_country_code:
                                                                    e.target
                                                                        .value,
                                                            };
                                                        });
                                                    }}
                                                    required
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        hidden
                                                    >
                                                        Code
                                                    </option>
                                                    <option value="+1">
                                                        +1
                                                    </option>
                                                    <option value="+52">
                                                        +52
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-8 ps-0">
                                                <input
                                                    type="tel"
                                                    className="form-control rounded-start-0"
                                                    placeholder="10-digit phone number"
                                                    id="contact_phone"
                                                    name="contact_phone"
                                                    value={data.phone}
                                                    minLength="12"
                                                    maxLength="12"
                                                    onChange={(e) => {
                                                        setData((prev) => {
                                                            return {
                                                                ...prev,
                                                                phone: toPhoneFormat(
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
                                        </div>
                                    </Fragment>
                                )}
                            </fieldset>

                            {!view && (
                                <fieldset className="row mb-4">
                                    <div className="col-6 pe-0">
                                        <label
                                            htmlFor="domicile_city"
                                            className="fw-medium text-dark-emphasis"
                                        >
                                            domicile city{" "}
                                            <strong
                                                className={`text-${
                                                    data.domicile.city
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {data.domicile.city ? (
                                                    <i className="bi bi-check"></i>
                                                ) : (
                                                    "*"
                                                )}
                                            </strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control rounded-end-0"
                                            placeholder="City"
                                            id="domicile_city"
                                            name="domicile_city"
                                            value={data.domicile.city}
                                            onChange={(e) => {
                                                setData((prev) => {
                                                    return {
                                                        ...prev,
                                                        domicile: {
                                                            ...prev.domicile,
                                                            city: toTitleCase(
                                                                e.target.value
                                                            ),
                                                        },
                                                    };
                                                });
                                            }}
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="col-6 ps-0">
                                        <label
                                            htmlFor="domicile_territory"
                                            className="fw-medium text-dark-emphasis"
                                        >
                                            domicile territory{" "}
                                            <strong
                                                className={`text-${
                                                    data.domicile.territory
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {data.domicile.territory ? (
                                                    <i className="bi bi-check"></i>
                                                ) : (
                                                    "*"
                                                )}
                                            </strong>
                                        </label>
                                        <select
                                            className="form-select rounded-start-0 border-start-0"
                                            id="domicile_territory"
                                            name="domicile_territory"
                                            value={data.domicile.territory}
                                            onChange={(e) => {
                                                setData((prev) => {
                                                    return {
                                                        ...prev,
                                                        domicile: {
                                                            ...prev.domicile,
                                                            territory:
                                                                e.target.value,
                                                            country:
                                                                countries_labels[
                                                                    geo_lookup[
                                                                        e.target
                                                                            .value
                                                                    ].country
                                                                ],
                                                            country_code:
                                                                geo_lookup[
                                                                    e.target
                                                                        .value
                                                                ].country,
                                                        },
                                                    };
                                                });
                                            }}
                                            required
                                        >
                                            <option
                                                value=""
                                                style={{ display: "none" }}
                                            >
                                                Territory (state or province)
                                            </option>
                                            <option disabled>Canada</option>
                                            {canDivisions.map(
                                                (territory, index) => {
                                                    return (
                                                        <option
                                                            key={territory.concat(
                                                                "-domicile_territory-",
                                                                index
                                                            )}
                                                            value={territory}
                                                        >
                                                            {territory}
                                                        </option>
                                                    );
                                                }
                                            )}
                                            <option disabled></option>
                                            <option disabled>
                                                United States
                                            </option>
                                            {usaDivisions.map(
                                                (territory, index) => {
                                                    return (
                                                        <option
                                                            key={territory.concat(
                                                                "-domicile_territory-",
                                                                index
                                                            )}
                                                            value={territory}
                                                        >
                                                            {territory}
                                                        </option>
                                                    );
                                                }
                                            )}
                                            <option disabled></option>
                                            <option disabled>Mexico</option>
                                            {mexDivisions.map(
                                                (territory, index) => {
                                                    return (
                                                        <option
                                                            key={territory.concat(
                                                                "-domicile_territory-",
                                                                index
                                                            )}
                                                            value={territory}
                                                        >
                                                            {territory}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                </fieldset>
                            )}

                            {/* Transportation profile */}
                            <div className="row border-bottom mb-4">
                                <div className="col-12">
                                    <h6 className="display-6 text-dark fw-bold brand-font">
                                        TRANSPORTATION PROFILE
                                    </h6>
                                </div>
                            </div>

                            <fieldset className="row mb-4">
                                {view ? (
                                    <Fragment>
                                        <h5 className="text-secondary">
                                            modes of transportation
                                        </h5>
                                        <div className="col-12">
                                            {data.modes.map((mode, index) => {
                                                return (
                                                    <span
                                                        key={`view-mode_${mode}-${index}`}
                                                        className="badge text-bg-dark me-2"
                                                    >
                                                        {modes[mode]}{" "}
                                                        <i className="bi bi-check-lg"></i>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <h5 className="text-dark-emphasis border-bottom pb-2">
                                            modes of transportation
                                            <strong
                                                className={`text-${
                                                    data.modes.length
                                                        ? "primary"
                                                        : "warning"
                                                }`}
                                            >
                                                {data.modes.length ? (
                                                    <i className="bi bi-check"></i>
                                                ) : (
                                                    <i className="bi bi-exclamation"></i>
                                                )}
                                            </strong>
                                        </h5>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                {modes_values.map((mode) => {
                                                    return (
                                                        <Fragment
                                                            key={`coverage-${mode}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="btn-check"
                                                                name={`coverage-${mode}`}
                                                                id={`coverage-${mode}`}
                                                                value={mode}
                                                                checked={data.modes.includes(
                                                                    mode
                                                                )}
                                                                onChange={(e) =>
                                                                    modeSelection(
                                                                        e
                                                                    )
                                                                }
                                                                autoComplete="off"
                                                            />
                                                            <label
                                                                htmlFor={`coverage-${mode}`}
                                                                className={`btn rounded-pill btn-outline-${
                                                                    data.modes.includes(
                                                                        mode
                                                                    )
                                                                        ? "primary fw-medium"
                                                                        : "secondary"
                                                                } m-1 py-1 px-2`}
                                                                style={{
                                                                    fontSize:
                                                                        "0.75rem",
                                                                }}
                                                            >
                                                                {modes[mode]}
                                                            </label>
                                                        </Fragment>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                            </fieldset>

                            <fieldset className="row mb-4">
                                {view ? (
                                    <h5 className="text-secondary">
                                        geographical coverage
                                    </h5>
                                ) : (
                                    <h5 className="text-dark-emphasis border-bottom pb-2">
                                        geographical coverage
                                        <strong
                                            className={`text-${
                                                data.coverage["Canada"]
                                                    .territory.length ||
                                                data.coverage["United States"]
                                                    .territory.length ||
                                                data.coverage["Mexico"]
                                                    .territory.length
                                                    ? "primary"
                                                    : "warning"
                                            }`}
                                        >
                                            {data.coverage["Canada"].territory
                                                .length ||
                                            data.coverage["United States"]
                                                .territory.length ||
                                            data.coverage["Mexico"].territory
                                                .length ? (
                                                <i className="bi bi-check"></i>
                                            ) : (
                                                <i className="bi bi-exclamation"></i>
                                            )}
                                        </strong>
                                    </h5>
                                )}
                                {coverage_countries.map((country_code) => {
                                    if (view) {
                                        return (
                                            <div
                                                key={`country_code-${country_code}`}
                                                className="col-4"
                                            >
                                                <h6 className="text-dark">
                                                    {
                                                        countries_labels[
                                                            country_code
                                                        ]
                                                    }
                                                </h6>
                                                <div className="col-12">
                                                    {data.coverage[
                                                        countries_labels[
                                                            country_code
                                                        ]
                                                    ].territory.length ? (
                                                        data.coverage[
                                                            countries_labels[
                                                                country_code
                                                            ]
                                                        ].territory.map(
                                                            (
                                                                territory,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <span
                                                                        key={`view-mode_${territory}-${index}`}
                                                                        className="badge text-bg-dark me-2"
                                                                    >
                                                                        {
                                                                            territory
                                                                        }{" "}
                                                                        <i className="bi bi-check-lg"></i>
                                                                    </span>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <em className="text-secondary fw-light">
                                                            no coverage...
                                                        </em>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <GeoCoverage
                                            key={`country_code-${country_code}`}
                                            geo_tree={geo_tree}
                                            country_code={country_code}
                                            countries_labels={countries_labels}
                                            data={data}
                                            setData={setData}
                                        />
                                    );
                                })}
                            </fieldset>

                            <fieldset
                                className={`row mb-4${
                                    is_cross_border ? "" : " d-none"
                                }`}
                            >
                                {view ? (
                                    <Fragment>
                                        <h5 className="text-secondary">
                                            border-crossing ports
                                        </h5>
                                        <div className="col-12">
                                            {data.borders
                                                .filter(
                                                    (border) =>
                                                        border !== "none"
                                                )
                                                .map((border, index) => {
                                                    return (
                                                        <span
                                                            key={`view-border_${border}-${index}`}
                                                            className="badge text-bg-dark me-2"
                                                        >
                                                            {borders[border]}{" "}
                                                            <i className="bi bi-check-lg"></i>
                                                        </span>
                                                    );
                                                })}
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <h5 className="text-dark-emphasis border-bottom pb-2">
                                            border-crossing ports{" "}
                                            <strong
                                                className={`text-${
                                                    data.borders.length
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {data.borders.length ? (
                                                    <i className="bi bi-check"></i>
                                                ) : (
                                                    "*"
                                                )}
                                            </strong>
                                        </h5>
                                        <div className="col-12 mb-3">
                                            {borders_values
                                                .filter(
                                                    (border) =>
                                                        border !== "none"
                                                )
                                                .map((border) => {
                                                    return (
                                                        <Fragment
                                                            key={`coverage-${border}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="btn-check"
                                                                name={`coverage-${border}`}
                                                                id={`coverage-${border}`}
                                                                value={border}
                                                                checked={data.borders.includes(
                                                                    border
                                                                )}
                                                                onChange={(e) =>
                                                                    borderSelection(
                                                                        e
                                                                    )
                                                                }
                                                                autoComplete="off"
                                                            />
                                                            <label
                                                                htmlFor={`coverage-${border}`}
                                                                className={`btn rounded-pill btn-outline-${
                                                                    data.borders.includes(
                                                                        border
                                                                    )
                                                                        ? "primary fw-medium"
                                                                        : "secondary"
                                                                } m-1 py-1 px-2`}
                                                                style={{
                                                                    fontSize:
                                                                        "0.75rem",
                                                                }}
                                                            >
                                                                {
                                                                    borders[
                                                                        border
                                                                    ]
                                                                }
                                                            </label>
                                                        </Fragment>
                                                    );
                                                })}
                                        </div>
                                    </Fragment>
                                )}
                            </fieldset>

                            <fieldset className="row mb-4">
                                {view ? (
                                    <Fragment>
                                        <h5 className="text-secondary">
                                            additional services
                                        </h5>
                                        <div className="col-12">
                                            {data.hazmat ||
                                            data.team_drivers ||
                                            data.usa_bonded ||
                                            data.can_bonded ||
                                            data.ctpat ||
                                            data.twic ||
                                            data.tsa ||
                                            data.fast ||
                                            data.tanker_endorsement ? (
                                                <Fragment>
                                                    {data.hazmat && (
                                                        <span className="badge text-bg-dark me-2">
                                                            Hazmat
                                                        </span>
                                                    )}
                                                    {data.team_drivers && (
                                                        <span className="badge text-bg-dark me-2">
                                                            Team drivers
                                                        </span>
                                                    )}
                                                    {data.usa_bonded && (
                                                        <span className="badge text-bg-dark me-2">
                                                            U.S. bonded
                                                        </span>
                                                    )}
                                                    {data.can_bonded && (
                                                        <span className="badge text-bg-dark me-2">
                                                            Canada bonded
                                                        </span>
                                                    )}
                                                    {data.ctpat && (
                                                        <span className="badge text-bg-dark me-2">
                                                            C-TPAT certified
                                                        </span>
                                                    )}
                                                    {data.twic && (
                                                        <span className="badge text-bg-dark me-2">
                                                            TWIC drivers
                                                        </span>
                                                    )}
                                                    {data.tsa && (
                                                        <span className="badge text-bg-dark me-2">
                                                            TSA drivers
                                                        </span>
                                                    )}
                                                    {data.fast && (
                                                        <span className="badge text-bg-dark me-2">
                                                            FAST certified
                                                        </span>
                                                    )}
                                                    {data.tanker_endorsement && (
                                                        <span className="badge text-bg-dark me-2">
                                                            Tanker Endorsement
                                                            drivers
                                                        </span>
                                                    )}
                                                </Fragment>
                                            ) : (
                                                <em className="text-secondary fw-light">
                                                    no additional services...
                                                </em>
                                            )}
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <h5 className="text-dark-emphasis border-bottom pb-2">
                                            additional services
                                        </h5>
                                        <div className="col-12 mb-3">
                                            {additional_services_values.map(
                                                (service) => {
                                                    return (
                                                        <Fragment
                                                            key={`coverage-${service}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="btn-check"
                                                                name={`coverage-${service}`}
                                                                id={`coverage-${service}`}
                                                                value={service}
                                                                checked={
                                                                    data[
                                                                        service
                                                                    ]
                                                                }
                                                                onChange={(e) =>
                                                                    serviceSelection(
                                                                        e
                                                                    )
                                                                }
                                                                autoComplete="off"
                                                            />
                                                            <label
                                                                htmlFor={`coverage-${service}`}
                                                                className={`btn rounded-pill btn-outline-${
                                                                    data[
                                                                        service
                                                                    ]
                                                                        ? "primary fw-medium"
                                                                        : "secondary"
                                                                } m-1 py-1 px-2`}
                                                                style={{
                                                                    fontSize:
                                                                        "0.75rem",
                                                                }}
                                                            >
                                                                {
                                                                    additional_services[
                                                                        service
                                                                    ]
                                                                }
                                                            </label>
                                                        </Fragment>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </Fragment>
                                )}
                            </fieldset>

                            {!view && (
                                <fieldset className="row mb-4">
                                    <h5
                                        className={`text-${
                                            view
                                                ? "secondary"
                                                : "dark-emphasis border-bottom pb-2"
                                        }`}
                                    >
                                        lane preferences
                                    </h5>
                                    <LaneBuilder
                                        coverage={data.coverage}
                                        target={laneOrigin}
                                        setter={setLaneOrigin}
                                        toTitleCase={toTitleCase}
                                    />
                                    <LaneBuilder
                                        coverage={data.coverage}
                                        target={laneDestination}
                                        setter={setLaneDestination}
                                        toTitleCase={toTitleCase}
                                    />
                                    <div className="col-12 pt-2">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="is_both_ways"
                                                checked={isBothWays}
                                                onChange={() => {
                                                    setIsBothWays(!isBothWays);
                                                }}
                                            />
                                            <label
                                                className={`form-check-label text-${
                                                    isBothWays
                                                        ? "primary fw-medium"
                                                        : "secondary"
                                                }`}
                                                htmlFor="is_both_ways"
                                            >
                                                {isBothWays
                                                    ? "both ways"
                                                    : "one way"}
                                            </label>
                                        </div>
                                        <div className="col-12 pt-2">
                                            <AddLane
                                                target={lanes.core}
                                                data={data}
                                                setData={setData}
                                                laneOrigin={laneOrigin}
                                                laneDestination={
                                                    laneDestination
                                                }
                                                isBothWays={isBothWays}
                                            />
                                            <AddLane
                                                target={lanes.exclusive}
                                                data={data}
                                                setData={setData}
                                                laneOrigin={laneOrigin}
                                                laneDestination={
                                                    laneDestination
                                                }
                                                isBothWays={isBothWays}
                                            />
                                            <AddLane
                                                target={lanes.banned}
                                                data={data}
                                                setData={setData}
                                                laneOrigin={laneOrigin}
                                                laneDestination={
                                                    laneDestination
                                                }
                                                isBothWays={isBothWays}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            )}

                            <fieldset className="row mb-4">
                                {view ? (
                                    <Fragment>
                                        <div className="col-4">
                                            <h5 className="text-secondary">
                                                preferred lanes
                                            </h5>
                                            {data.core_lanes.length ? (
                                                data.core_lanes.map(
                                                    (lane, index) => {
                                                        return (
                                                            <span
                                                                key={`view-lane_${lane}-${index}`}
                                                                className="badge text-bg-success me-2"
                                                            >
                                                                {lane}
                                                            </span>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <em className="text-secondary fw-light">
                                                    empty list...
                                                </em>
                                            )}
                                        </div>
                                        <div className="col-4">
                                            <h5 className="text-secondary">
                                                exclusive lanes
                                            </h5>
                                            {data.exclusive_lanes.length ? (
                                                data.exclusive_lanes.map(
                                                    (lane, index) => {
                                                        return (
                                                            <span
                                                                key={`view-lane_${lane}-${index}`}
                                                                className="badge text-bg-primary me-2"
                                                            >
                                                                {lane}
                                                            </span>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <em className="text-secondary fw-light">
                                                    empty list...
                                                </em>
                                            )}
                                        </div>
                                        <div className="col-4">
                                            <h5 className="text-secondary">
                                                banned lanes
                                            </h5>
                                            {data.banned_lanes.length ? (
                                                data.banned_lanes.map(
                                                    (lane, index) => {
                                                        return (
                                                            <span
                                                                key={`view-lane_${lane}-${index}`}
                                                                className="badge text-bg-danger me-2"
                                                            >
                                                                {lane}
                                                            </span>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <em className="text-secondary fw-light">
                                                    empty list...
                                                </em>
                                            )}
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <LaneList
                                            target={lanes.core}
                                            data={data}
                                            setData={setData}
                                        />
                                        <LaneList
                                            target={lanes.exclusive}
                                            data={data}
                                            setData={setData}
                                        />
                                        <LaneList
                                            target={lanes.banned}
                                            data={data}
                                            setData={setData}
                                        />
                                    </Fragment>
                                )}
                            </fieldset>

                            {!view && (
                                <Fragment>
                                    {create && (
                                        <div className="form-check mb-4">
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
                                            ? "Sign Up and Create Vendor"
                                            : edit
                                            ? "Save Changes"
                                            : "BAD REQUEST!"}
                                    </button>
                                    {edit && (
                                        <button
                                            type="button"
                                            className="btn btn-danger bg-gradient fw-medium w-100 rounded-3 mt-2"
                                            onClick={(e) => handleDelete(e)}
                                        >
                                            Delete Account
                                        </button>
                                    )}
                                </Fragment>
                            )}
                        </form>
                    </div>
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

export default VendorDisplay;
