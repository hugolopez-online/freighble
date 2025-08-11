/* IMPORTS START */
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import User from "../db/models/User.js";
import { BadRequest, NotAuthenticated, NotFound } from "../errors/appErrors.js";
/* IMPORTS END */

/* CONTROLLERS START */
const USERS_API_VIEW = async (req, res) => {};

const USERS_API_FIND = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest("Invalid user ID.");
        }

        const user = await User.findById(id);

        if (!user) {
            throw new NotFound("No user has been found.");
        }

        return res
            .status(StatusCodes.OK)
            .json({ msg: `Found user ${user.email}.`, user });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message || "Something went wrong.", user: {} });
    }
};

const USERS_API_CREATE = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });

        return res.status(StatusCodes.CREATED).json({
            msg: `${user.first_name}, you've been successfuly registered!`,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const USERS_API_EDIT = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest("Invalid user ID.");
        }

        const user = await User.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            {
                runValidators: true,
            }
        );

        if (!user) {
            throw new NotFound("No user has been found.");
        }

        return res.status(StatusCodes.OK).json({ msg: "Profile edited." });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                msg: err.message || "Something went wrong.",
                error: err,
            });
    }
};

const USERS_API_DELETE = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest("Invalid user ID.");
        }

        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
            throw new NotFound("No user has been found.");
        }

        return res.status(StatusCodes.OK).json({ msg: "Profile deleted." });
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                msg: err.message || "Something went wrong.",
                error: err,
            });
    }
};

const USERS_API_LOGIN = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        const match = await user?.comparePassword(password);

        if (user && match) {
            // TODO: store token in httOnly cookie - localStorage is for development only
            const token = user.createToken();
            return res.status(StatusCodes.OK).json({
                token,
                user: {
                    id: user._id,
                    role: user.auth.role,
                    name: user.first_name,
                },
                msg: "Login successful!",
            });
        } else {
            throw new NotAuthenticated("Invalid credentials.");
        }
    } catch (err) {
        return res
            .status(err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message || "Something went wrong.", error: err });
    }
};

const USERS_API_LOGOUT = async (req, res) => {};
/* CONTROLLERS END */

/* EXPORTS START */
export {
    USERS_API_VIEW,
    USERS_API_FIND,
    USERS_API_CREATE,
    USERS_API_EDIT,
    USERS_API_DELETE,
    USERS_API_LOGIN,
    USERS_API_LOGOUT,
};
/* EXPORTS END */
