import "dotenv/config";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
const db = client.db();

let isConnected = false;
let mongoClientPromise = null;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1 && isConnected) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;

    console.log("Mongoose connected successfully!");
  } catch (error) {
    isConnected = false;
    throw error;
  }
};

const connectAuthDB = async () => {
  if (!mongoClientPromise) {
    mongoClientPromise = client.connect().catch((error) => {
      mongoClientPromise = null;
      throw error;
    });
  }

  await mongoClientPromise;
};

export { client, db, connectAuthDB };
export default connectDB;
