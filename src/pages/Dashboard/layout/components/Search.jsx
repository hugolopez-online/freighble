/* IMPORTS START */
import { useState } from "react";

import {
    modes,
    modes_values,
    borders,
    borders_values,
    can_territories,
    usa_territories,
    mex_territories,
} from "data/variables";
import { GEO_LOOKUP } from "data/geo_meta";
import { search_options } from "data/search_options";
/* IMPORTS END */

/* MODULE START */
const BLANK_FORM = {
    mode: "",
    origin_city: "",
    origin_territory: "",
    destination_city: "",
    destination_territory: "",
    border: "none",
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

const BLANK_SUGGESTIONS = [];

const isCrossBorder = (o, d) => {
    if (o && d) {
        return (
            (GEO_LOOKUP[d].country === "MEX") !==
            (GEO_LOOKUP[o].country === "MEX")
        );
    } else {
        return false;
    }
};
/* MODULE END */

/* COMPONENT START */
const Search = (props) => {
    // states
    const [formData, setFormData] = useState(BLANK_FORM);
    const [locationSuggestions, setLocationSuggestions] =
        useState(BLANK_SUGGESTIONS);

    // module
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

    // handlers
    const handleSpecs = (e) => {
        e.preventDefault();

        const O_REGION = GEO_LOOKUP[formData.origin_territory].region;
        const O_COUNTRY = GEO_LOOKUP[formData.origin_territory].country;

        const D_REGION = GEO_LOOKUP[formData.destination_territory].region;
        const D_COUNTRY = GEO_LOOKUP[formData.destination_territory].country;

        props.setSpecs((prev) => {
            return {
                ...prev,
                mandatory: {
                    mode: formData.mode,
                    origin: {
                        city: formData.origin_city,
                        territory: formData.origin_territory,
                        region: O_REGION,
                        country: O_COUNTRY,
                    },
                    destination: {
                        city: formData.destination_city,
                        territory: formData.destination_territory,
                        region: D_REGION,
                        country: D_COUNTRY,
                    },
                    border: formData.border,
                    hazmat: formData.hazmat,
                    team_drivers: formData.team_drivers,
                    usa_bonded: formData.usa_bonded,
                    can_bonded: formData.can_bonded,
                    ctpat: formData.ctpat,
                    twic: formData.twic,
                    tsa: formData.tsa,
                    fast: formData.fast,
                    tanker_endorsement: formData.tanker_endorsement,
                },
                optional: props.BLANK_SPECS.optional,
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
            setLocationSuggestions(BLANK_SUGGESTIONS);
        }

        e.target.addEventListener("focusout", () => {
            setTimeout(() => {
                e.target.classList.remove("show");
                document.getElementById(drop_menu).classList.remove("show");
                setLocationSuggestions(BLANK_SUGGESTIONS);
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
                        : "none",
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
                        : "none",
                };
            });
        } else {
            console.error(
                "Fatal error: autocomplete tried to handle a bad request."
            );
        }
    };

    // render
    return (
        <form
            id="search"
            className={`shadow-sm border rounded-4 p-4 ${
                props.theme === "light"
                    ? "bg-light"
                    : "bg-dark bg-opacity-10 border-secondary"
            } bg-gradient needs-validation sticky-lg-top under-navbar`}
            onSubmit={handleSpecs}
        >
            <div
                className={`row border-bottom ${
                    props.theme === "light" ? "" : "border-secondary"
                } mb-2`}
            >
                <div className="col-12">
                    <h6
                        className={`text-${
                            props.theme === "light" ? "dark" : "light"
                        } fs-2 brand-font`}
                    >
                        LOAD DETAILS
                        {formData !== BLANK_FORM && (
                            <a
                                className="font-monospace link-secondary link-underline link-underline-opacity-0 link-underline-opacity-75-hover ms-2"
                                style={{
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => setFormData(BLANK_FORM)}
                            >
                                clear form
                            </a>
                        )}
                    </h6>
                </div>
            </div>

            {/* Mode */}
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="mode"
                        className={`fw-medium text-${
                            props.theme === "light"
                                ? "dark-emphasis"
                                : "light text-opacity-75"
                        }`}
                        style={{ fontSize: "0.85em" }}
                    >
                        mode{" "}
                        <strong
                            className={`text-${
                                formData.mode ? "success" : "danger"
                            }`}
                        >
                            {formData.mode ? (
                                <i className="bi bi-check"></i>
                            ) : (
                                "*"
                            )}
                        </strong>
                    </label>
                    <select
                        className="form-select form-select-sm"
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
                        {modes_values.map((mode, index) => {
                            return (
                                <option
                                    key={mode.concat("-mode-", index)}
                                    value={mode}
                                >
                                    {modes[mode]}
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
                    className={`fw-medium text-${
                        props.theme === "light"
                            ? "dark-emphasis"
                            : "light text-opacity-75"
                    }`}
                    style={{ fontSize: "0.85em" }}
                >
                    origin{" "}
                    <strong
                        className={`text-${
                            formData.origin_territory ? "success" : "danger"
                        }`}
                    >
                        {formData.origin_territory ? (
                            <i className="bi bi-check"></i>
                        ) : (
                            "*"
                        )}
                    </strong>
                </label>
                <div className="input-group dropdown col-12">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="City"
                        id="origin_city"
                        name="origin_city"
                        value={formData.origin_city}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    origin_city: toTitleCase(e.target.value),
                                };
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
                        className="form-select form-select-sm"
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
                                        : "none",
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
                        {can_territories.map((territory, index) => {
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
                        {usa_territories.map((territory, index) => {
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
                        {mex_territories.map((territory, index) => {
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
                    className={`fw-medium text-${
                        props.theme === "light"
                            ? "dark-emphasis"
                            : "light text-opacity-75"
                    }`}
                    style={{ fontSize: "0.85em" }}
                >
                    destination{" "}
                    <strong
                        className={`text-${
                            formData.destination_territory
                                ? "success"
                                : "danger"
                        }`}
                    >
                        {formData.destination_territory ? (
                            <i className="bi bi-check"></i>
                        ) : (
                            "*"
                        )}
                    </strong>
                </label>
                <div className="input-group col-12">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="City"
                        id="destination_city"
                        name="destination_city"
                        value={formData.destination_city}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return {
                                    ...prev,
                                    destination_city: toTitleCase(
                                        e.target.value
                                    ),
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
                        className="form-select form-select-sm"
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
                                        : "none",
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
                        {can_territories.map((territory, index) => {
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
                        {usa_territories.map((territory, index) => {
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
                        {mex_territories.map((territory, index) => {
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
                    formData.border !== "none" ? "" : "d-none"
                }`}
            >
                <div className="col-12">
                    <label
                        htmlFor="border"
                        className={`fw-medium text-${
                            props.theme === "light"
                                ? "dark-emphasis"
                                : "light text-opacity-75"
                        }`}
                        style={{ fontSize: "0.85em" }}
                    >
                        border crossing port{" "}
                        <strong
                            className={`text-${
                                formData.border ? "success" : "danger"
                            }`}
                        >
                            {formData.border ? (
                                <i className="bi bi-check"></i>
                            ) : (
                                "*"
                            )}
                        </strong>
                    </label>
                    <select
                        className="form-select form-select-sm"
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
                            value="none"
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
                        {borders_values
                            .filter((border) => border !== "none")
                            .map((border, index) => {
                                return (
                                    <option
                                        key={border.concat("-border-", index)}
                                        value={border}
                                    >
                                        {borders[border]}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>

            {/* Special Requirements */}
            <fieldset className="row my-3">
                <div className="col-12">
                    <button
                        type="button"
                        className={`btn btn-sm fw-medium bg-gradient ${
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
                                : "btn-secondary"
                        } rounded-3 w-100`}
                        data-bs-toggle="collapse"
                        data-bs-target="#special-requirements"
                        aria-expanded="false"
                        aria-controls="special-requirements"
                    >
                        Special Requirements...
                    </button>
                </div>
                <div
                    id="special-requirements"
                    className={`col-12 ${
                        props.theme === "light" ? "" : "text-light"
                    } collapse`}
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
                            Tanker Endorsement
                        </label>
                    </div>
                </div>
            </fieldset>
            <button
                type="submit"
                className={`btn btn-${
                    props.theme === "light" ? "dark" : "primary"
                } bg-gradient shadow-sm fw-semibold w-100 rounded-pill`}
            >
                Search
            </button>
        </form>
    );
};
/* COMPONENT END */

export default Search;
