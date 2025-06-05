import suitability_weight from "../handlers/suitability_meta";
import { useState, useEffect } from "react";

const base_score = suitability_weight.mandatory;

const Vendor = (props) => {
    const [suitability, setSuitability] = useState(base_score);
    const origin_territory_weight =
        suitability_weight.desirable.origin_territory_weight;
    const destination_territory_weight =
        suitability_weight.desirable.destination_territory_weight;

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
                    new_score += origin_territory_weight;
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
                    new_score += destination_territory_weight;
                }
            }
        }

        setSuitability(base_score + Math.round(new_score));
    }, [props.specs]);

    return (
        <div className="col-12">
            <div className="input-group shadow-sm rounded-4">
                <div className="card border bg-light bg-gradient col rounded-start-4">
                    <div
                        className="position-absolute"
                        style={{ top: "-0.75em", right: "0.25em" }}
                    >
                        <span className="badge border border-primary text-bg-info">
                            <i className="bi bi-crosshair"></i> {suitability}%
                        </span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title fw-bold text-dark m-0">
                            <span style={{ fontSize: "0.7em" }}>
                                {props.type.asset_based && (
                                    <i className="bi bi-patch-check-fill text-primary me-2"></i>
                                )}
                                {props.type.freight_broker && (
                                    <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                                )}
                            </span>
                            <span
                                className={`text-truncate d-inline-block position-relative`}
                                style={{
                                    maxWidth: "60%",
                                    top: "4px",
                                }}
                            >
                                {props.company}
                            </span>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary ms-2 py-0 ps-1 pe-2 rounded-5"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${props.dispatched_key}-extra-info`}
                                aria-expanded="false"
                                aria-controls={`${props.dispatched_key}-extra-info`}
                            >
                                +info
                            </button>
                        </h5>
                        <div
                            className="collapse"
                            id={`${props.dispatched_key}-extra-info`}
                        >
                            <hr />
                            <p className="card-text m-0 text-secondary">
                                <i className="bi bi-house-fill"></i>{" "}
                                {`${props.domicile.territory}, ${props.domicile.country}`}
                            </p>
                            <p className="card-text m-0 text-secondary">
                                <i className="bi bi-people-fill"></i>{" "}
                                {props.contact}:{" "}
                                <a href={`tel:${props.phone}`}>{props.phone}</a>
                            </p>
                            <p className="card-text m-0 text-secondary">
                                <i className="bi bi-envelope-fill"></i>{" "}
                                <a href={`mailto:${props.email}`}>
                                    {props.email}
                                </a>
                            </p>
                            <hr />
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
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary rounded-end-4 px-4">
                    <i className="bi bi-envelope-fill"></i>
                </button>
            </div>
        </div>
    );
};

export default Vendor;
