const Banner = (props) => {
    const MIN_DATA =
        props.specs.mandatory.mode &&
        props.specs.mandatory.origin.country &&
        props.specs.mandatory.destination.country;

    return (
        <div
            className={`card border ${
                props.theme === "light"
                    ? "bg-light"
                    : "bg-dark bg-opacity-10 border-secondary"
            } bg-gradient shadow-sm rounded-4 p-4`}
        >
            <div
                className={`row border-bottom ${
                    props.theme === "light" ? "" : "border-secondary"
                } mb-2`}
            >
                <div className="col-12">
                    <h6
                        className={`text-${
                            props.theme === "light"
                                ? "dark-emphasis"
                                : "light text-opacity-75"
                        } fs-2 brand-font`}
                    >
                        ADDITIONAL INFO
                    </h6>
                </div>
            </div>
            <div className="row mb-2">
                <label
                    htmlFor="origin_date"
                    className="fw-medium text-secondary col-6"
                    style={{ fontSize: "0.85em" }}
                >
                    pick-up date
                </label>
                <label
                    htmlFor="destination_date"
                    className="fw-medium text-secondary col-6 ps-0"
                    style={{ fontSize: "0.85em" }}
                >
                    delivery date
                </label>
                <div className="input-group">
                    <input
                        id="origin_date"
                        type="date"
                        className="form-control form-control-sm"
                        value={props.specs.optional.origin_date}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        origin_date: e.target.value,
                                    },
                                };
                            });
                        }}
                        disabled={!MIN_DATA}
                    />
                    <input
                        id="destination_date"
                        type="date"
                        className="form-control form-control-sm"
                        value={props.specs.optional.destination_date}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        destination_date: e.target.value,
                                    },
                                };
                            });
                        }}
                        disabled={!MIN_DATA}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="unit_type"
                        className="fw-medium text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        unit/trailer type
                    </label>
                    <input
                        id="unit_type"
                        type="text"
                        placeholder="e.g., 53 ft dry van"
                        className="form-control form-control-sm"
                        value={props.specs.optional.unit_type}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        unit_type: e.target.value,
                                    },
                                };
                            });
                        }}
                        autoComplete="off"
                        disabled={!MIN_DATA}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="cargo_details"
                        className="fw-medium text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        cargo details
                    </label>
                    <textarea
                        name="cargo_details"
                        id="cargo_details"
                        placeholder="e.g., 20 pallets / 44,000 lbs"
                        className="form-control form-control-sm"
                        rows="2"
                        value={props.specs.optional.cargo_details}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        cargo_details: e.target.value,
                                    },
                                };
                            });
                        }}
                        disabled={!MIN_DATA}
                    ></textarea>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="instructions"
                        className="fw-medium text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        instructions
                    </label>
                    <textarea
                        name="instructions"
                        id="instructions"
                        placeholder="e.g., Call prior to arrival"
                        className="form-control form-control-sm"
                        rows="2"
                        value={props.specs.optional.instructions}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        instructions: e.target.value,
                                    },
                                };
                            });
                        }}
                        disabled={!MIN_DATA}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Banner;
