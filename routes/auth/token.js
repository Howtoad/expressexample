import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default async function token(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }

  try {
    const user = await User.findOne({ username: req.body.username });

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
