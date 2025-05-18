// TODO: replace module import with a fs readFile approach, so it reads from a .json file
const vendors = require("../vendors_module.cjs");

const getAllVendors = (req, res, next) => {
    return res.status(200).json({ vendors });
};

const getSearchedVendors = (req, res, next) => {
    const {
        mode,
        o_country,
        d_country,
        border,
        hazmat,
        team_drivers,
        usa_bonded,
        can_bonded,
    } = req.params;

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
            (!Number(hazmat) ? true : vendor.hazmat == Number(hazmat)) &&
            (!Number(team_drivers)
                ? true
                : vendor.team_drivers == Number(team_drivers)) &&
            (!Number(usa_bonded)
                ? true
                : vendor.usa_bonded == Number(usa_bonded)) &&
            (!Number(can_bonded)
                ? true
                : vendor.can_bonded == Number(can_bonded))
        );
    });

    // TEST LOG, delete later
    console.log(searched_vendors.length);

    return res.status(200).json({ searched_vendors });
};

module.exports = { getAllVendors, getSearchedVendors };
