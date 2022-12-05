export default function hej(app) {
  app.get("/hej/:name", function (req, res) {
    res.setHeader("content-type", "text/html");
    res.send(
      "<link rel='stylesheet' href='/style.css'>" +
        "<h1>Hej " +
        req.params.name +
        "</h1>"
    );
    res.end();
  });
}
