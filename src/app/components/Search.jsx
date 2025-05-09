import { useEffect, useState } from "react";
import {
    transportationModes,
    canDivisions,
    usaDivisions,
    mexDivisions,
    borderCrossingPorts,
} from "../variables";
import geoLookup from "../handlers/geoMeta";

const defaultFormData = {
    mode: "",
    originCity: "",
    originState: "",
    destinationCity: "",
    destinationState: "",
    border: "N/A",
    hazmat: false,
    team: false,
    usbond: false,
    canadabond: false,
};

const Search = (props) => {
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (props.template) {
            setFormData((prev) => {
                return {
                    ...prev,
                    mode: props.template.mode,
                    originCity: props.template.origin.city,
                    originState: props.template.origin.state,
                    destinationCity: props.template.destination.city,
                    destinationState: props.template.destination.state,
                    border: props.template.border,
                    hazmat: props.template.hazmat,
                    team: props.template.team,
                    usbond: props.template.usbond,
                    canadabond: props.template.canadabond,
                };
            });

            document
                .getElementById("navbar")
                .scrollIntoView({ block: "start", behavior: "smooth" });
            props.setTemplate(null);
        }
    }, [props.template]);

    const handleSpecs = (e) => {
        e.preventDefault();
        const originCity = document.getElementById("originCity").value;
        const originState = document.getElementById("originState").value;
        const originRegion = geoLookup[originState].region;
        const originCountry = geoLookup[originState].country;
        const destinationCity =
            document.getElementById("destinationCity").value;
        const destinationState =
            document.getElementById("destinationState").value;
        const destinationRegion = geoLookup[destinationState].region;
        const destinationCountry = geoLookup[destinationState].country;

        props.setSpecs((prev) => {
            return {
                ...prev,
                mode: document.getElementById("mode").value,
                origin: {
                    city: originCity,
                    state: originState,
                    region: originRegion,
                    country: originCountry,
                },
                destination: {
                    city: destinationCity,
                    state: destinationState,
                    region: destinationRegion,
                    country: destinationCountry,
                },
                border: document.getElementById("borderPort").value,
                hazmat: document.getElementById("hazmat").checked,
                team: document.getElementById("teamDrivers").checked,
                usbond: document.getElementById("usBonded").checked,
                canadabond: document.getElementById("canadaBonded").checked,
            };
        });

        setFormData(defaultFormData);
        document
            .getElementById("informativeBanner")
            .scrollIntoView({ block: "start", behavior: "smooth" });
    };

    return (
        <form
            className="shadow-sm border rounded-3 p-3 text-bg-light"
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
                    htmlFor="originCity"
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
                        id="originCity"
                        name="originCity"
                        value={formData.originCity}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return { ...prev, originCity: e.target.value };
                            })
                        }
                    />
                    <select
                        className="form-select col-4"
                        id="originState"
                        name="originState"
                        value={formData.originState}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return { ...prev, originState: e.target.value };
                            })
                        }
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        >
                            State/Province
                        </option>
                        <option disabled>Canada</option>
                        {canDivisions.map((state, index) => {
                            return (
                                <option
                                    key={state.concat("-originState-", index)}
                                    value={state}
                                >
                                    {state}
                                </option>
                            );
                        })}
                        <option disabled></option>
                        <option disabled>United States</option>
                        {usaDivisions.map((state, index) => {
                            return (
                                <option
                                    key={state.concat("-originState-", index)}
                                    value={state}
                                >
                                    {state}
                                </option>
                            );
                        })}
                        <option disabled></option>
                        <option disabled>Mexico</option>
                        {mexDivisions.map((state, index) => {
                            return (
                                <option
                                    key={state.concat("-originState-", index)}
                                    value={state}
                                >
                                    {state}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </fieldset>

            {/* Destination */}
            <fieldset className="row mb-2">
                <label
                    htmlFor="destinationCity"
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
                        id="destinationCity"
                        name="destinationCity"
                        value={formData.destinationCity}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destinationCity: e.target.value,
                                };
                            })
                        }
                    />
                    <select
                        className="form-select col-4"
                        id="destinationState"
                        name="destinationState"
                        value={formData.destinationState}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destinationState: e.target.value,
                                };
                            })
                        }
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        >
                            State/Province
                        </option>
                        <option disabled>Canada</option>
                        {canDivisions.map((state, index) => {
                            return (
                                <option
                                    key={state.concat(
                                        "-destinationState-",
                                        index
                                    )}
                                    value={state}
                                >
                                    {state}
                                </option>
                            );
                        })}
                        <option disabled></option>
                        <option disabled>United States</option>
                        {usaDivisions.map((state, index) => {
                            return (
                                <option
                                    key={state.concat(
                                        "-destinationState-",
                                        index
                                    )}
                                    value={state}
                                >
                                    {state}
                                </option>
                            );
                        })}
                        <option disabled></option>
                        <option disabled>Mexico</option>
                        {mexDivisions.map((state, index) => {
                            return (
                                <option
                                    key={state.concat(
                                        "-destinationState-",
                                        index
                                    )}
                                    value={state}
                                >
                                    {state}
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
                        htmlFor="borderPort"
                        className="fw-bold text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        Border crossing port
                    </label>
                    <select
                        className="form-select"
                        id="borderPort"
                        value={formData.border}
                        onChange={(e) =>
                            setFormData((prev) => {
                                return { ...prev, border: e.target.value };
                            })
                        }
                        required
                    >
                        {borderCrossingPorts.map((border) => {
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
                            id="teamDrivers"
                            name="teamDrivers"
                            checked={formData.team}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return { ...prev, team: e.target.checked };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="teamDrivers"
                        >
                            Team Drivers
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="usBonded"
                            name="usBonded"
                            checked={formData.usbond}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        usbond: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="usBonded"
                        >
                            U.S. Bonded
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="canadaBonded"
                            name="canadaBonded"
                            checked={formData.canadabond}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        canadabond: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="canadaBonded"
                        >
                            Canada Bonded
                        </label>
                    </div>
                </div>
            </fieldset>
            <button
                type="button"
                className="btn btn-sm btn-warning shadow-sm w-100 mb-2"
                onClick={() => setFormData(defaultFormData)}
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
