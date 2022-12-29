import bcrypt from "bcrypt";
import user from "../../models/userModel.js";

export default async function createUser(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.end();
    return;
  }

  const check = await user.findOne({ username: req.body.username });
  if (check) {
    res.status(403);
    res.end();
    return;
  }

  const saltRounds = 4;
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const user = new user({
      username: req.body.username,
      password: hash,
    });
    await user.save();
    res.status(201);
    res.json(user);
    res.end();
  } catch (error) {
    if (error._message) {
      res.status(400);
      res.end();
      return;
    }
    console.log("create user error:", error);
    res.status(500);
    res.end();
  }

  console.log(hash);
  res.end();
}
