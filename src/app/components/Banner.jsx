const Banner = (props) => {
    const min_data =
        props.specs.mode &&
        props.specs.origin.country &&
        props.specs.destination.country;
    return (
        <div className="border-bottom bg-body mb-3">
            <h3 className="fw-bold">Search results</h3>
            {min_data ? (
                <div>
                    <p className="mb-1">
                        <strong>Details: </strong>
                        {`${props.specs.usa_bonded ? "U.S. bonded " : ""}${
                            props.specs.can_bonded ? "Canada bonded " : ""
                        }${props.specs.hazmat ? "Hazmat " : ""}${
                            props.specs.mode
                        } from ${
                            props.specs.origin.city
                                ? props.specs.origin.city + ", "
                                : ""
                        }${
                            props.specs.origin.territory +
                            " (" +
                            props.specs.origin.country +
                            ")"
                        } to 
                            ${
                                props.specs.destination.city
                                    ? props.specs.destination.city + ", "
                                    : ""
                            }${
                            props.specs.destination.territory +
                            " (" +
                            props.specs.destination.country +
                            ")"
                        }${
                            props.specs.team_drivers ? " with Team Drivers" : ""
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
                                ? " - (Extras:" +
                                  (props.specs.ctpat ? " C-TPAT," : "") +
                                  (props.specs.twic ? " TWIC," : "") +
                                  (props.specs.tsa ? " TSA," : "") +
                                  (props.specs.fast ? " FAST," : "") +
                                  " certified)"
                                : ""
                        }`}
                    </p>
                    <p>
                        <button
                            className="btn btn-sm btn-warning shadow-sm me-2"
                            type="button"
                            onClick={() => {
                                document
                                    .getElementById("navbar")
                                    .scrollIntoView({
                                        block: "start",
                                        behavior: "smooth",
                                    });
                                props.setSpecs(props.default_specs);
                            }}
                        >
                            Clear results
                        </button>
                        <button
                            className="btn btn-sm btn-dark shadow-sm fw-bold me-2"
                            type="button"
                            onClick={() => props.templateSpecs(props.specs)}
                        >
                            Template new search
                        </button>
                        <button
                            className="btn btn-sm btn-outline-secondary shadow-sm me-2"
                            type="button"
                            onClick={() => {
                                document
                                    .getElementById("navbar")
                                    .scrollIntoView({
                                        block: "start",
                                        behavior: "smooth",
                                    });
                            }}
                        >
                            <i className="bi bi-chevron-up"></i>
                        </button>
                    </p>
                </div>
            ) : (
                <div
                    className="alert alert-warning"
                    role="alert"
                >
                    Enter load details to display suitable vendors.
                </div>
            )}
        </div>
    );
};

export default Banner;
