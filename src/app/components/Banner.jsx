const Banner = (props) => {
    const min_data =
        props.specs.mode &&
        props.specs.origin.country &&
        props.specs.destination.country;
    return (
        <div className="border-bottom bg-body mb-3">
            <h1 className="fw-bold">Search results</h1>
            {min_data ? (
                <div>
                    <p>
                        <strong>Details: </strong>
                        {`${props.specs.usa_bonded ? "U.S. bonded " : ""}
                            ${props.specs.can_bonded ? "Canada bonded " : ""}
                            ${props.specs.hazmat ? "Hazmat " : ""}
                            ${props.specs.mode} from 
                            ${
                                props.specs.origin.city
                                    ? props.specs.origin.city + ", "
                                    : ""
                            }
                            ${
                                props.specs.origin.territory +
                                " (" +
                                props.specs.origin.country +
                                ")"
                            } to 
                            ${
                                props.specs.destination.city
                                    ? props.specs.destination.city + ", "
                                    : ""
                            }
                            ${
                                props.specs.destination.territory +
                                " (" +
                                props.specs.destination.country +
                                ")"
                            }
                            ${props.specs.team ? " with Team Drivers" : ""}
                            ${
                                props.specs.border !== "N/A"
                                    ? ", crossing through " + props.specs.border
                                    : ""
                            }`}
                    </p>
                    <p>
                        <button
                            className="btn btn-warning shadow-sm me-2"
                            type="button"
                            onClick={() => {
                                props.setSpecs(props.default_specs);
                                document
                                    .getElementById("navbar")
                                    .scrollIntoView({
                                        block: "start",
                                        behavior: "smooth",
                                    });
                            }}
                        >
                            Clear results
                        </button>
                        <button
                            className="btn btn-dark shadow-sm me-2"
                            type="button"
                            onClick={() => props.templateSpecs(props.specs)}
                        >
                            Template new search
                        </button>
                        <button
                            className="btn btn-outline-dark shadow-sm me-2"
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
                    Enter details to display suitable vendors.
                </div>
            )}
        </div>
    );
};

export default Banner;
