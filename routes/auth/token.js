import user from "../../models/userModel.js";
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
  try {
    const user = await user.findOne({ username: req.body.username });
    if (!user) {
      res.status(401);
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
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200);
    res.send(newToken);
  } catch (error) {
    console.log("token error: ", error);
    res.status(500);
    res.end();
  }
}
