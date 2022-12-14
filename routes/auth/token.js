import useDB from "../../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default async function token(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }

  const { collection, client } = await useDB("users");
  try {
    const user = await collection.findOne({ username: req.body.username });
    client.close();
    if (!user) {
      res.status(403);
      res.end();
      return;
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(403);
      res.end();
      return;
    }
    const newToken = jwt.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201);
    res.send(newToken);
    res.end();
  } catch (error) {
    console.log("token error: ", error);
    res.status(500);
    res.end();
  }
}
