export default function createCheese(req, res) {
  console.log(req.file);
  res.status(201);
  res.end();
}
