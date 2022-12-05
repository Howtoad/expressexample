export default function authorization(req, res, next) {
  if (req.headers.authorization !== "1234") {
    res.status(401).json({ error: "Not authorized" });
    res.end();
    return;
  }
  next();
}
