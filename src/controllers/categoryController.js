const db = require("../db/queries");

// GET all categories
exports.getAllCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories/index", { categories });
};

// GET category by ID
exports.getCategoryById = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send("Invalid category ID");
  }

  const category = await db.getCategoryById(id);
  const items = await db.getItemsByCategory(id);

  res.render("categories/show", { category, items });
};

// FORM: new category
exports.newCategoryForm = (req, res) => {
  res.render("categories/new");
};

// CREATE category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).send("Name required");
  }

  await db.createCategory(name, description);
  res.redirect("/categories");
};

// FORM: edit category
exports.editCategoryForm = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send("Invalid ID");
  }

  const category = await db.getCategoryById(id);
  res.render("categories/edit", { category });
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;

  await db.updateCategory(id, name, description);
  res.redirect("/categories");
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  const id = Number(req.params.id);
  await db.deleteCategory(id);
  res.redirect("/categories");
};
