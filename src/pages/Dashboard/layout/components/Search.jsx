// imports

import { useEffect, useState } from "react";
import {
    transportationModes,
    canDivisions,
    usaDivisions,
    mexDivisions,
    borderCrossingPorts,
} from "../../data/variables";
import geo_lookup from "../handlers/geo_meta";
import { search_options } from "../../data/search_options";

// module

const default_form_data = {
    mode: "",
    origin_city: "",
    origin_territory: "",
    destination_city: "",
    destination_territory: "",
    border: "None",
    hazmat: false,
    team_drivers: false,
    usa_bonded: false,
    can_bonded: false,
    ctpat: false,
    twic: false,
    tsa: false,
    fast: false,
    tanker_endorsement: false,
};

const default_location_suggestions = [];

const isCrossBorder = (o, d) => {
    if (o && d) {
        return (
            (geo_lookup[d].country === "MEX") !==
            (geo_lookup[o].country === "MEX")
        );
    } else {
        return false;
    }
};

// component

const Search = (props) => {
    // states

    const [formData, setFormData] = useState(default_form_data);
    const [locationSuggestions, setLocationSuggestions] = useState(
        default_location_suggestions
    );

    // handlers

    const handleSpecs = (e) => {
        e.preventDefault();
        props.setSpecs(props.default_specs);

        const origin_region = geo_lookup[formData.origin_territory].region;
        const origin_country = geo_lookup[formData.origin_territory].country;

        const destination_region =
            geo_lookup[formData.destination_territory].region;
        const destination_country =
            geo_lookup[formData.destination_territory].country;

        props.setSpecs((prev) => {
            return {
                ...prev,
                mode: formData.mode,
                origin: {
                    city: formData.origin_city,
                    territory: formData.origin_territory,
                    region: origin_region,
                    country: origin_country,
                },
                destination: {
                    city: formData.destination_city,
                    territory: formData.destination_territory,
                    region: destination_region,
                    country: destination_country,
                },
                border: formData.border.split(" ").join("+"),
                hazmat: formData.hazmat,
                team_drivers: formData.team_drivers,
                usa_bonded: formData.usa_bonded,
                can_bonded: formData.can_bonded,
                ctpat: formData.ctpat,
                twic: formData.twic,
                tsa: formData.tsa,
                fast: formData.fast,
                tanker_endorsement: formData.tanker_endorsement,
            };
        });

        if (window.innerWidth < 768) {
            const search = document.getElementById("searchForm");
            search.classList.add("d-none");
        }
    };

    const handleLocationSuggestions = (e, drop_menu) => {
        const suggestions = search_options
            .filter((opt) => {
                const input_lowercase = e.target.value.toLowerCase();
                const opt_lowercase = opt.search.toLowerCase();

                return opt_lowercase.startsWith(input_lowercase);
            })
            .slice(0, 5);

        if (e.target.value.length >= 3) {
            setLocationSuggestions(suggestions);
            e.target.classList.add("show");
            document.getElementById(drop_menu).classList.add("show");
        } else {
            e.target.classList.remove("show");
            document.getElementById(drop_menu).classList.remove("show");
            setLocationSuggestions(default_location_suggestions);
        }

        e.target.addEventListener("focusout", () => {
            setTimeout(() => {
                e.target.classList.remove("show");
                document.getElementById(drop_menu).classList.remove("show");
                setLocationSuggestions(default_location_suggestions);
            }, 400);
        });
    };

    const handleSuggestionSelect = (e, city, territory) => {
        const origin = "origin_search_options";
        const destination = "destination_search_options";

        const location_type = e.target.parentElement.parentElement.id;

        if (location_type === origin) {
            setFormData((prev) => {
                return {
                    ...prev,
                    origin_city: city,
                    origin_territory: territory,
                    border: isCrossBorder(
                        territory,
                        formData.destination_territory
                    )
                        ? ""
                        : "None",
                };
            });
        } else if (location_type === destination) {
            setFormData((prev) => {
                return {
                    ...prev,
                    destination_city: city,
                    destination_territory: territory,
                    border: isCrossBorder(formData.origin_territory, territory)
                        ? ""
                        : "None",
                };
            });
        } else {
            console.error(
                "Fatal error: autocomplete tried to handle a bad request."
            );
        }
    };

    // effects

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
                    border: props.template.border.split("+").join(" "),
                    hazmat: props.template.hazmat,
                    team_drivers: props.template.team_drivers,
                    usa_bonded: props.template.usa_bonded,
                    can_bonded: props.template.can_bonded,
                    ctpat: props.template.ctpat,
                    twic: props.template.twic,
                    tsa: props.template.tsa,
                    fast: props.template.fast,
                    tanker_endorsement: props.template.tanker_endorsement,
                };
            });
        }
    }, [props.template]);

    // render

    return (
        <form
            id="search"
            className="shadow-sm border rounded-4 p-4 bg-light bg-gradient needs-validation sticky-md-top under-navbar"
            onSubmit={handleSpecs}
        >
            <div className="row border-bottom mb-2">
                <div className="col-12">
                    <h6 className="display-6 text-secondary fs-2">
                        load details
                    </h6>
                </div>
            </div>

            {/* Mode */}
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="mode"
                        className="fw-normal text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        mode
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
                    className="fw-normal text-secondary"
                    style={{ fontSize: "0.85em" }}
                >
                    origin
                </label>
                <div className="input-group dropdown col-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        id="origin_city"
                        name="origin_city"
                        value={formData.origin_city}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return { ...prev, origin_city: e.target.value };
                            });
                            handleLocationSuggestions(
                                e,
                                "origin_search_options"
                            );
                        }}
                        autoComplete="off"
                    />
                    <ul
                        id="origin_search_options"
                        className="dropdown-menu"
                        style={{ top: "2.5em" }}
                    >
                        <li style={{ cursor: "pointer" }}>
                            <a className="dropdown-item text-dark">
                                <span className="text-secondary">city: </span>
                                <i>{formData.origin_city}</i>
                            </a>
                        </li>
                        {locationSuggestions[0] && (
                            <li className="dropdown-divider"></li>
                        )}
                        {locationSuggestions[0] &&
                            locationSuggestions.map((suggestion, index) => {
                                return (
                                    <li
                                        style={{ cursor: "pointer" }}
                                        key={index}
                                    >
                                        <a
                                            className="dropdown-item text-primary"
                                            onClick={(e) =>
                                                handleSuggestionSelect(
                                                    e,
                                                    suggestion.city,
                                                    suggestion.territory
                                                )
                                            }
                                        >
                                            <i className="bi bi-stars"></i>{" "}
                                            {suggestion.search}
                                        </a>
                                    </li>
                                );
                            })}
                    </ul>
                    <select
                        className="form-select col-4"
                        id="origin_territory"
                        name="origin_territory"
                        value={formData.origin_territory}
                        onChange={(e) => {
                            const origin_territory = e.target.value;
                            const destination_territory =
                                formData.destination_territory;

                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    origin_territory,
                                    border: isCrossBorder(
                                        origin_territory,
                                        destination_territory
                                    )
                                        ? ""
                                        : "None",
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
                    className="fw-normal text-secondary"
                    style={{ fontSize: "0.85em" }}
                >
                    destination
                </label>
                <div className="input-group col-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        id="destination_city"
                        name="destination_city"
                        value={formData.destination_city}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destination_city: e.target.value,
                                };
                            });
                            handleLocationSuggestions(
                                e,
                                "destination_search_options"
                            );
                        }}
                        autoComplete="off"
                    />
                    <ul
                        id="destination_search_options"
                        className="dropdown-menu"
                        style={{ top: "2.5em" }}
                    >
                        <li style={{ cursor: "pointer" }}>
                            <a className="dropdown-item text-dark">
                                <span className="text-secondary">city: </span>
                                <i>{formData.destination_city}</i>
                            </a>
                        </li>
                        {locationSuggestions[0] && (
                            <li className="dropdown-divider"></li>
                        )}
                        {locationSuggestions[0] &&
                            locationSuggestions.map((suggestion, index) => {
                                return (
                                    <li
                                        style={{ cursor: "pointer" }}
                                        key={index}
                                    >
                                        <a
                                            className="dropdown-item text-primary"
                                            onClick={(e) =>
                                                handleSuggestionSelect(
                                                    e,
                                                    suggestion.city,
                                                    suggestion.territory
                                                )
                                            }
                                        >
                                            <i className="bi bi-stars"></i>{" "}
                                            {suggestion.search}
                                        </a>
                                    </li>
                                );
                            })}
                    </ul>
                    <select
                        className="form-select col-4"
                        id="destination_territory"
                        name="destination_territory"
                        value={formData.destination_territory}
                        onChange={(e) => {
                            const origin_territory = formData.origin_territory;
                            const destination_territory = e.target.value;

                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destination_territory,
                                    border: isCrossBorder(
                                        origin_territory,
                                        destination_territory
                                    )
                                        ? ""
                                        : "None",
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
            <div
                id="border-fieldset"
                className={`row mb-2 ${
                    formData.border !== "None" ? "" : "d-none"
                }`}
            >
                <div className="col-12">
                    <label
                        htmlFor="border"
                        className="fw-normal text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        border crossing port
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
                                isCrossBorder(
                                    formData.origin_territory,
                                    formData.destination_territory
                                )
                            )
                        }
                        required
                    >
                        <option
                            value=""
                            style={{ display: "none" }}
                        ></option>
                        <option
                            value="None"
                            hidden={
                                formData.origin_territory &&
                                formData.destination_territory &&
                                isCrossBorder(
                                    formData.origin_territory,
                                    formData.destination_territory
                                )
                            }
                        >
                            None
                        </option>
                        {borderCrossingPorts
                            .filter((border) => border != "None")
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

            {/* Special Requirements */}
            <fieldset className="row mb-2">
                <div className="col-12">
                    <button
                        type="button"
                        className={`btn btn-sm ${
                            formData.hazmat ||
                            formData.team_drivers ||
                            formData.usa_bonded ||
                            formData.can_bonded ||
                            formData.ctpat ||
                            formData.twic ||
                            formData.tsa ||
                            formData.fast ||
                            formData.tanker_endorsement
                                ? "btn-primary"
                                : "btn-outline-secondary border"
                        } rounded-2 w-100`}
                        data-bs-toggle="collapse"
                        data-bs-target="#special-requirements"
                        aria-expanded="false"
                        aria-controls="special-requirements"
                    >
                        Special requirements
                    </button>
                </div>
                <div
                    id="special-requirements"
                    className="col-12 collapse"
                >
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
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="ctpat"
                            name="ctpat"
                            checked={formData.ctpat}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        ctpat: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="ctpat"
                        >
                            C-TPAT
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="twic"
                            name="twic"
                            checked={formData.twic}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        twic: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="twic"
                        >
                            TWIC
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tsa"
                            name="tsa"
                            checked={formData.tsa}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        tsa: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="tsa"
                        >
                            TSA
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="fast"
                            name="fast"
                            checked={formData.fast}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        fast: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="fast"
                        >
                            FAST
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tanker_endorsement"
                            name="tanker_endorsement"
                            checked={formData.tanker_endorsement}
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        tanker_endorsement: e.target.checked,
                                    };
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="tanker_endorsement"
                        >
                            Tanker endorsement
                        </label>
                    </div>
                </div>
            </fieldset>
            <button
                type="submit"
                className="btn btn-dark bg-gradient shadow-sm fw-bold w-100 rounded-pill"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
