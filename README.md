# Inventory Management App (Node.js + PostgreSQL)

##  Overview

This is a full-stack **Inventory Management Application** built with **Node.js, Express, PostgreSQL, and EJS**.  
It allows users to manage **categories** and **items**, track stock levels, and perform full CRUD operations.

The project follows a **clean MVC (Model–View–Controller) architecture** and demonstrates core backend concepts.

---

##  Features

### Categories
- Create, view, update, and delete categories
- View all items belonging to a category

### Items
- Create, view, update, and delete inventory items
- Assign items to categories
- Track quantity in stock and price

### Backend
- Express routing
- Controllers for request/response handling
- PostgreSQL database with query abstraction
- Environment variables for secure configuration

---

##  Tech Stack

**Backend**
- Node.js
- Express
- PostgreSQL (`pg`)
- dotenv

**Frontend**
- EJS (server-side rendering)

**Dev Tools**
- Nodemon


---

##  Architecture (MVC)

- **Models (db/queries.js)**  
  Handles all SQL queries and database logic.

- **Controllers**  
  Handle HTTP requests, validate data, call database functions, and send responses.

- **Routes**  
  Map URLs to controller functions.

This separation makes the application **maintainable, scalable, and easy to debug**.

---

##  Environment Variables

Create a `.env` file in the root directory:


 The `.env` file is ignored by Git for security reasons.

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/BAWA7t/inventory-app.git
cd inventory-app

## Visit
http://localhost:3000

Dummy Data

Dummy data can be added manually or via SQL scripts to test the application locally before deployment.

This Project Demonstrates

Backend fundamentals with Node.js and Express

PostgreSQL database integration

MVC architecture

CRUD operations

Environment-based configuration

Real-world backend structure
