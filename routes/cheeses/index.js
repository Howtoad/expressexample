import getAllCheeses from "./getAllCheeses.js";
import createCheese from "./createCheese.js";
import deleteCheese from "./deleteCheese.js";
import authorization from "../../middlewares/auth.js";
import upload from "../../middlewares/upload.js";

export default function cheeses(app) {
  app
    .route("/cheeses/:id?")
    .delete(deleteCheese)
    .get(getAllCheeses)
    .all(authorization)
    .post(upload.single("image"), createCheese);
}
