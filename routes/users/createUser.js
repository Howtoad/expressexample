import bcrypt from "bcrypt";
import useDB from "../../database.js";

export default async function createUser(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }
  const { collection, client } = await useDB("users");
  const check = await collection.findOne({ username: req.body.username });
  if (check) {
    res.status(403);
    res.end();
    return;
  }

  const saltRounds = 4;
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const result = await collection.findOneAndUpdate(
      { createdAt: Date.now() },
      {
        $set: {
          username: req.body.username,
          password: hash,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    res.status(201);
    res.json(result);
    res.end();
  } catch (error) {
    console.log("create user error:", error);
    res.status(500);
    res.end();
  }

  console.log(hash);
  res.end();
}
