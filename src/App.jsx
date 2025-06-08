// imports

import React, { useEffect, useState } from "react";
import Navbar from "./app/components/Navbar";
import Search from "./app/components/Search";
import Directory from "./app/components/Directory";
import Banner from "./app/components/Banner";

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
};

// component

function App() {
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
    }, [specs]);

    // render

    return (
        <React.Fragment>
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
            <div className="row justify-content-md-center">
                <div
                    id="searchForm"
                    className="col-12 col-md-3 mb-3"
                >
                    <Search
                        setSpecs={setSpecs}
                        template={template}
                        setTemplate={setTemplate}
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <div className="row justify-content-center g-3 mb-3">
                        <Directory
                            specs={specs}
                            routes={routes}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="row sticky-top under-navbar">
                        <div
                            id="informativeBanner"
                            className="col-12"
                        >
                            <Banner
                                specs={specs}
                                default_specs={default_specs}
                                resetSpecs={resetSpecs}
                                setSpecs={setSpecs}
                                templateSpecs={templateSpecs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
