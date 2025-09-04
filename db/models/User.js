/* IMPORTS START */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
/* IMPORTS END */

/* SUB-SCHEMAS START */
const UserTerms = new mongoose.Schema(
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

const UserAuth = new mongoose.Schema(
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
            default: "user",
            enum: ["admin", "user", "vendor"],
            required: [true, "Registrant role must be provided."],
        },
        subscribed: {
            type: Boolean,
            default: false,
            required: [true, "Subscription status must be provided"],
        },
        terms: {
            type: UserTerms,
            required: [true, "Terms information must be provided."],
        },
        active: {
            type: Boolean,
            default: true,
            required: [true, "Account status must be provided."],
        },
    },
    { _id: false }
);
/* SUB-SCHEMAS END */

/* SCHEMA START */
const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "First name: required field."],
        },
        last_name: {
            type: String,
            required: [true, "Last name: required field."],
        },
        company: {
            type: String,
        },
        email: {
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
            required: [true, "Email: required field."],
        },
        auth: {
            type: UserAuth,
            required: [true, "Sign-up details must be provided."],
        },
    },
    {
        collection: "users",
    }
);
/* SCHEMA END */

/* SCHEMA UTILS START */
UserSchema.path("auth").validate({
    validator: function (value) {
        return value.terms.accepted;
    },
    message: "Terms and conditions must be accepted.",
});

UserSchema.pre("save", async function (next) {
    this.auth.role = "user";
    this.auth.password = await bcrypt.hash(this.auth.password, 6);

    next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    const UPDATE = this.getUpdate();
    const NEW_EMAIL = UPDATE?.email || UPDATE?.$set?.email;
    const DOCUMENT = await this.model.findOne(this.getQuery());

    this.setOptions({
        emailModified: Boolean(
            NEW_EMAIL && DOCUMENT && DOCUMENT.email !== NEW_EMAIL
        ),
    });

    next();
});

UserSchema.post(["save", "findOneAndUpdate"], function (err, doc, next) {
    if (err && err.code === 11000) {
        const ERROR = new mongoose.Error.ValidationError();

        ERROR.addError(
            "email",
            new mongoose.Error.ValidatorError({
                message: "Email already taken.",
                path: "email",
                kind: "unique",
                value: err.keyValue?.email, // actual duplicate value
                properties: {
                    message: "Email already taken.",
                    type: "unique",
                    path: "email",
                    value: err.keyValue?.email,
                },
            })
        );

        return next(ERROR);
    }

    return next(err);
});

UserSchema.methods.createToken = function () {
    const token = jwt.sign(
        {
            id: this._id,
            role: this.auth.role,
            subscribed: this.auth.subscribed,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_VALIDITY }
    );

    return token;
};

UserSchema.methods.comparePassword = async function (prospectPassword) {
    const match = await bcrypt.compare(prospectPassword, this.auth.password);

    return match;
};
/* SCHEMA UTILS END */

export default mongoose.model("User", UserSchema);
