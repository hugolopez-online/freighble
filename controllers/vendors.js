// imports
import locally_stored_vendors from "../data/vendors.js";
import Vendor from "../db/models/Vendor.js";

// controllers
export const viewVendors = async (req, res) => {
    const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

    try {
        const vendors = DB_AVAILABLE
            ? await Vendor.find(req.body)
            : locally_stored_vendors.filter((vendor) => {
                  // will return all locally stored vendors, regardless of `req.body`
                  return true;
              });
        return res.status(200).json({
            msg: `Retrieved ${vendors.length} vendors successfully.`,
            vendors,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err, vendors: [] });
    }
};

export const searchVendors = async (req, res) => {
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

    try {
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
            const vendors = DB_AVAILABLE
                ? await Vendor.find({ verified: false })
                : locally_stored_vendors;

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
                        vendor_coverage[country].country_code == o_country
                    ) {
                        country_coverage++;
                    }

                    if (
                        vendor_coverage[country].territory.length !== 0 &&
                        vendor_coverage[country].country_code == d_country
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
    } catch (err) {
        return res.status(500).json({ msg: err, filtered_vendors: [] });
    }

    return res.status(200).json({ filtered_vendors: [] });
};

export const findVendor = async (req, res) => {
    const DB_AVAILABLE = Boolean(process.env.MONGO_URI);

    const { id } = req.params;

    if (!DB_AVAILABLE) {
        console.warn("No support for this feature with locally stored data.");
        return false;
    }

    try {
        const vendor = await Vendor.findById(id);
        return res
            .status(200)
            .json({ msg: `Found vendor ${vendor.company}.`, vendor });
    } catch (err) {
        console.error(err);
        return res.status(200).json({ msg: err, vendor: {} });
    }
};

export const createVendor = async (req, res) => {
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
            successful: true,
        });
    } catch (err) {
        return res.status(500).json({
            msg: `Something went wrong. Please make sure all mandatory fields are completed as instructed.`,
            error: err,
        });
    }
};

export const editVendor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ msg: `Must provide vendor ID to edit.` });
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
                msg: `No vendor found: nothing to edit.`,
            });
        }

        return res.status(200).json({ msg: `${vendor.company} edited.` });
    } catch (err) {
        return res.status(500).json({
            msg: `Something went wrong. Please make sure all mandatory fields are completed as instructed.`,
            error: err,
        });
    }
};

export const deleteVendor = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: `Must provide vendor ID.` });
    }

    const vendor = await Vendor.findOneAndDelete({ _id: id });

    if (!vendor) {
        return res.status(400).json({
            msg: `No vendor found: nothing to delete.`,
        });
    }

    return res.status(200).json({ msg: `Deleted ${vendor.company}` });
};

export const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email: email.toLowerCase() });

    if (vendor) {
        const match = await vendor.comparePassword(password);
        if (match) {
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

    /* !!! IMPLEMENT HTTPONLY COOKIE FOR LOGIN FOR PRODUCTION */

    // TEMPORAL LOCALSTORAGE APPROACH FOR DEVELOPMENT
};

export const vendorLogout = async (req, res) => {};
