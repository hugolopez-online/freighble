/* IMPORTS START */
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import TEST_VENDORS from "../data/vendors.js"; // <- TODO: create some valid test vendors
import Vendor from "../db/models/Vendor.js";
import {
    BadRequest,
    NotAuthenticated,
    NotFound,
    NotSupported,
} from "../errors/appErrors.js";
/* IMPORTS END */

/* CONTROLLERS START */
const VENDORS_API_VIEW = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        const vendors = DB_AVAILABLE
            ? await Vendor.find(req.body)
            : TEST_VENDORS;

        if (!vendors) {
            throw new NotFound("No vendors found.");
        }

        return res.status(StatusCodes.OK).json({
            msg: `Retrieved ${vendors.length} vendors successfully.`,
            vendors,
        });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message, vendors: [] });
    }
};

const VENDORS_API_SEARCH = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        const {
            mode,
            o_country,
            d_country,
            border,
            hazmat,
            team_drivers,
            usa_bonded,
            can_bonded,
            ctpat,
            twic,
            tsa,
            fast,
            tanker_endorsement,
        } = req.query;

        if (
            mode &&
            o_country &&
            d_country &&
            border &&
            hazmat &&
            team_drivers &&
            usa_bonded &&
            can_bonded &&
            ctpat &&
            twic &&
            tsa &&
            fast &&
            tanker_endorsement
        ) {
            // TODO: switch to find verified `true` vendors
            const vendors = DB_AVAILABLE
                ? await Vendor.find({ verified: false })
                : TEST_VENDORS;

            if (!vendors) {
                throw new NotFound("No vendors found.");
            }

            const filtered_vendors = vendors.filter((vendor) => {
                const vendor_coverage = DB_AVAILABLE
                    ? vendor.coverage._doc
                    : vendor.coverage;

                let country_coverage = 0;

                for (let country in vendor_coverage) {
                    if (country_coverage === 2) {
                        break;
                    }

                    if (
                        vendor_coverage[country].territory.length !== 0 &&
                        vendor_coverage[country].country_code === o_country
                    ) {
                        country_coverage++;
                    }

                    if (
                        vendor_coverage[country].territory.length !== 0 &&
                        vendor_coverage[country].country_code === d_country
                    ) {
                        country_coverage++;
                    }
                }

                const is_qualified =
                    vendor.modes.includes(mode) &&
                    country_coverage === 2 &&
                    vendor.borders.includes(border) &&
                    (!Number(hazmat) || vendor.hazmat) &&
                    (!Number(team_drivers) || vendor.team_drivers) &&
                    (!Number(usa_bonded) || vendor.usa_bonded) &&
                    (!Number(can_bonded) || vendor.can_bonded) &&
                    (!Number(ctpat) || vendor.ctpat) &&
                    (!Number(twic) || vendor.twic) &&
                    (!Number(tsa) || vendor.tsa) &&
                    (!Number(fast) || vendor.fast) &&
                    (!Number(tanker_endorsement) || vendor.tanker_endorsement);

                return is_qualified;
            });

            return res.status(StatusCodes.OK).json({
                msg: `Filtered ${filtered_vendors.length} vendors successfully.`,
                filtered_vendors,
            });
        }

        throw new BadRequest("Incorrect search query format.");
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message, filtered_vendors: [] });
    }
};

const VENDORS_API_FIND = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        if (!DB_AVAILABLE) {
            throw new NotSupported(
                "No support for this feature with locally stored data."
            );
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest("Invalid vendor ID.");
        }

        const vendor = await Vendor.findById(id);

        if (!vendor) {
            throw new NotFound("No vendor has been found.");
        }

        return res
            .status(StatusCodes.OK)
            .json({ msg: `Found vendor ${vendor.company}.`, vendor });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message, vendor: {} });
    }
};

const VENDORS_API_CREATE = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        if (!DB_AVAILABLE) {
            throw new NotSupported(
                "No support for this feature with locally stored data."
            );
        }

        const vendor = await Vendor.create({ ...req.body });

        return res.status(StatusCodes.CREATED).json({
            msg: `Vendor ${vendor.company} created!`,
            id: vendor._id,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const VENDORS_API_EDIT = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        if (!DB_AVAILABLE) {
            throw new NotSupported(
                "No support for this feature with locally stored data."
            );
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest("Invalid vendor ID.");
        }

        const vendor = await Vendor.findOneAndUpdate(
            { _id: id },
            { ...req.body, verified: false },
            {
                runValidators: true,
            }
        );

        if (!vendor) {
            throw new NotFound("No vendor has been found.");
        }

        return res
            .status(StatusCodes.OK)
            .json({ msg: `${vendor.company} edited.` });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                msg: err.message || "Something went wrong.",
                error: err,
            });
    }
};

const VENDORS_API_DELETE = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        if (!DB_AVAILABLE) {
            throw new NotSupported(
                "No support for this feature with locally stored data."
            );
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest("Invalid vendor ID.");
        }

        const vendor = await Vendor.findOneAndDelete({ _id: id });

        if (!vendor) {
            throw new NotFound("No vendor has been found.");
        }

        return res
            .status(StatusCodes.OK)
            .json({ msg: `${vendor.company} deleted.` });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                msg: err.message || "Something went wrong.",
                error: err,
            });
    }
};

const VENDORS_API_LOGIN = async (req, res) => {
    try {
        const { email, password } = req.body;

        const vendor = await Vendor.findOne({
            main_email: email.toLowerCase(),
        });
        const match = await vendor?.comparePassword(password);

        if (vendor && match) {
            // TODO: store token in httOnly cookie - localStorage is for development only
            const token = vendor.createToken();
            return res.status(StatusCodes.OK).json({
                token,
                user: { id: vendor._id, role: vendor.auth.role },
                msg: "Login successful!",
            });
        } else {
            throw new NotAuthenticated("Invalid credentials.");
        }
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message || "Something went wrong.", error: err });
    }
};

const VENDORS_API_LOGOUT = async (req, res) => {};
/* CONTROLLERS END */

/* EXPORTS START */
export {
    VENDORS_API_VIEW,
    VENDORS_API_SEARCH,
    VENDORS_API_FIND,
    VENDORS_API_CREATE,
    VENDORS_API_EDIT,
    VENDORS_API_DELETE,
    VENDORS_API_LOGIN,
    VENDORS_API_LOGOUT,
};
/* EXPORTS END */
