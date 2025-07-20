import mongoose from "mongoose";

const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
    } catch (err) {
        console.error(err);
    }
};

export default connectDB;
