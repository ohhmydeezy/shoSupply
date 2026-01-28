import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const URI = process.env.MONGO_URI;

if (!URI) {
  throw new Error("Missing URI");
}

export const client = new MongoClient(URI)

export const db = client.db("teachers");

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};