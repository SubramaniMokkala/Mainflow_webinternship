const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "product_management",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL Database ✅");
});

// Get All Products
app.get("/get-products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).json({ message: "Error fetching products" });
            return;
        }
        res.json(results);
    });
});

// Search Products (by name, category, or description)
app.get("/search-products", (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).json({ message: "Search query is required" });
    }

    const query = `
        SELECT * FROM products 
        WHERE name LIKE ? OR category LIKE ? OR description LIKE ?
    `;
    const searchTerm = `%${searchQuery}%`;

    db.query(query, [searchTerm, searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error("Error searching products:", err);
            res.status(500).json({ message: "Error searching products" });
            return;
        }
        res.json(results);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
