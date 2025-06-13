// imports

import vendors from "../vendors.js";

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
            return (
                vendor.modes.includes(mode) &&
                ((vendor.coverage["Canada"].territory[0] &&
                    vendor.coverage["Canada"].country_code == o_country) ||
                    (vendor.coverage["United States"].territory[0] &&
                        vendor.coverage["United States"].country_code ==
                            o_country) ||
                    (vendor.coverage["Mexico"].territory[0] &&
                        vendor.coverage["Mexico"].country_code == o_country)) &&
                ((vendor.coverage["Canada"].territory[0] &&
                    vendor.coverage["Canada"].country_code == d_country) ||
                    (vendor.coverage["United States"].territory[0] &&
                        vendor.coverage["United States"].country_code ==
                            d_country) ||
                    (vendor.coverage["Mexico"].territory[0] &&
                        vendor.coverage["Mexico"].country_code == d_country)) &&
                vendor.borders.includes(border.split("+").join(" ")) &&
                (!Number(hazmat) || vendor.hazmat) &&
                (!Number(team_drivers) || vendor.team_drivers) &&
                (!Number(usa_bonded) || vendor.usa_bonded) &&
                (!Number(can_bonded) || vendor.can_bonded) &&
                (!Number(ctpat) || vendor.ctpat) &&
                (!Number(twic) || vendor.twic) &&
                (!Number(tsa) || vendor.tsa) &&
                (!Number(fast) || vendor.fast)
            );
        });

        return res.status(200).json({ searched_vendors });
    }
    return res.status(200).json({ vendors });
};
