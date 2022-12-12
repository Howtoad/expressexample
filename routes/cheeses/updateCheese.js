import { ObjectId } from "mongodb";
import useDB from "../../database.js";
import { unlink } from "node:fs/promises";
export default async function createCheese(req, res) {
  const { collection, client } = await useDB("cheeses");
  //create cheese
  try {
    let document = {};
    if (!req.file) {
      document = {
        ...req.body,
      };
    } else {
      document = {
        ...req.body,
        image: { ...req.file },
      };
      const oldResult = await collection.findOne({
        _id: ObjectId(req.params.id),
      });
      await unlink(oldResult.image.path);
    }

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $set: document },
      { returnDocument: "after" }
    );

    client.close();
    res.status(201);
    res.json(result.value);
    res.end();
  } catch (error) {
    console.log("update cheese error: ", error);
    res.status(500);
    res.end();
  }
}
