import VendorCoverage from "./VendorCoverage";
import specsWeight from "../handlers/suitabilityMeta";
import { useState, useEffect } from "react";

const VendorCard = (props) => {
    const [suitability, setSuitability] = useState(0);
    const modeW = specsWeight.mandatory.modeW;
    const oCountryW = specsWeight.mandatory.oCountryW;
    const dCountryW = specsWeight.mandatory.dCountryW;
    const oStateW = specsWeight.desirable.oStateW;
    const dStateW = specsWeight.desirable.dStateW;
    const borderW = specsWeight.mandatory.borderW;
    const hazmatW = specsWeight.mandatory.hazmatW;
    const teamW = specsWeight.mandatory.teamW;
    const usbondW = specsWeight.mandatory.usbondW;
    const canadabondW = specsWeight.mandatory.canadabondW;

    const placeholder = "AB:Anywhere";
    const placeholder2 = "BC:TX";
 
    useEffect(() => {       
        setSuitability(0);
        let updatedScore = 0;

        if (props.vendorModes.includes(props.specs.mode)) {
            updatedScore += modeW;
        };

        for (let countryLookup of props.vendorCoverage) {                       
            if (countryLookup.coverageCountryAlias == props.specs.origin.country && countryLookup.coverageContent.length != 0) {
                updatedScore += oCountryW;
                if (countryLookup.coverageContent.includes(props.specs.origin.state)) {
                    updatedScore += oStateW;
                };
            };

            if (countryLookup.coverageCountryAlias == props.specs.destination.country && countryLookup.coverageContent.length != 0) {
                updatedScore += dCountryW;
                if (countryLookup.coverageContent.includes(props.specs.destination.state)) {
                    updatedScore += dStateW;
                };
            };
        };

        if (props.vendorBorder.includes(props.specs.border)) {
            updatedScore += borderW;
        };

        if (!props.specs.hazmat) {
            updatedScore += hazmatW;
        } else if (props.specs.hazmat == props.vendorHazmat) {
            updatedScore += hazmatW;
        };

        if (!props.specs.team) {
            updatedScore += teamW;
        } else if (props.specs.team == props.vendorTeamDrivers) {
            updatedScore += teamW;
        };

        if (!props.specs.usbond) {
            updatedScore += usbondW;
        } else if (props.specs.usbond == props.vendorUSBonded) {
            updatedScore += usbondW;
        };

        if (!props.specs.canadabond) {
            updatedScore += canadabondW;
        } else if (props.specs.canadabond == props.vendorCanadaBonded) {
            updatedScore += canadabondW;
        };

        setSuitability(Math.round(updatedScore));

    }, [props.specs.mode, props.specs.origin, props.specs.destination, props.specs.border, props.specs.hazmat, props.specs.team, props.specs.usbond, props.specs.canadabond]);

    if (suitability < Math.round(Object.values(specsWeight.mandatory).reduce((sum, value) => sum + value, 0))) {
        return false
    };

    // if (suitability < 0) {
    //     return false
    // };

    return (
        <div className="col-md-5 p-1 m-1 card">
            <div className="position-absolute" style={{ top: "-0.5em", right: "-0.25em"}}>
                <span className="badge border border-primary text-bg-info"><i className="bi bi-crosshair"></i> {suitability}%</span>
            </div>
            <div className="card-body">
                <h4 className="card-title text-dark">
                    {props.vendorName}
                    <span className="text-success">{props.vendorType.asset_based && <i className="bi bi-truck ms-2"></i>}{props.vendorType.freight_broker && <i className="bi bi-share ms-2"></i>}</span>
                    <span className="fw-light text-secondary ms-2" style={{fontSize: "0.75rem"}}>({props.vendorDomicile.state.concat(", ", props.vendorDomicile.country)})</span>
                </h4>
                <p className="card-text m-0 text-secondary"><i className="bi bi-people-fill"></i> {props.vendorContact}: <em><a href={`tel:${props.vendorPhone}`}>{props.vendorPhone}</a></em></p>
                <p className="card-text m-0 text-secondary"><i className="bi bi-envelope-fill"></i> <a href={`mailto:${props.vendorEmail}`}>{props.vendorEmail}</a></p>
                {props.vendorHazmat && <p className={`card-text m-0 text-${props.specs.hazmat ? "success fw-bold" : "secondary" }`} style={{fontSize: "0.75rem"}}><i className={`bi bi-${props.specs.hazmat ? "check-square-fill" : "check-lg"}`}></i> Hazmat handling</p>}
                {props.vendorTeamDrivers && <p className={`card-text m-0 text-${props.specs.team ? "success fw-bold" : "secondary"}`} style={{fontSize: "0.75rem"}}><i className={`bi bi-${props.specs.team ? "check-square-fill" : "check-lg"}`}></i> Team drivers</p>}
                {props.vendorUSBonded && <p className={`card-text m-0 text-${props.specs.usbond ? "success fw-bold" : "secondary"}`} style={{fontSize: "0.75rem"}}><i className={`bi bi-${props.specs.usbond ? "check-square-fill" : "check-lg"}`}></i> U.S. bonded</p>}
                {props.vendorCanadaBonded && <p className={`card-text m-0 text-${props.specs.canadabond ? "success fw-bold" : "secondary"}`} style={{fontSize: "0.75rem"}}><i className={`bi bi-${props.specs.canadabond ? "check-square-fill" : "check-lg"}`}></i> Canada bonded</p>}
            </div>
            <button className="btn btn-primary m-2" type="button" data-bs-toggle="collapse" data-bs-target={`#suitability-${props.vendorKey}`} aria-expanded="false" aria-controls={`suitability-${props.vendorKey}`}>
                Suitability info <i className="bi bi-crosshair"></i>
            </button>
            <div className="collapse" id={`suitability-${props.vendorKey}`}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">
                        {props.vendorModes.map((modality, index) => {
                            return (
                                <span key={props.vendorKey.concat("-mode-", index)} className={`badge rounded-pill bg-${modality == props.specs.mode ? "success border-success text-light" : "secondary border-secondary text-secondary bg-opacity-10"} border m-1`}>
                                    {modality}
                                </span>);
                        })}
                    </li>
                    {props.vendorCoverage.map((country, index) => {
                        const { coverageCountry, coverageCountryAlias, coverageContent } = country;
                        return (
                            coverageContent[0] &&
                            <VendorCoverage
                                key={props.vendorKey.concat("-coverage-", index)}
                                vendorCoverageKey={props.vendorKey.concat("-coverage-", index)}
                                origin={props.specs.origin}
                                destination={props.specs.destination}
                                coverageCountry={coverageCountry}
                                coverageCountryAlias={coverageCountryAlias}
                                coverageContent={coverageContent}
                            />
                        );
                    })}
                    <li className="list-group-item bg-light">
                        <h6 className="text-secondary fw-normal">Favorite lanes</h6>
                        {props.vendorFavLanes.map((lane, index) => {
                            return (
                                <span key={props.vendorKey.concat("-favlane-", index)} className={`badge rounded-pill bg-${lane == placeholder ? "success border-success text-light" : "secondary border-secondary text-secondary bg-opacity-10"} border m-1`}>{lane}</span>
                            );
                        })}
                    </li>
                    <li className="list-group-item bg-light">
                        <h6 className="text-secondary fw-normal">Blocked lanes</h6>
                        {props.vendorBlockedLanes.map((lane, index) => {
                            return (
                                <span key={props.vendorKey.concat("-blockedlane-", index)} className={`badge rounded-pill bg-${lane == placeholder2 ? "danger border-danger text-light" : "secondary border-secondary text-secondary bg-opacity-10"} border m-1`}>{lane}</span>
                            );
                        })}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VendorCard;