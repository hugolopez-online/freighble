/* IMPORTS START */
import User from "../db/models/User.js";
/* IMPORTS END */

/* CONTROLLERS START */
const USERS_API_VIEW = async (req, res) => {};

const USERS_API_FIND = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(500)
                .json({ msg: "Must provide ID to find user.", user: {} });
        }

        const user = await User.findById(id);

        if (!user) {
            return res
                .status(500)
                .json({ msg: "No user has been found.", user: {} });
        }

        return res.status(200).json({ msg: `Found user ${user.email}.`, user });
    } catch (err) {
        console.error(err);

        return res.status(200).json({ msg: err, user: {} });
    }
};

const USERS_API_CREATE = async (req, res) => {
    try {
        const { email } = req.body;

        const repeated_user = await User.findOne({ email });

        if (repeated_user) {
            // TODOTASK: implement proper error handling, below is a temporal approach
            return res.status(500).json({
                error: {
                    errors: {
                        unique: {
                            message: `Sign-up email "${email}" already taken.`,
                        },
                    },
                },
            });
        }

        const user = await User.create({ ...req.body });

        return res.status(201).json({
            msg: `${user.first_name}, you have been successfuly registered!`,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const USERS_API_EDIT = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ msg: `Must provide user ID to edit.` });
        }

        const user = await User.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            {
                runValidators: true,
            }
        );

        if (!user) {
            return res.status(400).json({
                msg: "No user found: nothing to edit.",
            });
        }

        return res.status(200).json({ msg: "Profile edited." });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const USERS_API_DELETE = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ msg: "Must provide user ID to delete." });
        }

        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
            return res.status(400).json({
                msg: "No user found: nothing to delete.",
            });
        }

        return res.status(200).json({ msg: "Profile deleted." });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            msg: "Something went wrong.",
            error: err,
        });
    }
};

const USERS_API_LOGIN = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                // TODOTASK: store token in httOnly cookie - localStorage is for development only
                const token = user.createToken();
                return res.status(200).json({
                    token,
                    user: {
                        id: user._id,
                        role: user.auth.role,
                        name: user.first_name,
                    },
                    msg: "Login successful!",
                });
            } else {
                return res.status(500).json({
                    error: {
                        errors: {
                            auth: {
                                message: "Invalid credentials.",
                            },
                        },
                    },
                });
            }
        } else {
            return res.status(500).json({
                error: {
                    errors: {
                        auth: {
                            message: "Invalid credentials.",
                        },
                    },
                },
            });
        }
    } catch (err) {
        console.error(err);

        return res
            .status(500)
            .json({ msg: "Something went wrong.", error: err });
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
