import mongoose from "mongoose";

const connectDB = (url: string) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(url);
};

export default connectDB;
