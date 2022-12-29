import Cheese from "../../models/cheeseModel.js";
import { unlink } from "node:fs/promises";
export default async function createCheese(req, res) {
  try {
    let document = {};
    if (!req.file) {
      document = {
        ...req.body,
      };
    } else {
      document = {
        ...req.body,
        image: { ...req.file },
      };
      const oldResult = await Cheese.findById(req.params.id);
      await unlink(oldResult.image.path);
    }

    const result = await Cheese.findByIdAndUpdate(req.params.id, document, {
      returnOriginal: false,
    });

    res.status(200);
    res.json(result.value);
    res.end();
  } catch (error) {
    if (error._message) {
      res.status(400);
      res.end();
      return;
    }
    console.log("update cheese error: ", error);
    res.status(500);
    res.end();
  }
}
