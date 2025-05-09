import specsWeight from "../handlers/suitabilityMeta";
import { useState, useEffect } from "react";

const baseSuitabilityScore = specsWeight.mandatory;

const Vendor = (props) => {
    const [suitability, setSuitability] = useState(baseSuitabilityScore);
    const oStateW = specsWeight.desirable.oStateW;
    const dStateW = specsWeight.desirable.dStateW;

    console.log(oStateW, dStateW);
    

    useEffect(() => {
        setSuitability(baseSuitabilityScore);
        let updatedScore = 0;

        for (let countryLookup of props.vendorCoverage) {
            if (
                countryLookup.coverageCountryAlias ==
                    props.specs.origin.country &&
                countryLookup.coverageContent.length != 0
            ) {
                if (
                    countryLookup.coverageContent.includes(
                        props.specs.origin.state
                    )
                ) {
                    updatedScore += oStateW;
                }
            }

            if (
                countryLookup.coverageCountryAlias ==
                    props.specs.destination.country &&
                countryLookup.coverageContent.length != 0
            ) {
                if (
                    countryLookup.coverageContent.includes(
                        props.specs.destination.state
                    )
                ) {
                    updatedScore += dStateW;
                }
            }
        }

        setSuitability(baseSuitabilityScore + Math.round(updatedScore));
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
                        {props.vendorName}
                        <span className="text-success">
                            {props.vendorType.asset_based && (
                                <i className="bi bi-truck ms-2"></i>
                            )}
                            {props.vendorType.freight_broker && (
                                <i className="bi bi-share ms-2"></i>
                            )}
                        </span>
                        <span
                            className="fw-light text-secondary ms-2"
                            style={{ fontSize: "0.75rem" }}
                        >
                            (
                            {props.vendorDomicile.state.concat(
                                ", ",
                                props.vendorDomicile.country
                            )}
                            )
                        </span>
                    </h4>
                    <p className="card-text m-0 text-secondary">
                        <i className="bi bi-people-fill"></i>{" "}
                        {props.vendorContact}:{" "}
                        <em>
                            <a href={`tel:${props.vendorPhone}`}>
                                {props.vendorPhone}
                            </a>
                        </em>
                    </p>
                    <p className="card-text mb-2 text-secondary">
                        <i className="bi bi-envelope-fill"></i>{" "}
                        <a href={`mailto:${props.vendorEmail}`}>
                            {props.vendorEmail}
                        </a>
                    </p>
                    {props.vendorModes.includes(props.specs.mode) && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            {props.specs.mode}
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                    {props.vendorCoverage
                        .map(
                            (country) =>
                                country.coverageContent[0] &&
                                country.coverageCountryAlias
                        )
                        .includes(props.specs.origin.country) && (
                        <span
                            className="badge rounded-pill text-bg-success me-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            Origin: {props.specs.origin.country}
                            <i className="bi bi-check-circle-fill ms-2"></i>
                        </span>
                    )}
                    <span
                        className={`badge rounded-pill ${
                            props.vendorCoverage
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
                                props.vendorCoverage
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
                    {props.vendorCoverage
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
                            props.vendorCoverage
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
                                props.vendorCoverage
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
