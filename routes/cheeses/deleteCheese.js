import { ObjectId } from "mongodb";
import useDB from "../../database.js";
export default async function deleteCheese(req, res) {
  const { collection, client } = await useDB("cheeses");
  const id = req.params.id;
  if (id) {
    console.log(id);
    collection.deleteOne({ _id: ObjectId(id) });
    res.json({ message: "deleted cheese" + id });
  } else {
    collection.deleteMany({});
    res.json({ message: "deleted them all" });
  }
  res.end();
}
