require("dotenv").config();
const express = require("express");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");
const pool = require("./db/pool");

const app = express();
const PORT = process.env.PORT || 3000;

//configure express to use view
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect("/categories");
});

app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);
/*
app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.send(result.rows[0]);
});
*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
