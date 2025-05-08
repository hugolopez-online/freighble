const Banner = (props) => {
    const enoughData =
        props.specs.mode &&
        props.specs.origin.country &&
        props.specs.destination.country;
    return (
        <div className="border-bottom bg-body mb-3">
            <h1 className="fw-bold">Search results</h1>
            {enoughData ? (
                <div>
                    <p>
                        <strong>Details: </strong>
                        {`${props.specs.usbond ? "U.S. bonded " : ""}
                            ${props.specs.canadabond ? "Canada bonded " : ""}
                            ${props.specs.hazmat ? "Hazmat " : ""}
                            ${props.specs.mode} from 
                            ${
                                props.specs.origin.city
                                    ? props.specs.origin.city + ", "
                                    : ""
                            }
                            ${
                                props.specs.origin.state +
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
                                props.specs.destination.state +
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
                                props.setSpecs(props.defaultSpecs);
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
                            className="btn btn-dark shadow-sm"
                            type="button"
                            onClick={() => props.templateSpecs(props.specs)}
                        >
                            Template new search
                        </button>
                    </p>
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Enter details to display suitable vendors.
                </div>
            )}
        </div>
    );
};

export default Banner;
