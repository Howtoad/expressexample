import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.MONGO_URI;
const client = new MongoClient(dbUrl);

async function useDB(collectionName) {
  await client.connect();
  console.log("Connection achieved");
  const db = client.db("Cheeseshop");
  const collection = db.collection(collectionName);
  return { collection, client };
}
export default useDB;
