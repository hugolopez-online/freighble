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
        console.error(err);
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
        const prospect_vendor = new Vendor(req.body);
        await prospect_vendor.save();

        return res
            .status(201)
            .json({
                msg: `Vendor ${prospect_vendor.company} created!`,
                successful: true,
            });
    } catch (err) {
        return res
            .status(500)
            .json({
                msg: `Something went wrong.`,
                successful: false,
                error: err,
            });
    }
};

export const editVendor = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: `Must provide id.` });
    }

    const vendor = await Vendor.findOneAndUpdate({ _id: id }, req.body);

    if (!vendor) {
        return res.status(400).json({
            msg: `No vendor found with id: ${id} - Nothing was edited.`,
        });
    }

    return res.status(200).json({ msg: `Edited ${vendor.company}` });
};

export const deleteVendor = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: `Must provide id.` });
    }

    const vendor = await Vendor.findOneAndDelete({ _id: id });

    if (!vendor) {
        return res.status(400).json({
            msg: `No vendor found with id: ${id} - Nothing was deleted.`,
        });
    }

    return res.status(200).json({ msg: `Deleted ${vendor.company}` });
};
