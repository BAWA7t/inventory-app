require("dotenv").config();
const express = require("express");
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");
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
  const result = a{
  "name": "inventory_app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "dotenv": "^17.2.3",
    "ejs": "^4.0.1",
    "express": "^5.2.1",
    "pg": "^8.17.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
wait pool.query("SELECT NOW()");
  res.send(result.rows[0]);
});
*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
