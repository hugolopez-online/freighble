// imports
import { useState, Fragment } from "react";
import { Toast } from "bootstrap";
import {
    modes,
    modes_values,
    borders,
    borders_values,
    canDivisions,
    usaDivisions,
    mexDivisions,
} from "data/variables";
import { geo_tree } from "data/geo_meta";
import geo_lookup from "data/geo_meta";
import GeoCoverage from "./layout/components/GeoCoverage";
import LaneBuilder from "./layout/components/LaneBuilder";

// module
const coverage_countries = Object.keys(geo_tree);

const countries_labels = {
    CAN: "Canada",
    USA: "United States",
    MEX: "Mexico",
};

const default_form_data = {
    company: "",
    type: {
        asset_based: false,
        freight_broker: false,
    },
    contact: "",
    email: "",
    phone: "",
    domicile: {
        city: "",
        territory: "",
        country: "",
        country_code: "",
    },
    modes: [],
    hazmat: false,
    team_drivers: false,
    usa_bonded: false,
    can_bonded: false,
    ctpat: false,
    twic: false,
    tsa: false,
    fast: false,
    tanker_endorsement: false,
    coverage: {
        Canada: {
            country_code: "CAN",
            territory: [],
        },
        "United States": {
            country_code: "USA",
            territory: [],
        },
        Mexico: { country_code: "MEX", territory: [] },
    },
    borders: [],
    core_lanes: [],
    exclusive_lanes: [],
    banned_lanes: [],
};

const VendorRegister = () => {
    // state
    const [formData, setFormData] = useState(default_form_data);
    const [toastMessage, setToastMessage] = useState({
        success: false,
        message: "",
    });

    const [laneOrigin, setLaneOrigin] = useState({
        label: "origin",
        value: "",
        city: "",
    });

    const [laneDestination, setLaneDestination] = useState({
        label: "destination",
        value: "",
        city: "",
    });

    const [isBothWays, setIsBothWays] = useState(false);

    // module
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

    // handlers
    const handleRegistration = async (e, unit) => {
        const created_alert = document.getElementById("created_alert");
        const toast = Toast.getOrCreateInstance(created_alert);
        e.preventDefault();

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

            setFormData(default_form_data);
            setToastMessage({ success: true, message: response_data.msg });
            window.scrollTo(0, 0);
            toast.show();
        } catch (error) {
            setToastMessage({ success: false, message: response_data.msg });
            window.scrollTo(0, 0);
            toast.show();
        }
    };

    const modeSelection = (e) => {
        const mode_coverage = formData.modes;
        const selection = e.target.value;

        if (mode_coverage.includes(selection)) {
            setFormData((prev) => {
                return {
                    ...prev,
                    modes: prev.modes.filter((mode) => mode !== selection),
                };
            });
        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    modes: [...prev.modes, selection],
                };
            });
        }
    };

    const borderSelection = (e) => {
        const border_coverage = formData.borders;
        const selection = e.target.value;

        if (border_coverage.includes(selection)) {
            setFormData((prev) => {
                return {
                    ...prev,
                    borders: prev.borders.filter(
                        (border) => border !== selection
                    ),
                };
            });
        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    borders: [...prev.borders, selection],
                };
            });
        }
    };

    const serviceSelection = (e) => {
        const service = e.target.value;

        if (formData[service]) {
            setFormData((prev) => {
                return {
                    ...prev,
                    [service]: false,
                };
            });
        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    [service]: true,
                };
            });
        }
    };

    return (
        <Fragment>
            <div className="row justify-content-center pt-5">
                <div className="col-10 py-4">
                    <h4 className="display-4 py-4">Vendor Registration</h4>
                    <form
                        id="vendor_register"
                        className="shadow-sm border rounded-4 p-4 bg-light needs-validation"
                        onSubmit={(e) => handleRegistration(e, formData)}
                    >
                        {/* Company details */}
                        <div className="row border-bottom mb-4">
                            <div className="col-12">
                                <h6 className="display-6 text-secondary fs-2">
                                    company details
                                </h6>
                            </div>
                        </div>

                        <fieldset className="row mb-4">
                            <div className="col-6">
                                <label
                                    htmlFor="company_name"
                                    className="fw-normal text-secondary"
                                    style={{ fontSize: "0.85em" }}
                                >
                                    company name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Business DBA name"
                                    id="company_name"
                                    name="company_name"
                                    value={formData.company}
                                    onChange={(e) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                company: e.target.value,
                                            };
                                        });
                                    }}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label
                                    className="fw-normal text-secondary"
                                    style={{ fontSize: "0.85em" }}
                                >
                                    company type
                                </label>
                                <div className="col-12">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="asset_based"
                                            name="asset_based"
                                            checked={formData.type.asset_based}
                                            onChange={(e) => {
                                                setFormData((prev) => {
                                                    return {
                                                        ...prev,
                                                        type: {
                                                            ...prev.type,
                                                            asset_based:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    };
                                                });
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="asset_based"
                                        >
                                            Asset-based
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="freight_broker"
                                            name="freight_broker"
                                            checked={
                                                formData.type.freight_broker
                                            }
                                            onChange={(e) => {
                                                setFormData((prev) => {
                                                    return {
                                                        ...prev,
                                                        type: {
                                                            ...prev.type,
                                                            freight_broker:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    };
                                                });
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="freight_broker"
                                        >
                                            Freight broker
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="row mb-4">
                            <div className="col-4">
                                <label
                                    htmlFor="company_contact"
                                    className="fw-normal text-secondary"
                                    style={{ fontSize: "0.85em" }}
                                >
                                    pricing contact
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Contact name"
                                    id="company_contact"
                                    name="company_contact"
                                    value={formData.contact}
                                    onChange={(e) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                contact: e.target.value,
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
                                    className="fw-normal text-secondary"
                                    style={{ fontSize: "0.85em" }}
                                >
                                    pricing contact email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Contact email"
                                    id="contact_email"
                                    name="contact_email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData((prev) => {
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
                            <div className="col-4">
                                <label
                                    htmlFor="contact_phone"
                                    className="fw-normal text-secondary"
                                    style={{ fontSize: "0.85em" }}
                                >
                                    pricing contact phone
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Contact phone"
                                    id="contact_phone"
                                    name="contact_phone"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                phone: e.target.value,
                                            };
                                        });
                                    }}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </fieldset>

                        <fieldset className="row mb-4">
                            <label
                                htmlFor="domicile_city"
                                className="fw-normal text-secondary"
                                style={{ fontSize: "0.85em" }}
                            >
                                domicile
                            </label>
                            <div className="input-group col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    id="domicile_city"
                                    name="domicile_city"
                                    value={formData.domicile.city}
                                    onChange={(e) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                domicile: {
                                                    ...prev.domicile,
                                                    city: e.target.value,
                                                },
                                            };
                                        });
                                    }}
                                    autoComplete="off"
                                    required
                                />
                                <select
                                    className="form-select"
                                    id="domicile_territory"
                                    name="domicile_territory"
                                    value={formData.domicile.territory}
                                    onChange={(e) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                domicile: {
                                                    ...prev.domicile,
                                                    territory: e.target.value,
                                                    country:
                                                        countries_labels[
                                                            geo_lookup[
                                                                e.target.value
                                                            ].country
                                                        ],
                                                    country_code:
                                                        geo_lookup[
                                                            e.target.value
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
                                        Territory
                                    </option>
                                    <option disabled>Canada</option>
                                    {canDivisions.map((territory, index) => {
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
                                    })}
                                    <option disabled></option>
                                    <option disabled>United States</option>
                                    {usaDivisions.map((territory, index) => {
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
                                    })}
                                    <option disabled></option>
                                    <option disabled>Mexico</option>
                                    {mexDivisions.map((territory, index) => {
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
                                    })}
                                </select>
                            </div>
                        </fieldset>

                        {/* Transportation profile */}
                        <div className="row border-bottom mb-4">
                            <div className="col-12">
                                <h6 className="display-6 text-secondary fs-2">
                                    transportation profile
                                </h6>
                            </div>
                        </div>

                        <fieldset className="row mb-4">
                            <h5 className="text-dark border-bottom pb-2">
                                Modes of transportation
                            </h5>
                            <div className="col-12">
                                <div className="mb-3">
                                    {modes_values.map((mode) => {
                                        return (
                                            <Fragment key={`coverage-${mode}`}>
                                                <input
                                                    type="checkbox"
                                                    className="btn-check"
                                                    name={`coverage-${mode}`}
                                                    id={`coverage-${mode}`}
                                                    value={mode}
                                                    checked={formData.modes.includes(
                                                        mode
                                                    )}
                                                    onChange={(e) =>
                                                        modeSelection(e)
                                                    }
                                                    autoComplete="off"
                                                />
                                                <label
                                                    htmlFor={`coverage-${mode}`}
                                                    className={`btn rounded-pill btn-outline-${
                                                        formData.modes.includes(
                                                            mode
                                                        )
                                                            ? "primary fw-bold"
                                                            : "secondary"
                                                    } m-1 py-1 px-2`}
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    {modes[mode]}
                                                </label>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="row mb-4">
                            <h5 className="text-dark border-bottom pb-2">
                                Geographical coverage
                            </h5>
                            {coverage_countries.map((country_code, index) => {
                                return (
                                    <GeoCoverage
                                        key={`country_code-${country_code}`}
                                        geo_tree={geo_tree}
                                        country_code={country_code}
                                        countries_labels={countries_labels}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                );
                            })}
                        </fieldset>

                        <fieldset className="row mb-4">
                            <h5 className="text-dark border-bottom pb-2">
                                Border crossing ports for cross-Mexico vendors
                            </h5>
                            <div className="col-12">
                                <div className="mb-3">
                                    {borders_values
                                        .filter((border) => border !== "none")
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
                                                        checked={formData.borders.includes(
                                                            border
                                                        )}
                                                        onChange={(e) =>
                                                            borderSelection(e)
                                                        }
                                                        autoComplete="off"
                                                    />
                                                    <label
                                                        htmlFor={`coverage-${border}`}
                                                        className={`btn rounded-pill btn-outline-${
                                                            formData.borders.includes(
                                                                border
                                                            )
                                                                ? "primary fw-bold"
                                                                : "secondary"
                                                        } m-1 py-1 px-2`}
                                                        style={{
                                                            fontSize: "0.75rem",
                                                        }}
                                                    >
                                                        {borders[border]}
                                                    </label>
                                                </Fragment>
                                            );
                                        })}
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="row mb-4">
                            <h5 className="text-dark border-bottom pb-2">
                                Additional services
                            </h5>
                            <div className="col-12">
                                <div className="mb-3">
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
                                                            formData[service]
                                                        }
                                                        onChange={(e) =>
                                                            serviceSelection(e)
                                                        }
                                                        autoComplete="off"
                                                    />
                                                    <label
                                                        htmlFor={`coverage-${service}`}
                                                        className={`btn rounded-pill btn-outline-${
                                                            formData[service]
                                                                ? "primary fw-bold"
                                                                : "secondary"
                                                        } m-1 py-1 px-2`}
                                                        style={{
                                                            fontSize: "0.75rem",
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
                            </div>
                        </fieldset>

                        <fieldset className="row mb-4">
                            <LaneBuilder
                                coverage={formData.coverage}
                                target={laneOrigin}
                                setter={setLaneOrigin}
                            />
                            <LaneBuilder
                                coverage={formData.coverage}
                                target={laneDestination}
                                setter={setLaneDestination}
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
                                                ? "primary fw-bold"
                                                : "secondary"
                                        }`}
                                        for="is_both_ways"
                                    >
                                        {isBothWays ? "both ways" : "one way"}
                                    </label>
                                </div>
                            </div>
                        </fieldset>

                        <button
                            type="submit"
                            className="btn btn-dark bg-gradient shadow-sm fw-bold w-100 rounded-pill"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Informative toast */}
            <div className="toast-container rounded-3 position-fixed top-0 end-0 p-3">
                <div
                    id="created_alert"
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
                            <i className="bi bi-check-circle-fill text-success"></i>
                        ) : (
                            <i className="bi bi-exclamation-circle-fill text-danger"></i>
                        )}{" "}
                        {toastMessage.message}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default VendorRegister;
