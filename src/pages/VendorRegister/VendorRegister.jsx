// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeoCoverage from "./layout/components/GeoCoverage";
import LaneBuilder from "./layout/components/LaneBuilder";
import LaneList from "./layout/components/LaneList";
import AddLane from "./layout/components/AddLane";
import { Transition, VendorDisplay } from "../_templates";

// module
const data = {
    main_email: "",
    company: "",
    type: {
        asset_based: false,
        freight_broker: false,
    },
    contact: "",
    email: "",
    phone: "",
    ph_country_code: "",
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
    auth: {
        password: "",
        terms: {
            version: "v1.0.0",
            accepted: false,
            date_accepted: null,
        },
    },
};

// component
const VendorRegister = ({ CONDITIONAL_RENDERING }) => {
    // module
    const navigate = useNavigate();

    // effects
    useEffect(() => {
        if (CONDITIONAL_RENDERING.session) {
            navigate("/dashboard");
        }
    }, []);

    if (CONDITIONAL_RENDERING.session) {
        return (
            <Transition
                variables={{
                    type: ["Authenticating", "Redirecting", "Loading"][1],
                    loader: ["spinner-border", "spinner-grow"][0],
                    message: "",
                }}
            />
        );
    }

    return (
        <VendorDisplay
            visibility={"create"}
            data={data}
            GeoCoverage={GeoCoverage}
            LaneList={LaneList}
            LaneBuilder={LaneBuilder}
            AddLane={AddLane}
            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
        />
    );
};

export default VendorRegister;
