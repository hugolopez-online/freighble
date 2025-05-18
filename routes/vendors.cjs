const express = require("express");
const router = express.Router();
const {
    getAllVendors,
    getSearchedVendors,
} = require("../controllers/vendors.cjs");

router.get("/", getAllVendors);
router.get(
    "/:mode/:o_country/:o_territory/:d_country/:d_territory/:border/:hazmat/:team_drivers/:usa_bonded/:can_bonded",
    getSearchedVendors
);

module.exports = router;
