"use server";
import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
