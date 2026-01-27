const pool = require("../db/pool");

/* ================= READ ================= */

async function getAllItems(req, res) {
  const { rows } = await pool.query(`
    SELECT items.*, categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    ORDER BY items.id
  `);

  res.render("items/index", { items: rows });
}

async function getItemById(req, res) {
  const { id } = req.params;

  const { rows } = await pool.query(`SELECT * FROM items WHERE id = $1`, [id]);

  res.json(rows[0]);
}

/* ================= FORMS ================= */

async function newItemForm(req, res) {
  const { rows: categories } = await pool.query(
    "SELECT id, name FROM categories ORDER BY name",
  );

  res.render("items/new", { categories });
}

async function editItemForm(req, res) {
  const { id } = req.params;

  const { rows: items } = await pool.query(
    "SELECT * FROM items WHERE id = $1",
    [id],
  );

  const { rows: categories } = await pool.query(
    "SELECT id, name FROM categories ORDER BY name",
  );

  res.render("items/edit", {
    item: items[0],
    categories,
  });
}

/* ================= DELETE ================= */

async function deleteItemGet(req, res) {
  const { id } = req.params;

  const { rows } = await pool.query(
    `SELECT items.*, categories.name AS category_name
     FROM items
     JOIN categories ON items.category_id = categories.id
     WHERE items.id = $1`,
    [id],
  );

  res.render("items/delete", { item: rows[0] });
}

async function deleteItemPost(req, res) {
  const { id } = req.params;

  await pool.query("DELETE FROM items WHERE id = $1", [id]);
  res.redirect("/items");
}

module.exports = {
  getAllItems,
  getItemById,
  newItemForm,
  editItemForm,
  deleteItemGet,
  deleteItemPost,
};
