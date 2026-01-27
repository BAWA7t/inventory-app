const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");

// CREATE
router.get("/new", controller.newCategoryForm);
router.post("/new", controller.createCategory);

// READ
router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);

// UPDATE
router.get("/:id/edit", controller.editCategoryForm);
router.post("/:id/edit", controller.updateCategory);

// DELETE (optional)
router.post("/:id/delete", controller.deleteCategory);

module.exports = router;
