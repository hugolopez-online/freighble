// imports
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { SALT } from "../auth/encryption.js";
import {
    modes_values,
    borders_values,
    canDivisions,
    usaDivisions,
    mexDivisions,
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
        // TODO remove <placeholder> after tests
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

const VendorTerms = new mongoose.Schema(
    {
        version: {
            type: String,
            required: true,
        },
        accepted: {
            type: Boolean,
            default: false,
            required: true,
        },
        date_accepted: {
            type: Date,
            default: Date.now(),
            required: true,
        },
    },
    { _id: false }
);

const VendorAuth = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "vendor",
            required: true,
        },
        terms: {
            type: VendorTerms,
            required: true,
        },
    },
    { _id: false }
);

// main schema
const VendorSchema = new mongoose.Schema(
    {
        main_email: {
            type: String,
            unique: true,
            required: true,
        },
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
            type: String,
            required: true,
        },
        domicile: {
            type: VendorDomicile,
            required: true,
        },
        modes: [
            {
                type: String,
                enum: modes_values,
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
                    enum: borders_values,
                },
            ],
            default: ["none"],
            required: true,
        },
        core_lanes: {
            type: Array,
            default: [],
            required: true,
        },
        exclusive_lanes: {
            type: Array,
            default: [],
            required: true,
        },
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
        auth: {
            type: VendorAuth,
            required: true,
        },
    },
    {
        collection: "vendors",
    }
);

VendorSchema.path("type").validate((value) => {
    return value.asset_based || value.freight_broker;
});

VendorSchema.path("auth").validate((value) => {
    return value.terms.accepted;
});

VendorSchema.pre("save", async function (next) {
    // complete borders
    if (!this.borders.includes("none")) {
        this.borders.push("none");
    }
    this.borders = [...new Set(this.borders)];

    // enforce auth variables
    this.auth.role = "vendor";
    this.auth.password = await bcrypt.hash(this.auth.password, 6);

    next();
});

export default mongoose.model("Vendor", VendorSchema);
