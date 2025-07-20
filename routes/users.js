// imports

import { Router } from "express";
import {
    viewUsers,
    findUser,
    createUser,
    editUser,
    deleteUser,
} from "../controllers/users.js";

import authAdmin from "../middleware/auth/authAdmin.js";
import authUser from "../middleware/auth/authUser.js";

const router = Router();

// routes

router.get("/admin/view", authAdmin, viewUsers);
router.get("/public/profile/:id", authUser, findUser);
router.post("/public/create", createUser);
router.patch("/public/edit/:id", authUser, editUser);
router.delete("/public/delete/:id", authUser, deleteUser);

export default router;
