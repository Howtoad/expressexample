import express from "express";
import cheeses from "./routes/cheeses/index.js";

const app = express();

var port = 3000;

app.use(express.static("./public"));

// hej(app);

cheeses(app);

app.get("/stewart", function (req, res) {
  res.send(
    `<h1>Stewart</h1>
    <img src="https://images.genius.com/8175f4bd7cacc404abefbcb33f9cb10f.600x595x1.jpg">"`
  );
  res.end();
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});
//mongodb+srv://dbadmin:<password>@cluster0.lac5bg8.mongodb.net/test
