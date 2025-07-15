const authAdmin = (req, res, next) => {
    if (true) {
        next();
    } else {
        res.status(500).json({
            msg: "Not authorized.",
        });
    }
};

export default authAdmin;
