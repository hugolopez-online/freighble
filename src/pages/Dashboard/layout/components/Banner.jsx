const Banner = (props) => {
    const min_data =
        props.specs.mode &&
        props.specs.origin.country &&
        props.specs.destination.country;

    return (
        <div className="card border text-bg-light bg-gradient shadow-sm rounded-4 p-4">
            <div className="row border-bottom mb-2">
                <div className="col-12">
                    <h6 className="display-6 text-secondary fs-2">
                        additional info
                    </h6>
                </div>
            </div>
            <div className="row mb-2">
                <label
                    htmlFor="origin_date"
                    className="fw-normal text-secondary col-6"
                    style={{ fontSize: "0.85em" }}
                >
                    pick-up date
                </label>
                <label
                    htmlFor="destination_date"
                    className="fw-normal text-secondary col-6 ps-0"
                    style={{ fontSize: "0.85em" }}
                >
                    delivery date
                </label>
                <div className="input-group">
                    <input
                        id="origin_date"
                        type="date"
                        className="form-control form-control-sm"
                        value={props.specs.origin_date}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return { ...prev, origin_date: e.target.value };
                            });
                        }}
                        disabled={!min_data}
                    />
                    <input
                        id="destination_date"
                        type="date"
                        className="form-control form-control-sm"
                        value={props.specs.destination_date}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    destination_date: e.target.value,
                                };
                            });
                        }}
                        disabled={!min_data}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="unit_type"
                        className="fw-normal text-secondary"
                        style={{ fontSize: "0.85em" }}
                    >
                        unit/trailer type
                    </label>
                    <input
                        id="unit_type"
                        type="text"
                        placeholder="e.g., 53 ft dry van"
                        className="form-control form-control-sm"
                        value={props.specs.unit_type}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return { ...prev, unit_type: e.target.value };
                            });
                        }}
                        autoComplete="off"
                        disabled={!min_data}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="cargo_details"
                        className="fw-normal text-secondary"
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
                        value={props.specs.cargo_details}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    cargo_details: e.target.value,
                                };
                            });
                        }}
                        disabled={!min_data}
                    ></textarea>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <label
                        htmlFor="instructions"
                        className="fw-normal text-secondary"
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
                        value={props.specs.instructions}
                        onChange={(e) => {
                            props.setSpecs((prev) => {
                                return {
                                    ...prev,
                                    instructions: e.target.value,
                                };
                            });
                        }}
                        disabled={!min_data}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Banner;
