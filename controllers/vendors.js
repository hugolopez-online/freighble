// imports

import vendors from "../src/pages/Dashboard/data/vendors.js";
import Vendor from "../db/models/Vendor.js";

// controllers

export const getVendors = (req, res, next) => {
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
        fast
    ) {
        const searched_vendors = vendors.filter((vendor) => {
            let country_coverage = 0;

            for (let country in vendor.coverage) {
                if (country_coverage === 2) {
                    break;
                }

                if (
                    vendor.coverage[country].territory[0] &&
                    vendor.coverage[country].country_code == o_country
                ) {
                    country_coverage++;
                }

                if (
                    vendor.coverage[country].territory[0] &&
                    vendor.coverage[country].country_code == d_country
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
                (!Number(fast) || vendor.fast);

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
