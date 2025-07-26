/* IMPORTS START */
import TEST_VENDORS from "../data/vendors.js"; // <- TODOTASK: create some valid test vendors
import Vendor from "../db/models/Vendor.js";
/* IMPORTS END */

/* CONTROLLERS START */
const viewVendors = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        const vendors = DB_AVAILABLE
            ? await Vendor.find(req.body)
            : TEST_VENDORS;

        return res.status(200).json({
            msg: `Retrieved ${vendors.length} vendors successfully.`,
            vendors,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({ msg: err, vendors: [] });
    }
};

const searchVendors = async (req, res) => {
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
            // TODOTASK: switch to find verified `true` vendors
            const vendors = DB_AVAILABLE
                ? await Vendor.find({ verified: false })
                : TEST_VENDORS;

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

            return res.status(200).json({
                msg: `Filtered ${filtered_vendors.length} vendors successfully.`,
                filtered_vendors,
            });
        }

        // TODOTASK: implement BAD_REQUEST error handling
        return res.status(500).json({
            msg: "Incorrect search query format. No vendors have been filtered.",
            filtered_vendors: [],
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({ msg: err, filtered_vendors: [] });
    }
};

const findVendor = async (req, res) => {
    try {
        const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

        const { id } = req.params;

        if (!DB_AVAILABLE) {
            console.warn(
                "No support for this feature with locally stored data."
            );

            return res.status(500).json({
                msg: "No support for this feature with locally stored data.",
                vendor: {},
            });
        }

        const vendor = await Vendor.findById(id);

        return res
            .status(200)
            .json({ msg: `Found vendor ${vendor.company}.`, vendor });
    } catch (err) {
        console.error(err);

        return res.status(500).json({ msg: err, vendor: {} });
    }
};

const createVendor = async (req, res) => {
    try {
        const { main_email } = req.body;
        const repeated_user = await Vendor.findOne({ main_email });

        if (repeated_user) {
            return res.status(500).json({
                error: {
                    errors: {
                        unique: {
                            message: `Sign-up email "${main_email}" has already been taken.`,
                        },
                    },
                },
            });
        }

        const vendor = await Vendor.create({ ...req.body });

        return res.status(201).json({
            msg: `Vendor ${vendor.company} created!`,
            id: vendor._id,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const editVendor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ msg: "Must provide vendor ID to edit." });
        }

        const vendor = await Vendor.findOneAndUpdate(
            { _id: id },
            { ...req.body, verified: false },
            {
                runValidators: true,
            }
        );

        if (!vendor) {
            return res.status(400).json({
                msg: "No vendor found: nothing to edit.",
            });
        }

        return res.status(200).json({ msg: `${vendor.company} edited.` });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ msg: "Must provide vendor ID to delete." });
        }

        const vendor = await Vendor.findOneAndDelete({ _id: id });

        if (!vendor) {
            return res.status(400).json({
                msg: "No vendor found: nothing to delete.",
            });
        }

        return res.status(200).json({ msg: `${vendor.company} deleted.` });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const vendor = await Vendor.findOne({
            main_email: email.toLowerCase(),
        });

        if (vendor) {
            const match = await vendor.comparePassword(password);
            if (match) {
                // TODOTASK: store token in httOnly cookie - localStorage is for development only
                const token = vendor.createToken();
                return res.status(200).json({
                    token,
                    user: { id: vendor._id, role: vendor.auth.role },
                    msg: "Login successful!",
                });
            } else {
                return res.status(500).json({
                    error: {
                        errors: {
                            auth: {
                                message: "Invalid credentials.",
                            },
                        },
                    },
                });
            }
        } else {
            return res.status(500).json({
                error: {
                    errors: {
                        auth: {
                            message: "Invalid credentials.",
                        },
                    },
                },
            });
        }
    } catch (err) {
        console.error(err);

        return res
            .status(500)
            .json({ msg: "Something went wrong.", error: err });
    }
};

const vendorLogout = async (req, res) => {};
/* CONTROLLERS END */

/* EXPORTS START */
export {
    viewVendors,
    searchVendors,
    findVendor,
    createVendor,
    editVendor,
    deleteVendor,
    vendorLogin,
    vendorLogout,
};
/* EXPORTS END */
