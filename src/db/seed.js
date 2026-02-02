require("dotenv").config();
const pool = require("./pool");

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing data (safe for dev only)
    await pool.query("DELETE FROM items");
    await pool.query("DELETE FROM categories");

    // Insert categories
    const categoriesResult = await pool.query(`
      INSERT INTO categories (name, description)
      VALUES
        ('Electronics', 'Phones, laptops, accessories'),
        ('Groceries', 'Daily food items'),
        ('Stationery', 'Office and school supplies')
      RETURNING id
    `);

    const [electronics, groceries, stationery] = categoriesResult.rows.map(
      (row) => row.id,
    );

    // Insert items
    await pool.query(
      `
      INSERT INTO items
        (name, description, quantity_in_stock, price, category_id)
      VALUES
        ($1, $2, $3, $4, $5),
        ($6, $7, $8, $9, $10),
        ($11, $12, $13, $14, $15)
      `,
      [
        "Laptop",
        "Dell Inspiron 15",
        5,
        6500,
        electronics,

        "Rice (5kg)",
        "Long grain rice",
        20,
        180,
        groceries,

        "Notebook",
        "A4 ruled notebook",
        50,
        12,
        stationery,
      ],
    );

    console.log("✅ Database seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed", err);
  } finally {
    pool.end();
  }
}

seed();
