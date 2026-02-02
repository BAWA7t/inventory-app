const express = require("express");
const controller = require("../controllers/itemController");
const router = express.Router();

router.get("/", controller.getAllItems);

// NEW ITEM
router.get("/new", controller.newItemForm);
router.post("/new", controller.createItem); // ✅ ADD THIS

// EDIT
router.get("/:id/edit", controller.editItemForm);
router.post("/:id/edit", controller.updateItem);

// DELETE
router.get("/:id/delete", controller.deleteItemGet);
router.post("/:id/delete", controller.deleteItemPost);

// SHOW ONE (keep last!)
router.get("/:id", controller.getItemById);

module.exports = router;
