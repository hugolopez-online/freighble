// imports
import User from "../db/models/User.js";

export const viewUsers = async (req, res) => {};

export const findUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        return res.status(200).json({ msg: `Found user ${user.email}.`, user });
    } catch (err) {
        console.error(err);
        return res.status(200).json({ msg: err, user: {} });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const repeated_user = await User.findOne({ email });

        if (repeated_user) {
            return res.status(500).json({
                error: {
                    errors: {
                        unique: {
                            message: `Sign-up email "${email}" has already been taken.`,
                        },
                    },
                },
            });
        }

        const user = await User.create({ ...req.body });

        return res.status(201).json({
            msg: `${user.first_name}, you have been successfuly registered! Now you can log in.`,
            id: user._id,
            successful: true,
        });
    } catch (err) {
        return res.status(500).json({
            msg: `Something went wrong. Please make sure all mandatory fields are completed as instructed.`,
            error: err,
        });
    }
};

export const editUser = async (req, res) => {
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
                msg: `No user found: nothing to edit.`,
            });
        }

        return res.status(200).json({ msg: `Profile edited.` });
    } catch (err) {
        return res.status(500).json({
            msg: `Something went wrong. Please make sure all mandatory fields are completed as instructed.`,
            error: err,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: `Must provide user ID.` });
        }

        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
            return res.status(400).json({
                msg: `No user found: nothing to delete.`,
            });
        }

        return res.status(200).json({ msg: `Profile deleted.` });
    } catch (err) {
        return res.status(500).json({
            msg: `Something went wrong.`,
            error: err,
        });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
        const match = await user.comparePassword(password);
        if (match) {
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

    /* !!! IMPLEMENT HTTPONLY COOKIE FOR LOGIN FOR PRODUCTION */

    // TEMPORAL LOCALSTORAGE APPROACH FOR DEVELOPMENT
};

export const userLogout = async (req, res) => {};
