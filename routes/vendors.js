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

import authAdmin from "../middleware/auth/authAdmin.js";
import authUser from "../middleware/auth/authUser.js";
import authVendor from "../middleware/auth/authVendor.js";

const router = Router();

// routes

router.get("/admin/view", authAdmin, viewVendors);
router.get("/public/search", authUser, searchVendors);
router.get("/public/profile/:id", findVendor);
router.post("/public/create", createVendor);
router.patch("/public/edit/:id", authVendor, editVendor);
router.delete("/public/delete/:id", authVendor, deleteVendor);

export default router;
