import specsWeight from "../handlers/suitabilityMeta";
import { useState, useEffect } from "react";

const base_score = specsWeight.mandatory;

const Vendor = (props) => {
    const [suitability, setSuitability] = useState(base_score);
    const oStateW = specsWeight.desirable.oStateW;
    const dStateW = specsWeight.desirable.dStateW;

    console.log(oStateW, dStateW);

    useEffect(() => {
        setSuitability(base_score);
        let new_score = 0;

        for (let country_lookup of Object.keys(props.coverage)) {
            if (
                props.coverage[country_lookup].country_code ==
                    props.specs.origin.country &&
                props.coverage[country_lookup].territory.length != 0
            ) {
                if (
                    props.coverage[country_lookup].territory.includes(
                        props.specs.origin.territory
                    )
                ) {
                    new_score += oStateW;
                }
            }

            if (
                props.coverage[country_lookup].country_code ==
                    props.specs.destination.country &&
                props.coverage[country_lookup].territory.length != 0
            ) {
                if (
                    props.coverage[country_lookup].territory.includes(
                        props.specs.destination.territory
                    )
                ) {
                    new_score += dStateW;
                }
            }
        }

        setSuitability(base_score + Math.round(new_score));
    }, [props.specs]);

    return (
        <div className="col-11 col-md-10">
            <div className="input-group shadow-sm rounded-3">
                <div className="card bg-light-subtle col rounded-start-3">
                    <div
                        className="position-absolute"
                        style={{ top: "-0.5em", right: "0.25em" }}
                    >
                        <span className="badge border border-primary text-bg-info">
                            <i className="bi bi-crosshair"></i> {suitability}%
                        </span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title fw-bold text-dark">
                            {props.company}
                            <span style={{ fontSize: "0.7em" }}>
                                {props.type.asset_based && (
                                    <i className="bi bi-patch-check-fill text-primary ms-2"></i>
                                )}
                                {props.type.freight_broker && (
                                    <i className="bi bi-patch-exclamation text-danger ms-2"></i>
                                )}
                            </span>
                            <span
                                className="fw-light text-secondary ms-2"
                                style={{ fontSize: "0.7rem" }}
                            >
                                (
                                {props.domicile.territory.concat(
                                    ", ",
                                    props.domicile.country
                                )}
                                )
                            </span>
                        </h5>
                        <div className="collapse">
                            <p className="card-text m-0 text-secondary">
                                <i className="bi bi-people-fill"></i>{" "}
                                {props.contact}:{" "}
                                <em>
                                    <a href={`tel:${props.phone}`}>
                                        {props.phone}
                                    </a>
                                </em>
                            </p>
                            <p className="card-text mb-2 text-secondary">
                                <i className="bi bi-envelope-fill"></i>{" "}
                                <a href={`mailto:${props.email}`}>
                                    {props.email}
                                </a>
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
                                props.specs.border !== "N/A" && (
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
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-dark rounded-end-3"
                >
                    <i className="bi bi-envelope"></i> Contact
                </button>
            </div>
        </div>
    );
};

export default Vendor;
