/* IMPORTS START */
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import GeoCoverage from "./VendorRegister/layout/components/GeoCoverage";
import LaneList from "./VendorRegister/layout/components/LaneList";
import LaneBuilder from "./VendorRegister/layout/components/LaneBuilder";
import AddLane from "./VendorRegister/layout/components/AddLane";
import { Transition, VendorDisplay } from "./_templates";
/* IMPORTS END */

/* MODULE START */
const BLANK_USER = {
    company: "",
    type: {
        asset_based: false,
        freight_broker: false,
    },
    contact: "",
    email: "",
    phone: "",
    domicile: {
        city: "",
        territory: "",
        country: "",
        country_code: "",
    },
    modes: [],
    hazmat: false,
    team_drivers: false,
    usa_bonded: false,
    can_bonded: false,
    ctpat: false,
    twic: false,
    tsa: false,
    fast: false,
    tanker_endorsement: false,
    coverage: {
        Canada: {
            country_code: "CAN",
            territory: [],
        },
        "United States": {
            country_code: "USA",
            territory: [],
        },
        Mexico: { country_code: "MEX", territory: [] },
    },
    borders: [],
    core_lanes: [],
    exclusive_lanes: [],
    banned_lanes: [],
};
/* MODULE END */

/* COMPONENT START */
const VendorProfile = ({ CONDITIONAL_RENDERING, theme }) => {
    // status
    const [isFetching, setIsFetching] = useState(false);
    const [vendor, setVendor] = useState(BLANK_USER);
    const { id } = useParams();

    // effect
    useEffect(() => {
        const findVendor = async () => {
            const QUERY = `/api/vendors/public/profile/${id}`;

            setIsFetching(true);

            const found_vendor_promise = await fetch(QUERY);

            const found_vendor_doc = await found_vendor_promise.json();
            const found_vendor = found_vendor_doc.vendor;
            setVendor(found_vendor);
            setIsFetching(false);
        };

        findVendor();
    }, []);

    // render
    return (
        <Fragment>
            {isFetching ? (
                <Transition
                    variables={{
                        type: ["Authenticating", "Redirecting", "Loading"][2],
                        loader: ["spinner-border", "spinner-grow"][0],
                        message: "",
                    }}
                />
            ) : vendor.company ? (
                <VendorDisplay
                    visibility="view"
                    data={vendor}
                    GeoCoverage={GeoCoverage}
                    LaneList={LaneList}
                    LaneBuilder={LaneBuilder}
                    AddLane={AddLane}
                    CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                    theme={theme}
                />
            ) : (
                <div className="row justify-content-center pt-5">
                    <div
                        className="col-10 py-4"
                        style={{ minHeight: "100vh" }}
                    >
                        <h5 className="display-5 py4">
                            No vendor has been found...
                        </h5>
                    </div>
                </div>
            )}
        </Fragment>
    );
};
/* COMPONENT END */

export default VendorProfile;
