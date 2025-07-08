// imports

import { Router } from "express";
import {
    viewVendors,
    searchVendors,
    findVendor,
    createVendor,
    editVendor,
    deleteVendor,
} from "../controllers/vendors.js";

const router = Router();

// routes

router.get("/admin/view", viewVendors);
router.get("/public/search", searchVendors);
router.get("/public/profile/:id", findVendor);
router.post("/public/create", createVendor);
router.patch("/public/edit/:id", editVendor);
router.delete("/public/delete/:id", deleteVendor);

export default router;
