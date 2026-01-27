const express = require("express");
const controller = require("../controllers/categoryController");
const router = express.Router();

router.get("/", controller.getAllCategories); //GET all
router.get("/:id", controller.getCategoryById); //GET one
//router.post("/", controller.createCategory); //POST create
//router.put("/:id", controller.updateCategory); //PUT update
//router.delete("/:id", controller.deleteCategory); //DELETE remove

module.exports = router;
