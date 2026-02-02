const db = require("../db/queries");

/* ================= READ ================= */

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items/index", { items });
}

async function getItemById(req, res) {
  const { id } = req.params;
  const item = await db.getItemById(id);

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.json(item);
}

/* ================= FORMS ================= */

async function newItemForm(req, res) {
  const categories = await db.getAllCategories();
  res.render("items/new", { categories });
}

async function editItemForm(req, res) {
  const { id } = req.params;

  const item = await db.getItemById(id);
  const categories = await db.getAllCategories();

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.render("items/edit", { item, categories });
}

/* ================= DELETE ================= */

async function deleteItemGet(req, res) {
  const { id } = req.params;
  const item = await db.getItemById(id);

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.render("items/delete", { item });
}

async function deleteItemPost(req, res) {
  const { id } = req.params;
  await db.deleteItem(id);
  res.redirect("/items");
}

/* ================= CREATE ================= */

async function createItem(req, res) {
  const { name, description, quantity_in_stock, price, category_id } = req.body;

  if (!name || !category_id) {
    return res.status(400).send("Name and category are required");
  }

  await db.createItem({
    name,
    description,
    quantity_in_stock,
    price,
    category_id,
  });

  res.redirect("/items");
}

/* ================= UPDATE ================= */

async function updateItem(req, res) {
  const { id } = req.params;
  const { name, description, quantity_in_stock, price, category_id } = req.body;

  if (!name || !category_id) {
    return res.status(400).send("Name and category are required");
  }

  await db.updateItem(id, {
    name,
    description,
    quantity_in_stock,
    price,
    category_id,
  });

  res.redirect("/items");
}

module.exports = {
  getAllItems,
  getItemById,
  newItemForm,
  editItemForm,
  deleteItemGet,
  deleteItemPost,
  createItem,
  updateItem,
};
