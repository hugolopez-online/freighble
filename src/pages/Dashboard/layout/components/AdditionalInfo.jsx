const AdditionalInfo = ({ specs, setSpecs, theme }) => {
    return (
        <div
            className={`card border ${
                theme === "light"
                    ? "bg-light"
                    : "bg-dark bg-opacity-10 border-secondary"
            } bg-gradient shadow-sm rounded-4 p-4`}
        >
            <div
                className={`row border-bottom ${
                    theme === "light" ? "" : "border-secondary"
                } mb-2`}
            >
                <div className="col-12">
                    <h6
                        className={`text-${
                            theme === "light"
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
                        value={specs.optional.origin_date}
                        onChange={(e) => {
                            setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        origin_date: e.target.value,
                                    },
                                };
                            });
                        }}
                    />
                    <input
                        id="destination_date"
                        type="date"
                        className="form-control form-control-sm"
                        value={specs.optional.destination_date}
                        onChange={(e) => {
                            setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        destination_date: e.target.value,
                                    },
                                };
                            });
                        }}
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
                        value={specs.optional.unit_type}
                        onChange={(e) => {
                            setSpecs((prev) => {
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
                        value={specs.optional.cargo_details}
                        onChange={(e) => {
                            setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        cargo_details: e.target.value,
                                    },
                                };
                            });
                        }}
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
                        value={specs.optional.instructions}
                        onChange={(e) => {
                            setSpecs((prev) => {
                                return {
                                    ...prev,
                                    optional: {
                                        ...prev.optional,
                                        instructions: e.target.value,
                                    },
                                };
                            });
                        }}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfo;
