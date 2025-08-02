// imports
import { useState, useEffect, Fragment } from "react";
import { Search, Directory, Banner, Console } from "./";

// module
const default_specs = {
    mandatory: {
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
    },
    optional: {
        origin_date: "",
        destination_date: "",
        unit_type: "",
        cargo_details: "",
        instructions: "",
    },
};

const DashboardMain = ({ theme }) => {
    // states
    const [specs, setSpecs] = useState(default_specs);
    const [vendorList, setVendorList] = useState([]);

    // module
    const MIN_DATA =
        specs.mandatory.mode &&
        specs.mandatory.origin.country &&
        specs.mandatory.destination.country;

    const origin_scopes = [
        `${specs.mandatory.origin.city}, ${specs.mandatory.origin.territory}`,
        specs.mandatory.origin.territory,
        specs.mandatory.origin.region,
        specs.mandatory.origin.country,
        "Anywhere",
    ];
    const destination_scopes = [
        `${specs.mandatory.destination.city}, ${specs.mandatory.destination.territory}`,
        specs.mandatory.destination.territory,
        specs.mandatory.destination.region,
        specs.mandatory.destination.country,
        "Anywhere",
    ];

    let route_aliases = [];

    for (let scope_o of origin_scopes) {
        for (let scope_d of destination_scopes) {
            route_aliases.push(scope_o.concat(":", scope_d));
        }
    }

    const routes = route_aliases;

    // render
    return (
        <Fragment>
            <div className="row">
                <div
                    id="searchForm"
                    className="col-12 col-md-3 mb-3"
                >
                    <Search
                        specs={specs}
                        default_specs={default_specs}
                        setSpecs={setSpecs}
                        theme={theme}
                    />
                </div>
                <div
                    className={`col-12 col-md-3 mb-3${
                        !MIN_DATA ? " d-none" : ""
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
                                theme={theme}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md mb-3">
                    <Console
                        specs={specs}
                        default_specs={default_specs}
                        setSpecs={setSpecs}
                        setVendorList={setVendorList}
                        theme={theme}
                    />
                    <Directory
                        specs={specs}
                        default_specs={default_specs}
                        routes={routes}
                        vendorList={vendorList}
                        setVendorList={setVendorList}
                        theme={theme}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardMain;
