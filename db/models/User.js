// imports
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// sub-schemas
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
    },
    { _id: false }
);

// main schema
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

UserSchema.path("auth").validate({
    validator: function (value) {
        return value.terms.accepted;
    },
    message: "Terms and conditions must be accepted.",
});

UserSchema.pre("save", async function (next) {
    // enforce auth variables
    this.auth.role = "user";
    this.auth.password = await bcrypt.hash(this.auth.password, 6);

    next();
});

export default mongoose.model("User", UserSchema);
