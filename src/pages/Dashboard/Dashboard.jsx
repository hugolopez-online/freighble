// imports

import { useEffect, useState, Fragment } from "react";
import {
    Navbar,
    Search,
    Directory,
    Banner,
    Console,
} from "./layout/components";

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
    border: "None",
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

// component

const Dashboard = () => {
    // states

    const [specs, setSpecs] = useState(default_specs);
    const [template, setTemplate] = useState(null);
    const [routes, setRoutes] = useState([]);

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
    }, [specs.mode, specs.origin.territory, specs.destination.territory]);

    // render

    return (
        <Fragment>
            <div
                id="navbar"
                className="row justify-content-center sticky-top mb-3"
            >
                <Navbar
                    specs={specs}
                    default_specs={default_specs}
                    resetSpecs={resetSpecs}
                    setSpecs={setSpecs}
                    templateSpecs={templateSpecs}
                />
            </div>
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
                <div className="col-12 d-block d-md-none mb-3 sticky-top under-navbar-sm">
                    <Console
                        specs={specs}
                        default_specs={default_specs}
                        resetSpecs={resetSpecs}
                        setSpecs={setSpecs}
                        templateSpecs={templateSpecs}
                    />
                </div>
                <div className="col-12 col-md mb-3">
                    <Directory
                        specs={specs}
                        routes={routes}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
