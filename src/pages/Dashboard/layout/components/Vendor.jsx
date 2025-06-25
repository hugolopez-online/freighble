const Vendor = (props) => {
    const greeting = encodeURIComponent(
        `Hello team ${props.company},\n\nPlease help with pricing and confirming availability for the shipment below.\n\n`
    );
    const origin_info = encodeURIComponent(
        `Origin: ${props.specs.origin.city}, ${props.specs.origin.territory} (${
            props.specs.origin_date || "date TBD"
        })\n`
    );
    const destination_info = encodeURIComponent(
        `Destination: ${props.specs.destination.city}, ${
            props.specs.destination.territory
        } (${props.specs.destination_date || "date TBD"})${
            props.specs.border !== "None"
                ? "\nBorder crossing through: " +
                  props.specs.border.split("+").join(" ")
                : ""
        }\n\n`
    );

    const specs_info = encodeURIComponent(
        `Mode: ${props.specs.mode}\nUnit type: ${
            props.specs.unit_type || "(not defined)"
        }\nCargo details: ${props.specs.cargo_details || "(not defined)"}\n\n`
    );

    // @hugolopez-online: special services still missing
    const instructions_info = encodeURIComponent(
        `${
            props.specs.instructions &&
            "Additional instructions: " + props.specs.instructions + "\n\n"
        }`
    );
    const signature = encodeURIComponent(
        `Let me know if you have any questions.\n\nKind regards!`
    );

    const EMAIL_SUBJECT = encodeURIComponent(
        `${props.specs.mode} (${props.specs.origin.city}, ${props.specs.origin.territory} to ${props.specs.destination.city}, ${props.specs.destination.territory}) [${props.company}]`
    );
    const EMAIL_BODY =
        greeting +
        origin_info +
        destination_info +
        specs_info +
        instructions_info +
        signature;

    const MAILTO_LINK = `mailto:${props.email}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

    return (
        <div className="col-12">
            <div className="input-group shadow-sm rounded-4">
                <div className="card border bg-light bg-gradient col rounded-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title fw-bold text-dark m-0">
                                <span
                                    className={`text-truncate d-inline-block position-relative vendor-company`}
                                    style={{
                                        maxWidth:
                                            props.type.asset_based &&
                                            props.type.freight_broker &&
                                            window.innerWidth < 768
                                                ? "50%"
                                                : window.innerWidth >= 768
                                                ? "80%"
                                                : "65%",
                                        top: "0.4rem",
                                    }}
                                >
                                    {props.company}
                                </span>
                                <span style={{ fontSize: "0.7em" }}>
                                    {props.type.asset_based && (
                                        <i className="bi bi-patch-check-fill text-primary ms-2"></i>
                                    )}
                                    {props.type.freight_broker && (
                                        <i className="bi bi-exclamation-triangle-fill text-warning ms-2"></i>
                                    )}
                                </span>
                                <button
                                    type="button"
                                    className={`btn btn-sm btn-${
                                        props.score < 60
                                            ? "danger"
                                            : "dark fw-bold"
                                    } bg-gradient ms-2 py-0 rounded-pill`}
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${props.dispatched_key}-extra-info`}
                                    aria-expanded="false"
                                    aria-controls={`${props.dispatched_key}-extra-info`}
                                >
                                    <i
                                        className={`bi bi-${
                                            props.score < 60
                                                ? "x-octagon"
                                                : "crosshair"
                                        }`}
                                    ></i>{" "}
                                    {props.score}%
                                </button>
                            </h5>
                            <a
                                href={MAILTO_LINK}
                                target="_blank"
                                className="btn btn-primary bg-gradient rounded-3 px-3 m-0"
                                onClick={(e) => {
                                    e.currentTarget.classList.replace(
                                        "btn-primary",
                                        "btn-secondary"
                                    );
                                    e.currentTarget.classList.remove(
                                        "bg-gradient"
                                    );
                                }}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.426 11.0952L4.42601 3.09517C4.25482 3.01462 4.0643 2.98428 3.87657 3.00768C3.68883 3.03108 3.51158 3.10725 3.36541 3.22735C3.21923 3.34745 3.11012 3.50656 3.05076 3.68619C2.99139 3.86582 2.98419 4.05861 3.03001 4.24217L4.24201 9.09117L12 12.0002L4.24201 14.9092L3.03001 19.7582C2.98333 19.9419 2.98992 20.135 3.04902 20.3151C3.10811 20.4952 3.21726 20.6547 3.3637 20.7751C3.51014 20.8954 3.68782 20.9715 3.87594 20.9946C4.06406 21.0176 4.25486 20.9866 4.42601 20.9052L21.426 12.9052C21.5978 12.8244 21.7431 12.6964 21.8448 12.5362C21.9466 12.3759 22.0006 12.19 22.0006 12.0002C22.0006 11.8103 21.9466 11.6244 21.8448 11.4642C21.7431 11.3039 21.5978 11.1759 21.426 11.0952Z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div
                            className="collapse"
                            id={`${props.dispatched_key}-extra-info`}
                        >
                            <a
                                href={`https://www.google.com/maps/search/${props.domicile.city},+${props.domicile.territory},+${props.domicile.country}`}
                                target="_blank"
                                className="btn badge text-bg-secondary bg-gradient fw-normal me-1"
                            >
                                <i className="bi bi-house-fill"></i>{" "}
                                {`${props.domicile.city}, ${props.domicile.territory}`}
                            </a>
                            <a
                                href={`tel:${props.phone}`}
                                target="_blank"
                                className="btn badge text-bg-secondary bg-gradient fw-normal me-1"
                            >
                                <i className="bi bi-person-rolodex"></i>{" "}
                                {props.contact}: {props.phone}
                            </a>
                            <a
                                href={`mailto:${props.email}`}
                                target="_blank"
                                className="btn badge text-bg-secondary bg-gradient fw-normal"
                            >
                                <i className="bi bi-envelope-fill"></i>{" "}
                                {props.email}
                            </a>
                            <hr className="text-secondary mt-1 mb-0" />

                            <p
                                className="text-secondary mt-1 mb-0"
                                style={{ fontSize: "0.75rem" }}
                            >
                                Qualifying factors:
                            </p>
                            <span
                                className="badge rounded-pill text-bg-success me-1"
                                style={{ fontSize: "0.75rem" }}
                            >
                                {props.specs.mode}
                                <i className="bi bi-check-circle-fill ms-2"></i>
                            </span>
                            <span
                                className="badge rounded-pill text-bg-success me-1"
                                style={{ fontSize: "0.75rem" }}
                            >
                                Origin: {props.specs.origin.country}
                                <i className="bi bi-check-circle-fill ms-2"></i>
                            </span>
                            <span
                                className={`badge rounded-pill ${
                                    Object.keys(props.coverage)
                                        .map((country) =>
                                            props.coverage[
                                                country
                                            ].territory.includes(
                                                props.specs.origin.territory
                                            )
                                        )
                                        .includes(true)
                                        ? "text-bg-success"
                                        : "text-secondary border border-secondary fw-normal"
                                } me-1`}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Origin: {props.specs.origin.territory}
                                <i
                                    className={`bi bi-${
                                        Object.keys(props.coverage)
                                            .map((country) =>
                                                props.coverage[
                                                    country
                                                ].territory.includes(
                                                    props.specs.origin.territory
                                                )
                                            )
                                            .includes(true)
                                            ? "check-circle-fill"
                                            : "x-circle"
                                    } ms-2`}
                                ></i>
                            </span>
                            <span
                                className="badge rounded-pill text-bg-success me-1"
                                style={{ fontSize: "0.75rem" }}
                            >
                                Destination: {props.specs.destination.country}
                                <i className="bi bi-check-circle-fill ms-2"></i>
                            </span>
                            <span
                                className={`badge rounded-pill ${
                                    Object.keys(props.coverage)
                                        .map((country) =>
                                            props.coverage[
                                                country
                                            ].territory.includes(
                                                props.specs.destination
                                                    .territory
                                            )
                                        )
                                        .includes(true)
                                        ? "text-bg-success"
                                        : "text-secondary border border-secondary fw-normal"
                                } me-1`}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Destination: {props.specs.destination.territory}
                                <i
                                    className={`bi bi-${
                                        Object.keys(props.coverage)
                                            .map((country) =>
                                                props.coverage[
                                                    country
                                                ].territory.includes(
                                                    props.specs.destination
                                                        .territory
                                                )
                                            )
                                            .includes(true)
                                            ? "check-circle-fill"
                                            : "x-circle"
                                    } ms-2`}
                                ></i>
                            </span>
                            {props.borders.includes(props.specs.border) &&
                                props.specs.border !== "None" && (
                                    <span
                                        className="badge rounded-pill text-bg-success me-1"
                                        style={{ fontSize: "0.75rem" }}
                                    >
                                        Border crossing: {props.specs.border}
                                        <i className="bi bi-check-circle-fill ms-2"></i>
                                    </span>
                                )}
                            {props.hazmat && props.specs.hazmat && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Hazmat
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.team_drivers && props.specs.team_drivers && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Team drivers
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.usa_bonded && props.specs.usa_bonded && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    U.S. bonded
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.can_bonded && props.specs.can_bonded && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Canada bond
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.ctpat && props.specs.ctpat && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    C-TPAT
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.twic && props.specs.twic && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    TWIC
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.tsa && props.specs.tsa && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    TSA
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.fast && props.specs.fast && (
                                <span
                                    className="badge rounded-pill text-bg-success me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    FAST
                                    <i className="bi bi-check-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.matched_core_lane && (
                                <span
                                    className="badge rounded-pill text-bg-primary bg-gradient me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Core lane ~ {props.matched_core_lane}
                                    <i className="bi bi-star-fill ms-2"></i>
                                </span>
                            )}
                            {props.matched_exclusive_lane && (
                                <span
                                    className="badge rounded-pill text-bg-warning bg-gradient me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Exclusive lane ~{" "}
                                    {props.matched_exclusive_lane}
                                    <i className="bi bi-exclamation-circle-fill ms-2"></i>
                                </span>
                            )}
                            {props.matched_banned_lane && (
                                <span
                                    className="badge rounded-pill text-bg-danger me-1"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Banned lane ~ {props.matched_banned_lane}
                                    <i className="bi bi-exclamation-circle ms-2"></i>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendor;
