/* IMPORTS START */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import {
    modes_values,
    borders_values,
    can_territories,
    usa_territories,
    mex_territories,
} from "../../data/variables.js";
/* IMPORTS END */

/* MODULE STARS */
const valid_territories = [
    ...can_territories,
    ...usa_territories,
    ...mex_territories,
];
/* MODULE END */

/* SUB-SUB-SCHEMAS START */
const CoverageContent = (country_code, divisions) =>
    new mongoose.Schema(
        {
            country_code: {
                type: String,
                enum: [country_code],
                default: country_code,
                required: [true, "Coverage: country code must be provided."],
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
/* SUB-SUB-SCHEMAS END */

/* SUB-SCHEMAS START */
const VendorType = new mongoose.Schema(
    {
        asset_based: {
            type: Boolean,
            required: [
                true,
                "Company type `asset-based`: must confirm field either way (yes or no).",
            ],
        },
        freight_broker: {
            type: Boolean,
            required: [
                true,
                "Company type `freight broker`: must confirm field either way (yes or no).",
            ],
        },
    },
    { _id: false }
);

const VendorDomicile = new mongoose.Schema(
    {
        city: {
            type: String,
            required: [true, "Domicile city: required field."],
        },
        territory: {
            type: String,
            enum: valid_territories,
            required: [
                true,
                "Domicile territory (province or state): required field.",
            ],
        },
        country: {
            type: String,
            enum: ["Canada", "United States", "Mexico"],
            required: [true, "Domicile country: required field."],
        },
        country_code: {
            type: String,
            enum: ["CAN", "USA", "MEX"],
            required: [true, "Domicile country code: required field."],
        },
    },
    { _id: false }
);

const VendorCoverage = new mongoose.Schema(
    {
        Canada: {
            type: CoverageContent("CAN", can_territories),
            required: [true, "Canada coverage must be provided."],
        },
        "United States": {
            type: CoverageContent("USA", usa_territories),
            required: [true, "United States coverage must be provided."],
        },
        Mexico: {
            type: CoverageContent("MEX", mex_territories),
            required: [true, "Mexico coverage must be provided."],
        },
    },
    { _id: false }
);

const VendorTerms = new mongoose.Schema(
    {
        version: {
            type: String,
            required: [true, "Terms version must be provided."],
        },
        accepted: {
            type: Boolean,
            default: false,
            required: [true, "Acceptance of terms must be provided."],
        },
        date_accepted: {
            type: Date,
            default: Date.now(),
            required: [true, "Date of acceptance of terms must be provided."],
        },
    },
    { _id: false }
);

const VendorAuth = new mongoose.Schema(
    {
        password: {
            type: String,
            validate: {
                validator: function (value) {
                    return !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(
                        value
                    );
                },
                message:
                    "Password must be at least 8 characters long and include lowercase, uppercase, number, and special characters.",
            },
            required: [true, "Password: required field."],
        },
        role: {
            type: String,
            default: "vendor",
            enum: ["admin", "user", "vendor"],
            required: [true, "Registrant role must be provided."],
        },
        terms: {
            type: VendorTerms,
            required: [true, "Terms information must be provided."],
        },
    },
    { _id: false }
);
/* SUB-SCHEMAS END */

/* SCHEMA START */
const VendorSchema = new mongoose.Schema(
    {
        main_email: {
            type: String,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                "Main email: invalid email format.",
            ],
            unique: true,
            validate: {
                validator: async function (value) {
                    if (
                        typeof this.getOptions === "function" &&
                        this.getOptions().emailWillChange
                    ) {
                        const CREDENTIALS_TAKEN =
                            await mongoose.models.User.findOne({
                                email: value,
                            });
                        return !CREDENTIALS_TAKEN;
                    }

                    if (
                        typeof this.isModified === "function" &&
                        this.isModified("email")
                    ) {
                        const CREDENTIALS_TAKEN =
                            await mongoose.models.User.findOne({
                                email: value,
                            });
                        return !CREDENTIALS_TAKEN;
                    }

                    return true;
                },
                message: "Email already taken.",
            },
            required: [true, "Main email: required field."],
        },
        company: {
            type: String,
            required: [true, "Company name: required field."],
        },
        type: {
            type: VendorType,
            required: [true, "Company type: at least one must be selected."],
        },
        contact: {
            type: String,
            required: [true, "Contact name: required field."],
        },
        email: {
            type: String,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                "Pricing email: invalid email format.",
            ],
            required: [true, "Pricing email: required field."],
        },
        phone: {
            type: String,
            match: [
                /^\d\d\d-\d\d\d-\d\d\d\d$/i,
                "Pricing phone: invalid phone format.",
            ],
            required: [true, "Pricing phone: required field."],
        },
        ph_country_code: {
            type: String,
            enum: {
                values: ["+1", "+52"],
                message: "{VALUE} is not a valid country telephone code.",
            },
            required: [true, "Pricing phone country code: required field."],
        },
        domicile: {
            type: VendorDomicile,
            required: [true, "Company domicile: required field."],
        },
        modes: [
            {
                type: String,
                enum: {
                    values: modes_values,
                    message: "{VALUE} is not a valid transportation mode.",
                },
                required: [
                    true,
                    "Transportation modes list must be provided, even if empty.",
                ],
            },
        ],
        hazmat: {
            type: Boolean,
            default: false,
            required: [true, "Hazmat: coverage capacity must be provided."],
        },
        team_drivers: {
            type: Boolean,
            default: false,
            required: [
                true,
                "Team Drivers: coverage capacity must be provided.",
            ],
        },
        usa_bonded: {
            type: Boolean,
            default: false,
            required: [true, "U.S bonded: coverage capacity must be provided."],
        },
        can_bonded: {
            type: Boolean,
            default: false,
            required: [
                true,
                "Canada bonded: coverage capacity must be provided.",
            ],
        },
        ctpat: {
            type: Boolean,
            default: false,
            required: [true, "C-TPAT: coverage capacity must be provided."],
        },
        twic: {
            type: Boolean,
            default: false,
            required: [true, "TWIC: coverage capacity must be provided."],
        },
        tsa: {
            type: Boolean,
            default: false,
            required: [true, "TSA: coverage capacity must be provided."],
        },
        fast: {
            type: Boolean,
            default: false,
            required: [true, "FAST: coverage capacity must be provided."],
        },
        tanker_endorsement: {
            type: Boolean,
            default: false,
            required: [
                true,
                "Tanker Endorsement: coverage capacity must be provided.",
            ],
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
            required: [
                true,
                "Geographical coverage capacity must be provided.",
            ],
        },
        borders: {
            type: [
                {
                    type: String,
                    enum: borders_values,
                },
            ],
            default: ["none"],
            required: [true, "Border crossing capacity must be provided."],
        },
        core_lanes: {
            type: Array,
            default: [],
            required: [
                true,
                "Core lanes list must be provided, even if empty.",
            ],
        },
        exclusive_lanes: {
            type: Array,
            default: [],
            required: [
                true,
                "Exclusive lanes list must be provided, even if empty.",
            ],
        },
        banned_lanes: {
            type: Array,
            default: [],
            required: [
                true,
                "Banned lanes list must be provided, even if empty.",
            ],
        },
        verified: {
            type: Boolean,
            default: false,
            required: [
                true,
                "admin // INTERNAL ERROR: `VERIFIED` FLAG MISSING.",
            ],
        },
        auth: {
            type: VendorAuth,
            required: [true, "Sign-up details must be provided."],
        },
    },
    {
        collection: "vendors",
    }
);
/* SCHEMA END */

/* SCHEMA UTILS START */
VendorSchema.path("type").validate({
    validator: function (value) {
        return value.asset_based || value.freight_broker;
    },
    message: "Company type: at least one must be selected.",
});

VendorSchema.path("auth").validate({
    validator: function (value) {
        return value.terms.accepted;
    },
    message: "Terms and conditions must be accepted.",
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

VendorSchema.pre("findOneAndUpdate", async function (next) {
    const UPDATE = this.getUpdate();
    const NEW_EMAIL = UPDATE?.main_email || UPDATE?.$set?.main_email;
    const DOCUMENT = await this.model.findOne(this.getQuery());

    this.setOptions({
        emailModified: Boolean(
            NEW_EMAIL && DOCUMENT && DOCUMENT.main_email !== NEW_EMAIL
        ),
    });

    next();
});

VendorSchema.post(["save", "findOneAndUpdate"], function (err, doc, next) {
    if (err && err.code === 11000) {
        const ERROR = new mongoose.Error.ValidationError();

        ERROR.addError(
            "main_email",
            new mongoose.Error.ValidatorError({
                message: "Email already taken.",
                path: "email",
                kind: "unique",
                value: err.keyValue?.main_email, // actual duplicate value
                properties: {
                    message: "Email already taken.",
                    type: "unique",
                    path: "main_email",
                    value: err.keyValue?.main_email,
                },
            })
        );

        return next(ERROR);
    }

    return next(err);
});

VendorSchema.methods.createToken = function () {
    const token = jwt.sign(
        {
            id: this._id,
            role: this.auth.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_VALIDITY }
    );

    return token;
};

VendorSchema.methods.comparePassword = async function (prospectPassword) {
    const match = await bcrypt.compare(prospectPassword, this.auth.password);

    return match;
};
/* SCHEMA UTILS END */

export default mongoose.model("Vendor", VendorSchema);
