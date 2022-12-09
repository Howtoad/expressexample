import { ObjectId } from "mongodb";
import useDB from "../../database.js";
import dotenv from "dotenv";
dotenv.config();

function URLBuilder(id, resource) {
  return process.env.HOST_ADDRESS + `/api/v1/${resource}/${id}`;
}

export default async function getAllCheeses(req, res) {
  const { collection, client } = await useDB("cheeses");

  const id = req.params.id;
  const limit = parseInt(req.query.limit || 20);
  const skip = parseInt(req.query.skip || 0);

  const query = id ? { _id: ObjectId(id) } : {};
  const result = await collection.find(query).limit(limit).skip(skip).toArray();
  const length = await collection.countDocuments();
  client.close();

  const nextLink =
    skip + limit >= length
      ? null
      : process.env.HOST_ADDRESS +
        `/api/v1/cheeses?limit=${limit}&skip=${
          skip + limit > length ? skip : skip + limit
        }`;
  const prevLink =
    skip === 0
      ? null
      : process.env.HOST_ADDRESS +
        `/api/v1/cheeses?limit=${limit}&skip=${
          skip - limit < 0 ? 0 : skip - limit
        }`;

  const presentation = {
    results: result.map((item) => ({
      ...item,
      url: URLBuilder(item._id, "cheeses"),
    })),
    count: length,
    next: nextLink,
    prev: prevLink,
  };

  res.json(
    id
      ? {
          ...resultresult[0],
          url: URLBuilder(result[0]._id, "cheeses"),
        }
      : presentation
  );
  res.end();
}
//   if (id) {
//     collection.findOne({ _id: id });
//     res.json({ message: "found the cheese with id: " + id });
//   } else {
//     collection.find({}).toArray();
//     res.json({ message: "got them all" });
//   }
//   res.end();
// }
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
