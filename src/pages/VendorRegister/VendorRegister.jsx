// imports
import { useState } from "react";
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
import Coverage from "./layout/components/Coverage";

// module
const coverage_contries = Object.keys(geo_tree);

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
    const [formData, setFormData] = useState(default_form_data);

    const handleRegistration = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-10 py-4">
                <h4 className="display-4 py-4">Vendor Registration</h4>
                <form
                    id="vendor_register"
                    className="shadow-sm border rounded-4 p-4 bg-light bg-gradient needs-validation"
                    onSubmit={handleRegistration}
                >
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
                                                            e.target.checked,
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
                                        checked={formData.type.freight_broker}
                                        onChange={(e) => {
                                            setFormData((prev) => {
                                                return {
                                                    ...prev,
                                                    type: {
                                                        ...prev.type,
                                                        freight_broker:
                                                            e.target.checked,
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
                                quoting contact
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
                                contact email
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
                                contact phone
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

                    <div className="row border-bottom mb-4">
                        <div className="col-12">
                            <h6 className="display-6 text-secondary fs-2">
                                coverage details
                            </h6>
                        </div>
                    </div>

                    <fieldset className="row mb-4">
                        {coverage_contries.map((country_code, index) => {
                            return (
                                <Coverage
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

                    <button
                        type="submit"
                        className="btn btn-dark bg-gradient shadow-sm fw-bold w-100 rounded-pill"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VendorRegister;
