/* IMPORTS START */
import { Router } from "express";

import authAdmin from "../middleware/auth/authAdmin.js";
import authUser from "../middleware/auth/authUser.js";

import * as users from "../controllers/users.js";
/* IMPORTS END */

/* MODULE START */
const router = Router();

const _view = users.USERS_API_VIEW;
const _find = users.USERS_API_FIND;
const _create = users.USERS_API_CREATE;
const _edit = users.USERS_API_EDIT;
const _delete = users.USERS_API_DELETE;
const _login = users.USERS_API_LOGIN;
const _logout = users.USERS_API_LOGOUT;
/* MODULE END */

/* ROUTES START */
router.get("/admin/view", authAdmin, _view);
router.get("/public/profile/:id", authUser, _find);
router.post("/public/create", _create);
router.patch("/public/edit/:id", authUser, _edit);
router.delete("/public/delete/:id", authUser, _delete);

router.post("/login", _login);
router.post("/logout", _logout);
/* ROUTES END */

export default router;
