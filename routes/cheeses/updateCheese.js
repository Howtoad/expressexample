import { ObjectId } from "mongodb";
import useDB from "../../database.js";

export default async function updateCheese(req, res) {
  const { collection, client } = await useDB("cheeses");
  const id = req.params.id;
  const body = req.body;
  if (id) {
    console.log(id);
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name: body.name, description: body.description } }
    );
    res.json({ message: "updated cheese" + id });
  } else {
    res.json({ message: "no cheese to update" });
  }
  res.end();
}
