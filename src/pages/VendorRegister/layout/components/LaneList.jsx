const LaneList = (props) => {
    // module
    const label = props.target.label;
    const lanes = props.data[props.target.ref];

    // render
    return (
        <div className="col-4">
            <h6 className="text-dark-emphasis">{label} lanes</h6>
            {lanes.length !== 0 ? (
                lanes.map((lane, index) => {
                    return (
                        <span
                            key={`lanes-${lane}-${index}`}
                            className={`fw-medium badge text-bg-${
                                label === "preferred"
                                    ? "success"
                                    : label === "exclusive"
                                    ? "primary"
                                    : "danger"
                            } bg-gradient rounded-pill me-1`}
                        >
                            {lane}{" "}
                            <i
                                className="bi bi-x"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    props.setData((prev) => {
                                        return {
                                            ...prev,
                                            [props.target.ref]: [
                                                ...prev[props.target.ref],
                                            ].filter((l) => l !== lane),
                                        };
                                    });
                                }}
                            ></i>
                        </span>
                    );
                })
            ) : (
                <em className="text-secondary fw-light">empty list...</em>
            )}
        </div>
    );
};

export default LaneList;
