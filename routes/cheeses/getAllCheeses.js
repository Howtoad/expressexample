import { ObjectId } from "mongodb";
import useDB from "../../database.js";
export default async function getAllCheeses(req, res) {
  const { collection, client } = await useDB("cheeses");
  const id = req.params.id;
  if (id) {
    const cheese = await collection.findOne({ _id: id });
  } else {
    const cheeses = await collection.find({}).toArray();
    res.json(cheeses);
  }
  res.json({ message: "got them all" });
  res.end();
}
//create cheese
//const result = await collection.insertOne({req.body});
//create multiple cheeses
//const result = await collection.insertMany([{req.body},{req.body}]);

//find one cheese
//const result = await collection.find({ _id: ObjectId(id) }).toArray();
//fine all cheese
//const result = await collection.find({}).toArray();

//update one cheese
//const result = await collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: {name: "new name"}});

//delete one cheese
//const result = await collection.deleteOne({ _id: ObjectId(id) });
//delete all cheeses
//const result = await collection.deleteMany({});
