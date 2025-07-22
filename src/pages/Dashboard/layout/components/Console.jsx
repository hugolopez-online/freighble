import { useEffect, useState } from "react";
import { modes, borders } from "data/variables";

const Console = (props) => {
    // states

    const [minData, setMinData] = useState(false);

    // effects

    useEffect(() => {
        setMinData(
            props.specs.mode &&
                props.specs.origin.country &&
                props.specs.destination.country
        );
    }, [props.specs.mode, props.specs.origin, props.specs.destination]);

    return (
        <div className="navbar bg-light p-1 rounded-pill border border-tertiary">
            <div className="container-fluid px-1">
                <div
                    id="console-display"
                    className={`col rounded-pill border border-white bg-secondary bg-gradient-deep d-none d-md-block${
                        minData ? " marquee-container" : ""
                    } p-1 px-3 ms-0 me-2`}
                    style={{ fontSize: "0.75rem" }}
                >
                    <span
                        className={`font-monospace text-light${
                            minData ? " marquee-item" : ""
                        }`}
                    >
                        {minData ? (
                            <>{`${
                                props.specs.usa_bonded ? "U.S. bonded " : ""
                            }${props.specs.can_bonded ? "Canada bonded " : ""}${
                                props.specs.hazmat ? "Hazmat " : ""
                            }${modes[props.specs.mode]} from ${
                                props.specs.origin.city
                                    ? props.specs.origin.city + ", "
                                    : ""
                            }${props.specs.origin.territory} to 
                            ${
                                props.specs.destination.city
                                    ? props.specs.destination.city + ", "
                                    : ""
                            }${props.specs.destination.territory}${
                                props.specs.team_drivers
                                    ? " with Team Drivers"
                                    : ""
                            }${
                                props.specs.border !== "none"
                                    ? ", crossing through " +
                                      borders[props.specs.border]
                                    : ""
                            }${
                                props.specs.ctpat ||
                                props.specs.twic ||
                                props.specs.tsa ||
                                props.specs.fast ||
                                props.specs.tanker_endorsement
                                    ? " (Extras:" +
                                      (props.specs.ctpat ? " C-TPAT," : "") +
                                      (props.specs.twic ? " TWIC," : "") +
                                      (props.specs.tsa ? " TSA," : "") +
                                      (props.specs.fast ? " FAST," : "") +
                                      (props.specs.tanker_endorsement
                                          ? " Tanker endorsement,"
                                          : "") +
                                      " certified)"
                                    : ""
                            }`}</>
                        ) : (
                            "enter load details"
                        )}
                    </span>
                </div>
                <div className="btn-group me-2">
                    <button
                        type="button"
                        className={`btn btn-sm bg-gradient rounded-pill rounded-end px-3 fw-bold${
                            minData ? " btn-primary" : " btn-secondary disabled"
                        }`}
                        onClick={() => {
                            document
                                .getElementById("searchForm")
                                .classList.remove("d-none");
                            props.templateSpecs(props.specs);
                            document.getElementById("origin_city").focus();
                        }}
                    >
                        template
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm bg-gradient rounded-pill rounded-start px-3${
                            minData ? " btn-danger" : " btn-secondary disabled"
                        }`}
                        onClick={() => {
                            document
                                .getElementById("searchForm")
                                .classList.remove("d-none");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                            props.setSpecs(props.default_specs);
                            props.templateSpecs(props.default_specs);
                        }}
                    >
                        clear
                    </button>
                </div>
                <div className="btn-group">
                    <button
                        className="btn btn-sm btn-light shadow-sm text-secondary bg-gradient rounded-pill d-inline-block d-md-none me-2"
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
                        className="btn btn-sm btn-secondary bg-gradient rounded-pill"
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
