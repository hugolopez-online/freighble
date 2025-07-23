// imports
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import VendorDisplay from "./VendorDisplay";
import GeoCoverage from "./VendorRegister/layout/components/GeoCoverage";
import LaneList from "./VendorRegister/layout/components/LaneList";
import LaneBuilder from "./VendorRegister/layout/components/LaneBuilder";
import AddLane from "./VendorRegister/layout/components/AddLane";

// module
const skeleton = {
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

// render
const VendorProfile = ({ CONDITIONAL_RENDERING }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [vendor, setVendor] = useState(skeleton);
    const { id } = useParams();

    useEffect(() => {
        const findVendor = async () => {
            if (isFetching || vendor.company) {
                return;
            }
            // async func to search vendors through API
            const query_string = `/api/vendors/public/profile/${id}`;

            setIsFetching(true);

            const found_vendor_promise = await fetch(query_string);

            const found_vendor_doc = await found_vendor_promise.json();
            const found_vendor = found_vendor_doc.vendor;
            setVendor(found_vendor);
            setIsFetching(false);
        };

        findVendor();
    }, []);

    return (
        <Fragment>
            {isFetching ? (
                <div className="row justify-content-center pt-5">
                    <div
                        className="col-10 py-4"
                        style={{ minHeight: "100vh" }}
                    >
                        <h5
                            className="display-5 py4"
                            role="status"
                        >
                            Loading vendor information...
                        </h5>
                        <div
                            className="spinner-border ms-auto"
                            aria-hidden="true"
                        ></div>
                    </div>
                </div>
            ) : vendor.company ? (
                <VendorDisplay
                    visibility="view"
                    data={vendor}
                    GeoCoverage={GeoCoverage}
                    LaneList={LaneList}
                    LaneBuilder={LaneBuilder}
                    AddLane={AddLane}
                    CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                />
            ) : (
                <div className="row justify-content-center pt-5">
                    <div
                        className="col-10 py-4"
                        style={{ minHeight: "100vh" }}
                    >
                        <h5
                            className="display-5 py4"
                            role="status"
                        >
                            No vendor has been found...
                        </h5>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default VendorProfile;
