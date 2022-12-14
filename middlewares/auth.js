import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function authorization(req, res, next) {
  //check if authorized header
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Not authorized" });
    res.end();
    return;
  }

  //check if authorized header is formattet correctly
  const header = req.headers.authorization.split(" ");
  if (header.length !== 2 && header[0].toLowerCase() !== "bearer") {
    res.status(403);
    res.end();
    return;
  }

  //check if token is valid
  try {
    jwt.verify(header[1], process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(403);
    res.end();
    return;
  }
}
