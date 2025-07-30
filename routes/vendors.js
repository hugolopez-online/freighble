/* IMPORTS START */
import { Router } from "express";

import authAdmin from "../middleware/auth/authAdmin.js";
import authUser from "../middleware/auth/authUser.js";
import authVendor from "../middleware/auth/authVendor.js";

import * as vendors from "../controllers/vendors.js";
/* IMPORTS END */

/* MODULE START */
const router = Router();

const _view = vendors.VENDORS_API_VIEW;
const _search = vendors.VENDORS_API_SEARCH;
const _find = vendors.VENDORS_API_FIND;
const _create = vendors.VENDORS_API_CREATE;
const _edit = vendors.VENDORS_API_EDIT;
const _delete = vendors.VENDORS_API_DELETE;
const _login = vendors.VENDORS_API_LOGIN;
const _logout = vendors.VENDORS_API_LOGOUT;
/* MODULE END */

/* ROUTES START */
router.get("/admin/view", authAdmin, _view);
router.get("/public/search", authUser, _search);
router.get("/public/profile/:id", _find);
router.post("/public/create", _create);
router.patch("/public/edit/:id", authVendor, _edit);
router.delete("/public/delete/:id", authVendor, _delete);

router.post("/login", _login);
router.post("/logout", _logout);
/* ROUTES END */

export default router;
