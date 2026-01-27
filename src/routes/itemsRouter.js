const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();

router.get("/", controller.getAllItems);
router.get("/new", controller.newItemForm);
router.get("/:id/edit", controller.editItemForm);
router.get("/:id/delete", controller.deleteItemGet);
router.post("/:id/delete", controller.deleteItemPost);
router.get("/:id", controller.getItemById);

module.exports = router;
