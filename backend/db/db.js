import "dotenv/config";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
const db = client.db();

const connectDB = async () => {
  try {
    await client.connect();
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export { client, db };
export default connectDB;