import { ObjectId } from "mongodb";
import Cheese from "../../models/cheeseModel.js";
export default async function createCheese(req, res) {
  //create cheese
  try {
    const document = {
      ...req.body,
      image: { ...req.file },
    };

    const cheese = new Cheese(document);
    await cheese.save();

    //create multiple cheeses
    //const postMany = await collection.insertMany([{req.body},{req.body}]);
    res.status(201);
    res.json(cheese);
    res.end();
  } catch (error) {
    if (error._message) {
      res.status(400);
      res.end();
      return;
    }
    console.log("create cheese error: ", error);
    res.status(500);
    res.end();
  }
}
