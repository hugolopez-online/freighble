// imports
import VendorDisplay from "../VendorDisplay";
import GeoCoverage from "./layout/components/GeoCoverage";
import LaneBuilder from "./layout/components/LaneBuilder";
import LaneList from "./layout/components/LaneList";
import AddLane from "./layout/components/AddLane";

// module
const data = {
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

const VendorRegister = () => {
    return (
        <VendorDisplay
            visibility={"create"}
            data={data}
            GeoCoverage={GeoCoverage}
            LaneList={LaneList}
            LaneBuilder={LaneBuilder}
            AddLane={AddLane}
        />
    );
};

export default VendorRegister;
