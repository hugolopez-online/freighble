import { modes, borders } from "data/variables";

const Console = (props) => {
    const MIN_DATA =
        props.specs.mandatory.mode &&
        props.specs.mandatory.origin.country &&
        props.specs.mandatory.destination.country;

    return (
        <div
            className={`navbar shadow ${
                props.theme === "light"
                    ? "bg-light border-tertiary"
                    : "bg-black bg-gradient border-secondary"
            } rounded-4 border sticky-top under-navbar`}
            style={{ zIndex: "1000" }}
        >
            <div className="container-fluid">
                <div
                    id="console-display"
                    className={`col-12 rounded-3 border border-${
                        props.theme === "light" ? "white" : "dark"
                    } bg-secondary bg-gradient-deep py-1 px-3 mb-2`}
                    style={{ fontSize: "0.75rem" }}
                >
                    <span
                        className={`font-monospace text-light${
                            MIN_DATA ? " marquee-item" : ""
                        }`}
                    >
                        <span className="fw-bold fs-6">current search: </span>
                        {MIN_DATA ? (
                            <i>{`${
                                props.specs.mandatory.usa_bonded
                                    ? "U.S. bonded "
                                    : ""
                            }${
                                props.specs.mandatory.can_bonded
                                    ? "Canada bonded "
                                    : ""
                            }${props.specs.mandatory.hazmat ? "Hazmat " : ""}${
                                modes[props.specs.mandatory.mode]
                            } from ${
                                props.specs.mandatory.origin.city
                                    ? props.specs.mandatory.origin.city + ", "
                                    : ""
                            }${props.specs.mandatory.origin.territory} to 
                            ${
                                props.specs.mandatory.destination.city
                                    ? props.specs.mandatory.destination.city +
                                      ", "
                                    : ""
                            }${props.specs.mandatory.destination.territory}${
                                props.specs.mandatory.team_drivers
                                    ? " with Team Drivers"
                                    : ""
                            }${
                                props.specs.mandatory.border !== "none"
                                    ? ", crossing through " +
                                      borders[props.specs.mandatory.border]
                                    : ""
                            }${
                                props.specs.mandatory.ctpat ||
                                props.specs.mandatory.twic ||
                                props.specs.mandatory.tsa ||
                                props.specs.mandatory.fast ||
                                props.specs.mandatory.tanker_endorsement
                                    ? " (Extras:" +
                                      (props.specs.mandatory.ctpat
                                          ? " C-TPAT,"
                                          : "") +
                                      (props.specs.mandatory.twic
                                          ? " TWIC,"
                                          : "") +
                                      (props.specs.mandatory.tsa
                                          ? " TSA,"
                                          : "") +
                                      (props.specs.mandatory.fast
                                          ? " FAST,"
                                          : "") +
                                      (props.specs.mandatory.tanker_endorsement
                                          ? " Tanker endorsement,"
                                          : "") +
                                      " certified)"
                                    : ""
                            }`}</i>
                        ) : (
                            <i>none...</i>
                        )}
                    </span>
                </div>
                <div className="col-12 btn-group">
                    <button
                        type="button"
                        className={`btn btn-sm bg-gradient rounded-pill d-inline-block fw-medium px-3${
                            MIN_DATA ? " btn-danger" : " btn-secondary disabled"
                        } me-2`}
                        onClick={() => {
                            document
                                .getElementById("searchForm")
                                .classList.remove("d-none");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                            props.setSpecs(props.BLANK_SPECS);
                            props.setVendorList([]);
                        }}
                    >
                        clear current search
                    </button>
                    <button
                        className={`btn btn-sm d-md-none btn-${
                            props.theme === "light"
                                ? "dark bg-gradient"
                                : "light bg-gradient-soft"
                        } rounded-pill me-2`}
                        type="button"
                        onClick={() => {
                            document
                                .getElementById("searchForm")
                                .classList.remove("d-none");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                    <button
                        className={`btn btn-sm btn-${
                            props.theme === "light"
                                ? "dark bg-gradient"
                                : "light bg-gradient-soft"
                        } rounded-pill`}
                        type="button"
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <i className="bi bi-chevron-up"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Console;
