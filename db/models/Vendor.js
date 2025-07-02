import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    type: {
        type: Object,
        required: true,
    },
    contact: {},
    email: {},
    phone: {},
    domicile: {},
    modes: {},
    hazmat: {},
    team_drivers: {},
    usa_bonded: {},
    can_bonded: {},
    ctpat: {},
    twic: {},
    tsa: {},
    fast: {},
    tanker_endorsement: {},
    coverage: {},
    borders: {},
    core_lanes: {},
    exclusive_lanes: {},
    banned_lanes: {},
});

export default mongoose.model("Vendor", vendorSchema);
