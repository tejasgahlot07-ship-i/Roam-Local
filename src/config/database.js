import mongoose from "mongoose";

let dbConnected = false;

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 6000,
    });
    dbConnected = true;
    console.log(`MongoDB connected! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    dbConnected = false;
    console.warn("MongoDB connection unavailable, falling back to local JSON store:", error.message);
  }
};

export const isDBConnected = () => dbConnected && mongoose.connection.readyState === 1;
export default connectDB;
