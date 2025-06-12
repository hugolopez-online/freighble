import { useEffect, useState } from "react";

const Console = (props) => {
    // states

    const [minData, setMinData] = useState(false);

    // effects

    useEffect(() => {
        if (
            props.specs.mode &&
            props.specs.origin.country &&
            props.specs.destination.country
        ) {
            setMinData(true);
        } else {
            setMinData(false);
        }
    }, [props.specs]);

    return (
        <div className="navbar bg-light p-2 rounded-pill border border-tertiary">
            <div className="container-fluid px-1">
                {/* @hugolopez-online: make dynamic depending on search status */}
                {/*<div className="bg-secondary bg-gradient-deep tight-pocket rounded-pill">
                    <button className="btn btn-sm btn-primary bg-gradient rounded-pill fw-bold px-3">
                        active search
                    </button>
                    <span className="text-light fw-light mx-3">directory</span>
                </div>*/}
                {/* @hugolopez-online: make dynamic depending on search status and amount of vendors in db */}
                <div
                    id="console-display"
                    className={`rounded-pill border border-white bg-secondary bg-gradient-deep d-none d-md-block${
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
                            }${props.specs.mode} from ${
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
                                props.specs.border !== "None"
                                    ? ", crossing through " +
                                      props.specs.border.split("+").join(" ")
                                    : ""
                            }${
                                props.specs.ctpat ||
                                props.specs.twic ||
                                props.specs.tsa ||
                                props.specs.fast
                                    ? " (Extras:" +
                                      (props.specs.ctpat ? " C-TPAT," : "") +
                                      (props.specs.twic ? " TWIC," : "") +
                                      (props.specs.tsa ? " TSA," : "") +
                                      (props.specs.fast ? " FAST," : "") +
                                      " certified)"
                                    : ""
                            }`}</>
                        ) : (
                            "enter load details below"
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
                            document.getElementById("mode").focus();
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
                        className="btn btn-sm btn-light shadow-sm text-secondary bg-gradient rounded-pill"
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
