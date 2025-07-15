const authVendor = (req, res, next) => {
    if (true) {
        next();
    } else {
        res.status(500).json({
            msg: "Not authorized.",
        });
    }
};

export default authVendor;
