import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      // console.log("This is db name " + process.env.DB_NAME)
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Failed connected to Mongodb", error);
    process.exit(1);
  }
};

export default connectDB;
