// imports

import locally_stored_vendors from "../data/vendors.js";
import Vendor from "../db/models/Vendor.js";

// controllers
export const getVendors = async (req, res, next) => {
    // Flag to determine `const vendors` data source
    const DB_AVAILABLE = Boolean(process.env.MONGO_URI);
    const vendors = DB_AVAILABLE
        ? await Vendor.find({})
        : locally_stored_vendors;

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
        const searched_vendors = vendors.filter((vendor) => {
            // `vendors` source conditional
            const vendor_coverage = DB_AVAILABLE
                ? vendor.coverage._doc
                : vendor.coverage;

            // `validated` flag
            // if (!vendor.validated) {
            //     return false;
            // }

            // Country coverage tracker
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
                vendor.borders.includes(border.split("+").join(" ")) &&
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

        return res.status(200).json({ searched_vendors });
    }

    return res.status(200).json({ vendors });
};

export const createVendor = async (req, res, next) => {
    const prospect_vendor = new Vendor(req.body);
    await prospect_vendor.save();

    return res
        .status(201)
        .json({ msg: `Vendor ${prospect_vendor.company} created!` });
};

export const editVendor = async (req, res, next) => {
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

export const deleteVendor = async (req, res, next) => {
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
