// imports

import { Router } from "express";
import {
    getVendors,
    createVendor,
    editVendor,
    deleteVendor,
} from "../controllers/vendors.js";

const router = Router();

// routes

router.get("/", getVendors);
router.post("/", createVendor);
router.patch("/:id", editVendor);
router.delete("/:id", deleteVendor);

export default router;
