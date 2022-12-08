import useDB from "../../database.js";
export default async function getAllCheeses(req, res) {
  const { collection, client } = await useDB("cheeses");
  const id = req.params.id;
  if (id) {
    const cheese = await collection.findOne({ _id: id });
  } else {
    //get all cheeses
  }
  res.json({ message: "got them all" });
  res.end();
}
