// imports
import { useState, useEffect, Fragment } from "react";
import { Search, Directory, Banner, Console } from "./";

// module
const default_specs = {
    mode: "",
    origin: {
        city: "",
        territory: "",
        region: "",
        country: "",
    },
    destination: {
        city: "",
        territory: "",
        region: "",
        country: "",
    },
    border: "none",
    hazmat: false,
    team_drivers: false,
    usa_bonded: false,
    can_bonded: false,
    ctpat: false,
    twic: false,
    tsa: false,
    fast: false,
    tanker_endorsement: false,
    origin_date: "",
    destination_date: "",
    unit_type: "",
    cargo_details: "",
    instructions: "",
};

const DashboardMain = () => {
    // states
    const [specs, setSpecs] = useState(default_specs);
    const [template, setTemplate] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hits, setHits] = useState(0);

    // handlers
    const resetSpecs = () => {
        setSpecs(default_specs);
    };

    const templateSpecs = (retrievedTemplate) => {
        setTemplate(retrievedTemplate);
    };

    // effects
    useEffect(() => {
        const origin_scopes = [
            `${specs.origin.city}, ${specs.origin.territory}`,
            specs.origin.territory,
            specs.origin.region,
            specs.origin.country,
            "Anywhere",
        ];
        const destination_scopes = [
            `${specs.destination.city}, ${specs.destination.territory}`,
            specs.destination.territory,
            specs.destination.region,
            specs.destination.country,
            "Anywhere",
        ];

        let route_aliases = [];

        for (let scope_o of origin_scopes) {
            for (let scope_d of destination_scopes) {
                route_aliases.push(scope_o.concat(":", scope_d));
            }
        }

        setRoutes(route_aliases);
    }, [
        specs.mode,
        specs.origin.territory,
        specs.origin.city,
        specs.destination.territory,
        specs.destination.city,
    ]);

    // render
    return (
        <Fragment>
            <div className="row">
                <div
                    id="searchForm"
                    className="col-12 col-md-3 mb-3"
                >
                    <Search
                        default_specs={default_specs}
                        setSpecs={setSpecs}
                        template={template}
                        setTemplate={setTemplate}
                    />
                </div>
                <div
                    className={`col-12 col-md-3 mb-3${
                        !(
                            specs.mode &&
                            specs.origin.country &&
                            specs.destination.country
                        )
                            ? " d-none"
                            : ""
                    }`}
                >
                    <div className="row sticky-md-top under-navbar">
                        <div
                            id="informativeBanner"
                            className="col-12"
                        >
                            <Banner
                                specs={specs}
                                setSpecs={setSpecs}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md mb-3">
                    <Console
                        specs={specs}
                        default_specs={default_specs}
                        resetSpecs={resetSpecs}
                        setSpecs={setSpecs}
                        templateSpecs={templateSpecs}
                    />
                    <Directory
                        specs={specs}
                        routes={routes}
                        setHits={setHits}
                        setIsSearching={setIsSearching}
                    />
                </div>
            </div>
            <div
                className={`row justify-content-between fixed-bottom font-monospace text-bg-${
                    specs === default_specs
                        ? "secondary"
                        : isSearching
                        ? "warning"
                        : hits > 0
                        ? "primary bg-gradient"
                        : "danger"
                } px-4 py-0`}
            >
                <div className="col-4">
                    <small>App status: </small>
                    {specs === default_specs ? (
                        <Fragment>
                            <small>system ready</small>
                            <div
                                className={`spinner-grow spinner-grow-sm ms-2`}
                                aria-hidden="true"
                            ></div>
                        </Fragment>
                    ) : isSearching ? (
                        <Fragment>
                            <small>searching vendors</small>
                            <div
                                className={`spinner-border spinner-grow-sm ms-2`}
                                aria-hidden="true"
                            ></div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <small>
                                displaying <b>{hits}</b> search result
                                {hits !== 1 ? "s" : ""}
                            </small>
                            <i
                                className={`bi bi-${
                                    hits > 0 ? "check" : "exclamation-triangle"
                                } ms-1`}
                            ></i>
                        </Fragment>
                    )}
                </div>
                <div className="col-4 text-end">
                    <small>
                        Last app status update: {new Date().toLocaleString()}
                    </small>
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardMain;
