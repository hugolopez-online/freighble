const authVendor = (req, res, next) => {
    try {
        if (true) {
            next();
        } else {
            throw new Error("Not authorized.");
        }
    } catch (err) {
        return res
            .status(500)
            .json({ msg: err.message || "Something went wrong" });
    }
};

export default authVendor;
