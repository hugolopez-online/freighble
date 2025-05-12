import { useEffect, useState } from "react";
import {
    transportationModes,
    canDivisions,
    usaDivisions,
    mexDivisions,
    borderCrossingPorts,
} from "../variables";
import geoLookup from "../handlers/geoMeta";

const default_form_data = {
    mode: "",
    origin_city: "",
    origin_territory: "",
    destination_city: "",
    destination_territory: "",
    border: "N/A",
    hazmat: false,
    team_drivers: false,
    usa_bonded: false,
    can_bonded: false,
};

const Search = (props) => {
    const [formData, setFormData] = useState(default_form_data);

    useEffect(() => {
        if (props.template) {
            document
                .getElementById("navbar")
                .scrollIntoView({ block: "start", behavior: "smooth" });
            props.setTemplate(null);

            setFormData((prev) => {
                return {
                    ...prev,
                    mode: props.template.mode,
                    origin_city: props.template.origin.city,
                    origin_territory: props.template.origin.territory,
                    destination_city: props.template.destination.city,
                    destination_territory: props.template.destination.territory,
                    border: props.template.border,
                    hazmat: props.template.hazmat,
                    team_drivers: props.template.team_drivers,
                    usa_bonded: props.template.usa_bonded,
                    can_bonded: props.template.can_bonded,
                };
            });
        }
    }, [props.template]);

    const handleSpecs = (e) => {
        e.preventDefault();
        const origin_city = document.getElementById("origin_city").value;
        const origin_territory =
            document.getElementById("origin_territory").value;
        const origin_region = geoLookup[origin_territory].region;
        const origin_country = geoLookup[origin_territory].country;
        const destination_city =
            document.getElementById("destination_city").value;
        const destination_territory = document.getElementById(
            "destination_territory"
        ).value;
        const destination_region = geoLookup[destination_territory].region;
        const destination_country = geoLookup[destination_territory].country;

        document
            .getElementById("informativeBanner")
            .scrollIntoView({ block: "start", behavior: "smooth" });

        setFormData(default_form_data);

        props.setSpecs((prev) => {
            return {
                ...prev,
                mode: document.getElementById("mode").value,
                origin: {
                    city: origin_city,
                    territory: origin_territory,
                    region: origin_region,
                    country: origin_country,
                },
                destination: {
                    city: destination_city,
                    territory: destination_territory,
                    region: destination_region,
                    country: destination_country,
                },
                border: document.getElementById("border").value,
                hazmat: document.getElementById("hazmat").checked,
                team_drivers: document.getElementById("team_drivers").checked,
                usa_bonded: document.getElementById("usa_bonded").checked,
                can_bonded: document.getElementById("can_bonded").checked,
            };
        });
    };

    return (
        <form
            className="shadow-sm border rounded-3 p-3 text-bg-light needs-validation"
            onSubmit={handleSpecs}
        >
            <div className="row">
                <div className="col-12">
                    <h4 className="fw-bold">Load details</h4>
                </div>
            </div>

            {/* Mode */}
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="mode"
                        className="fw-bold text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        Mode
                    </label>
                    <select
                        className="form-select"
                        id="mode"
                        value={formData.mode}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return { ...prev, mode: e.target.value };
                            })
                        }
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        >
                            {/* TODO: verify that leaving this empty is ok*/}
                            Transportation mode
                        </option>
                        {transportationModes.map((mode, index) => {
                            return (
                                <option
                                    key={mode.concat("-mode-", index)}
                                    value={mode}
                                >
                                    {mode}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            {/* Origin */}
            <fieldset className="row mb-2">
                <label
                    htmlFor="origin_city"
                    className="fw-bold text-secondary"
                    style={{ fontSize: "0.85em" }}
                >
                    Origin
                </label>
                <div className="input-group col-12">
                    <input
                        type="text"
                        className="form-control col-8"
                        placeholder="City (optional)"
                        id="origin_city"
                        name="origin_city"
                        value={formData.origin_city}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return { ...prev, origin_city: e.target.value };
                            })
                        }
                    />
                    <select
                        className="form-select col-4"
                        id="origin_territory"
                        name="origin_territory"
                        value={formData.origin_territory}
                        onChange={(e) => {
                            if (
                                (geoLookup[e.target.value].country != "MEX" &&
                                    geoLookup[formData.destination_territory]
                                        .country == "MEX") ||
                                (geoLookup[e.target.value].country == "MEX" &&
                                    geoLookup[formData.destination_territory]
                                        .country != "MEX")
                            ) {
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        origin_territory: e.target.value,
                                        border: "",
                                    };
                                });
                                return;
                            }
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    origin_territory: e.target.value,
                                    border: "N/A",
                                };
                            });
                        }}
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        >
                            State/Province
                        </option>
                        <option disabled>Canada</option>
                        {canDivisions.map((territory, index) => {
                            return (
                                <option
                                    key={territory.concat(
                                        "-origin_territory-",
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
                                        "-origin_territory-",
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
                                        "-origin_territory-",
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

            {/* Destination */}
            <fieldset className="row mb-2">
                <label
                    htmlFor="destination_city"
                    className="fw-bold text-secondary"
                    style={{ fontSize: "0.85em" }}
                >
                    Destination
                </label>
                <div className="input-group col-12">
                    <input
                        type="text"
                        className="form-control col-8"
                        placeholder="City (optional)"
                        id="destination_city"
                        name="destination_city"
                        value={formData.destination_city}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destination_city: e.target.value,
                                };
                            })
                        }
                    />
                    <select
                        className="form-select col-4"
                        id="destination_territory"
                        name="destination_territory"
                        value={formData.destination_territory}
                        onChange={(e) => {
                            if (
                                (geoLookup[e.target.value].country != "MEX" &&
                                    geoLookup[formData.origin_territory]
                                        .country == "MEX") ||
                                (geoLookup[e.target.value].country == "MEX" &&
                                    geoLookup[formData.origin_territory]
                                        .country != "MEX")
                            ) {
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        destination_territory: e.target.value,
                                        border: "",
                                    };
                                });
                                return;
                            }
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destination_territory: e.target.value,
                                    border: "N/A",
                                };
                            });
                        }}
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        >
                            State/Province
                        </option>
                        <option disabled>Canada</option>
                        {canDivisions.map((territory, index) => {
                            return (
                                <option
                                    key={territory.concat(
                                        "-destination_territory-",
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
                                        "-destination_territory-",
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
                                        "-destination_territory-",
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

            {/* Border Crossing */}
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="border"
                        className="fw-bold text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        Border crossing port
                    </label>
                    <select
                        className="form-select"
                        id="border"
                        value={formData.border}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return { ...prev, border: e.target.value };
                            })
                        }
                        disabled={
                            !(
                                formData.origin_territory &&
                                formData.destination_territory &&
                                ((geoLookup[formData.origin_territory]
                                    .country != "MEX" &&
                                    geoLookup[formData.destination_territory]
                                        .country == "MEX") ||
                                    (geoLookup[formData.origin_territory]
                                        .country == "MEX" &&
                                        geoLookup[
                                            formData.destination_territory
                                        ].country != "MEX"))
                            )
                        }
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        ></option>
                        <option
                            value="N/A"
                            hidden={
                                formData.origin_territory &&
                                formData.destination_territory &&
                                ((geoLookup[formData.origin_territory]
                                    .country != "MEX" &&
                                    geoLookup[formData.destination_territory]
                                        .country == "MEX") ||
                                    (geoLookup[formData.origin_territory]
                                        .country == "MEX" &&
                                        geoLookup[
                                            formData.destination_territory
                                        ].country != "MEX"))
                            }
                        >
                            N/A
                        </option>
                        {borderCrossingPorts
                            .filter((border) => border != "N/A")
                            .map((border) => {
                                return (
                                    <option
                                        key={border
                                            .replace(/ /g, "-")
                                            .replace(/,/g, "_")}
                                        value={border}
                                    >
                                        {border}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>

            {/* Additional Requirements */}
            <fieldset className="row mb-2">
                <legend
                    className="fw-bold text-secondary"
                    style={{ fontSize: "0.85em" }}
                >
                    Additional requirements
                </legend>
                <div className="col-12">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="hazmat"
                            name="hazmat"
                            checked={formData.hazmat}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        hazmat: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="hazmat"
                        >
                            Hazmat
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="team_drivers"
                            name="team_drivers"
                            checked={formData.team_drivers}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        team_drivers: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="team_drivers"
                        >
                            Team Drivers
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="usa_bonded"
                            name="usa_bonded"
                            checked={formData.usa_bonded}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        usa_bonded: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="usa_bonded"
                        >
                            U.S. Bonded
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="can_bonded"
                            name="can_bonded"
                            checked={formData.can_bonded}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        can_bonded: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="can_bonded"
                        >
                            Canada Bonded
                        </label>
                    </div>
                </div>
            </fieldset>
            <button
                type="button"
                className="btn btn-sm btn-warning shadow-sm w-100 mb-2"
                onClick={() => setFormData(default_form_data)}
            >
                Reset fields
            </button>
            <button
                type="submit"
                className="btn btn-lg btn-dark shadow-sm fw-bold w-100"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
