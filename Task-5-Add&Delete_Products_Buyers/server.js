const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Change if you have a different username
    password: '',  // Change if you have a MySQL password
    database: 'product_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database ✅');
    }
});

// API Route to Add a Product
app.post('/add-product', (req, res) => {
    const { name, category, price, quantity, description } = req.body;

    if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const query = 'INSERT INTO products (name, category, price, quantity, description) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, category, price, quantity, description], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.json({ message: "Product added successfully!", productId: result.insertId });
    });
});

// API Route to Add a Buyer
app.post('/add-buyer', (req, res) => {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const query = 'INSERT INTO buyers (name, email, phone, address) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.json({ message: "Buyer added successfully!", buyerId: result.insertId });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// API Route to Delete a Product
app.delete('/delete-product/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM products WHERE id = ?';

    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ message: "Database error while deleting product" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found!" });
        }
        res.json({ message: "Product deleted successfully!" });
    });
});

// API Route to Delete a Buyer
app.delete('/delete-buyer/:id', (req, res) => {
    const buyerId = req.params.id;
    const query = 'DELETE FROM buyers WHERE id = ?';

    db.query(query, [buyerId], (err, result) => {
        if (err) {
            console.error('Error deleting buyer:', err);
            return res.status(500).json({ message: "Database error while deleting buyer" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Buyer not found!" });
        }
        res.json({ message: "Buyer deleted successfully!" });
    });
});

