import { ObjectId } from "mongodb";
import useDB from "../../database.js";
export default async function createCheese(req, res) {
  const { collection, client } = await useDB("cheeses");
  //create cheese
  try {
    const document = {
      ...req.body,
      image: { ...req.file },
    };
    const result = await collection.findOneAndUpdate(
      { createdAt: Date.now() },
      { $set: document },
      { upsert: true, returnDocument: "after" }
    );

    //create multiple cheeses
    //const postMany = await collection.insertMany([{req.body},{req.body}]);
    client.close();
    res.status(201);
    res.json(result.value);
    res.end();
  } catch (error) {
    console.log("create cheese error: ", error);
    res.status(500);
    res.end();
  }
}
