const AddLane = (props) => {
    // handlers
    const addLane = (target) => {
        if (!props.laneOrigin.value) {
            document
                .getElementById(`${props.laneOrigin.label}-lane_location`)
                .focus();
            return false;
        }

        if (!props.laneDestination.value) {
            document
                .getElementById(`${props.laneDestination.label}-lane_location`)
                .focus();
            return false;
        }

        const a = props.laneOrigin.value;
        const a_city = props.laneOrigin.city;

        const b = props.laneDestination.value;
        const b_city = props.laneDestination.city;

        const main_lane = `${a_city ? `${a_city}, ${a}` : a}:${
            b_city ? `${b_city}, ${b}` : b
        }`;
        const return_lane = `${b_city ? `${b_city}, ${b}` : b}:${
            a_city ? `${a_city}, ${a}` : a
        }`;

        let lanes = [main_lane];

        if (props.isBothWays) {
            lanes.push(return_lane);
        }

        props.setFormData((prev) => {
            return {
                ...prev,
                [target]: [...new Set([...prev[target], lanes].flat(Infinity))],
            };
        });
    };
    // render
    return (
        <button
            type="button"
            className="btn btn-sm btn-dark rounded-3 bg-gradient mx-1"
            onClick={() => addLane(props.target.ref)}
        >
            Add to <em className="fw-semibold">{props.target.label} lanes</em>
        </button>
    );
};

export default AddLane;
