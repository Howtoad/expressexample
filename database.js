// import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(dbUrl);

  console.log("Connected to database");
}
main().catch((error) => console.log("db connection failed", error));
