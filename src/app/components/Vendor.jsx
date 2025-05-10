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
                country_lookup.territory.length != 0
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
                country_lookup.territory.length != 0
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
            <div className="card bg-light-subtle shadow-sm">
                <div
                    className="position-absolute"
                    style={{ top: "-0.5em", right: "-0.25em" }}
                >
                    <span className="badge border border-primary text-bg-info">
                        <i className="bi bi-crosshair"></i> {suitability}%
                    </span>
                </div>
                <div className="card-body">
                    <h4 className="card-title text-dark">
                        {props.company}
                        <span className="text-success">
                            {props.type.asset_based && (
                                <i className="bi bi-truck ms-2"></i>
                            )}
                            {props.type.freight_broker && (
                                <i className="bi bi-share ms-2"></i>
                            )}
                        </span>
                        <span
                            className="fw-light text-secondary ms-2"
                            style={{ fontSize: "0.75rem" }}
                        >
                            (
                            {props.domicile.state.concat(
                                ", ",
                                props.domicile.country
                            )}
                            )
                        </span>
                    </h4>
                    <p className="card-text m-0 text-secondary">
                        <i className="bi bi-people-fill"></i> {props.contact}:{" "}
                        <em>
                            <a href={`tel:${props.phone}`}>{props.phone}</a>
                        </em>
                    </p>
                    <p className="card-text mb-2 text-secondary">
                        <i className="bi bi-envelope-fill"></i>{" "}
                        <a href={`mailto:${props.email}`}>{props.email}</a>
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
                            props.coverage
                                .map(
                                    (country) =>
                                        country.coverageContent.includes(
                                            props.specs.origin.state
                                        ) && true
                                )
                                .includes(true)
                                ? "text-bg-success"
                                : "text-secondary border border-secondary fw-normal"
                        } me-1`}
                        style={{ fontSize: "0.75rem" }}
                    >
                        Origin: {props.specs.origin.state}
                        <i
                            className={`bi bi-${
                                props.coverage
                                    .map(
                                        (country) =>
                                            country.coverageContent.includes(
                                                props.specs.origin.state
                                            ) && true
                                    )
                                    .includes(true)
                                    ? "check-circle-fill"
                                    : "x-circle"
                            } ms-2`}
                        ></i>
                    </span>
                    {props.coverage
                        .map(
                            (country) =>
                                country.coverageContent[0] &&
                                country.coverageCountryAlias
                        )
                        .includes(props.specs.destination.country) && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            Destination: {props.specs.destination.country}
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                    <span
                        className={`badge rounded-pill ${
                            props.coverage
                                .map(
                                    (country) =>
                                        country.coverageContent.includes(
                                            props.specs.destination.state
                                        ) && true
                                )
                                .includes(true)
                                ? "text-bg-success"
                                : "text-secondary border border-secondary fw-normal"
                        } me-1`}
                        style={{ fontSize: "0.75rem" }}
                    >
                        Destination: {props.specs.destination.state}
                        <i
                            className={`bi bi-${
                                props.coverage
                                    .map(
                                        (country) =>
                                            country.coverageContent.includes(
                                                props.specs.destination.state
                                            ) && true
                                    )
                                    .includes(true)
                                    ? "check-circle-fill"
                                    : "x-circle"
                            } ms-2`}
                        ></i>
                    </span>
                    {props.vendorBorder.includes(props.specs.border) &&
                        props.specs.border !== "N/A" && (
                            <span
                                className="badge rounded-pill text-bg-success me-1"
                                style={{ fontSize: "0.75rem" }}
                            >
                                Border crossing: {props.specs.border}
                                <i className="bi bi-check-circle-fill ms-2"></i>
                            </span>
                        )}
                    {props.vendorHazmat && props.specs.hazmat && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            Hazmat
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                    {props.vendorTeamDrivers && props.specs.team && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            Team drivers
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                    {props.vendorUSBonded && props.specs.usbond && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            U.S. bond
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                    {props.vendorCanadaBonded && props.specs.canadabond && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            Canada bond
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                </div>
                <button
                    className="btn btn-primary m-2"
                    type="button"
                >
                    Request pricing
                </button>
            </div>
        </div>
    );
};

export default Vendor;
