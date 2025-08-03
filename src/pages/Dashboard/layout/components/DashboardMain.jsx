/* IMPORTS START */
import { useState, Fragment } from "react";

import { Search, Directory, AdditionalInfo, Console, UserProfile } from "./";
/* IMPORTS END */

/* MODULE START */
const BLANK_SPECS = {
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
/* MODULE END */

/* COMPONENT START */
const DashboardMain = ({ CONDITIONAL_RENDERING, theme }) => {
    // states
    const [specs, setSpecs] = useState(BLANK_SPECS);
    const [vendorList, setVendorList] = useState([]);

    // module
    const MIN_DATA =
        specs.mandatory.mode &&
        specs.mandatory.origin.country &&
        specs.mandatory.destination.country;

    const O_SCOPES = [
        `${specs.mandatory.origin.city}, ${specs.mandatory.origin.territory}`,
        specs.mandatory.origin.territory,
        specs.mandatory.origin.region,
        specs.mandatory.origin.country,
        "Anywhere",
    ];
    const D_SCOPES = [
        `${specs.mandatory.destination.city}, ${specs.mandatory.destination.territory}`,
        specs.mandatory.destination.territory,
        specs.mandatory.destination.region,
        specs.mandatory.destination.country,
        "Anywhere",
    ];

    let route_aliases = [];

    for (let o_scope of O_SCOPES) {
        for (let d_scope of D_SCOPES) {
            route_aliases.push(o_scope.concat(":", d_scope));
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
                        BLANK_SPECS={BLANK_SPECS}
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
                            id="additional_info"
                            className="col-12"
                        >
                            <AdditionalInfo
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
                        BLANK_SPECS={BLANK_SPECS}
                        setSpecs={setSpecs}
                        setVendorList={setVendorList}
                        theme={theme}
                    />
                    <Directory
                        specs={specs}
                        BLANK_SPECS={BLANK_SPECS}
                        routes={routes}
                        vendorList={vendorList}
                        setVendorList={setVendorList}
                        theme={theme}
                    />
                </div>
            </div>
            <div
                id="user_profile"
                className={`offcanvas offcanvas-end w-100 ${
                    theme === "light" ? "" : "bg-black bg-opacity-75"
                }`}
                tabIndex="-1"
            >
                <div className="offcanvas-body">
                    <UserProfile
                        CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                        theme={theme}
                    />
                </div>
            </div>
        </Fragment>
    );
};
/* COMPONENT END */

export default DashboardMain;
