const pool = require("./pool");

/* ==================== ITEMS ==================== */

async function getAllItems() {
  const { rows } = await pool.query(`
    SELECT items.*, categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    ORDER BY items.id
  `);
  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE id = $1`, [id]);
  return rows[0];
}

async function createItem({
  name,
  description,
  quantity_in_stock,
  price,
  category_id,
}) {
  await pool.query(
    `INSERT INTO items (name, description, quantity_in_stock, price, category_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, description, quantity_in_stock || 0, price || 0, category_id],
  );
}

async function updateItem(
  id,
  { name, description, quantity_in_stock, price, category_id },
) {
  await pool.query(
    `UPDATE items 
     SET name = $1, description = $2, quantity_in_stock = $3, price = $4, category_id = $5
     WHERE id = $6`,
    [name, description, quantity_in_stock, price, category_id, id],
  );
}

/*
async function updateItem(req, res) {
  const { id } = req.params;
  const { name, description, quantity, price, category_id } = req.body;

  if (!name || !category_id) {
    return res.status(400).send("Name and category are required");
  }

  await db.updateItem(id, { name, description, quantity, price, category_id });
  res.redirect("/items");
}
*/
async function deleteItem(id) {
  await pool.query(`DELETE FROM items WHERE id = $1`, [id]);
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);

  return rows[0];
}

async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query(
    `
    SELECT items.*, categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE categories.id = $1
    ORDER BY items.id
    `,
    [categoryId],
  );

  return rows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getItemsByCategory,
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
