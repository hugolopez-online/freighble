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
        const repeated_user = await Vendor.findOne({ email });

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

export const editUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
