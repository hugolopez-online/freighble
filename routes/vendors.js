// imports

import { Router } from "express";
import { getVendors, createVendor } from "../controllers/vendors.js";

const router = Router();

// routes

router.get("/", getVendors);
router.post("/", createVendor);

export default router;
