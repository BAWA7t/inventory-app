const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();

router.get("/", controller.getAllItems);
router.get("/:id", controller.getItemById);
//Delete item
router.get("/:id/delete", controller.deleteItemGet);
router.post("/:id", controller.deleteItemPost);
//router.delete("/:id", controller.deleteItem);

module.exports = router;
