// imports

import { Router } from "express";
import { getVendors } from "../controllers/vendors.js";

const router = Router();

// routes

router.get("/", getVendors);

export default router;
