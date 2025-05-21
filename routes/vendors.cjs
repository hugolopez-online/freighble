const express = require("express");
const router = express.Router();
const { getVendors } = require("../controllers/vendors.cjs");

router.get("/", getVendors);

module.exports = router;
