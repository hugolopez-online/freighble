// imports
import mongoose from "mongoose";
import {
    canDivisions,
    usaDivisions,
    mexDivisions,
    transportationModes,
    borderCrossingPorts,
} from "../../data/variables.js";

// module
const valid_territories = [...canDivisions, ...usaDivisions, ...mexDivisions];

// sub-sub-schemas
const CoverageContent = (country_code, divisions) =>
    new mongoose.Schema(
        {
            country_code: {
                type: String,
                enum: [country_code],
                default: country_code,
                required: true,
            },
            territory: [
                {
                    type: String,
                    enum: divisions,
                },
            ],
        },
        { _id: false }
    );

// sub-schemas
const VendorType = new mongoose.Schema(
    {
        asset_based: {
            type: Boolean,
            required: true,
        },
        freight_broker: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
);

const VendorDomicile = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
        },
        territory: {
            type: String,
            enum: valid_territories,
            required: true,
        },
        country: {
            type: String,
            enum: ["Canada", "United States", "Mexico"],
            required: true,
        },
        country_code: {
            type: String,
            enum: ["CAN", "USA", "MEX"],
            required: true,
        },
    },
    { _id: false }
);

const VendorCoverage = new mongoose.Schema(
    {
        Canada: {
            type: CoverageContent("CAN", canDivisions),
            required: true,
        },
        "United States": {
            type: CoverageContent("USA", usaDivisions),
            required: true,
        },
        Mexico: {
            type: CoverageContent("MEX", mexDivisions),
            required: true,
        },
    },
    { _id: false }
);

// main schema
const VendorSchema = new mongoose.Schema(
    {
        // TODO include regex
        company: {
            type: String,
            required: true,
        },
        type: {
            type: VendorType,
            required: true,
        },
        // TODO include regex
        contact: {
            type: String,
            required: true,
        },
        // TODO include regex
        email: {
            type: String,
            required: true,
        },
        // TODO format for phone
        phone: {
            type: Number,
            required: true,
        },
        domicile: {
            type: VendorDomicile,
            required: true,
        },
        modes: [
            {
                type: String,
                enum: transportationModes,
                required: true,
            },
        ],
        hazmat: {
            type: Boolean,
            default: false,
            required: true,
        },
        team_drivers: {
            type: Boolean,
            default: false,
            required: true,
        },
        usa_bonded: {
            type: Boolean,
            default: false,
            required: true,
        },
        can_bonded: {
            type: Boolean,
            default: false,
            required: true,
        },
        ctpat: {
            type: Boolean,
            default: false,
            required: true,
        },
        twic: {
            type: Boolean,
            default: false,
            required: true,
        },
        tsa: {
            type: Boolean,
            default: false,
            required: true,
        },
        fast: {
            type: Boolean,
            default: false,
            required: true,
        },
        tanker_endorsement: {
            type: Boolean,
            default: false,
            required: true,
        },
        coverage: {
            type: VendorCoverage,
            default: {
                Canada: {
                    country_code: "CAN",
                    territory: [],
                },
                "United States": {
                    country_code: "USA",
                    territory: [],
                },
                Mexico: {
                    country_code: "MEX",
                    territory: [],
                },
            },
            required: true,
        },
        borders: {
            type: [
                {
                    type: String,
                    enum: borderCrossingPorts,
                },
            ],
            default: ["None"],
            required: true,
        },
        // TODO include regex
        core_lanes: {
            type: Array,
            default: [],
            required: true,
        },
        // TODO include regex
        exclusive_lanes: {
            type: Array,
            default: [],
            required: true,
        },
        // TODO include regex
        banned_lanes: {
            type: Array,
            default: [],
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        collection: "vendors",
    }
);

VendorSchema.pre("save", function (next) {
    if (!this.borders.includes("None")) {
        this.borders.push("None");
    }

    this.borders = [...new Set(this.borders)];
    next();
});

export default mongoose.model("Vendor", VendorSchema);
