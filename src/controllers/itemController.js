const pool = require("../db/pool");

//Get all items
async function getAllItems(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT items.*, categories.name AS category_name
      FROM items
      JOIN categories ON items.category_id = categories.id
      ORDER BY items.id
    `);
    res.render("items/index", { items: rows }); // return array of items
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error fetching items" });
  }
}

//Get one item by ID
async function getItemById(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      `
      SELECT items.*, categories.name AS category_name
      FROM items
      JOIN categories ON items.category_id = categories.id
      WHERE items.id = $1
    `,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(rows[0]); // return single item
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error fetching item" });
  }
}

/**
 * SHOW delete confirmation
 */
async function deleteItemGet(req, res) {
  const { id } = req.params;

  const { rows } = await pool.query(
    `SELECT items.*, categories.name AS category_name
     FROM items
     JOIN categories ON items.category_id = categories.id
     WHERE items.id = $1`,
    [id],
  );

  const item = rows[0];

  res.render("items/delete", { item });
}

/**
 * HANDLE delete
 */
async function deleteItemPost(req, res) {
  const { id } = req.params;

  await pool.query("DELETE FROM items WHERE id = $1", [id]);

  res.redirect("/items");
}

module.exports = {
  getAllItems,
  getItemById,
  deleteItemGet,
  deleteItemPost,
};
