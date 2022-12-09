import { ObjectId } from "mongodb";
import useDB from "../../database.js";
export default async function createCheese(req, res) {
  const { collection, client } = await useDB("cheeses");
  //create cheese
  const postOne = await collection.insertOne({ body });
  //create multiple cheeses
  //const postMany = await collection.insertMany([{req.body},{req.body}]);
  res.status(201);
  res.end();
}
