const express = require('express');
const mysql = require('mysql');
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Update your MySQL password if needed
    database: 'product_management',  // Ensure this DB exists
    port: 3307  // Updated to the new MySQL port
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create a new product (POST)
app.post('/api/products', (req, res) => {
    const { name, price, description, quantity } = req.body;
    const query = 'INSERT INTO products (name, price, description, quantity) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, price, description, quantity], (err, result) => {
        if (err) {
            res.status(500).send('Error adding product: ' + err);
            return;
        }
        res.status(201).send('Product added successfully');
    });
});

// Get all products (GET)
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching products: ' + err);
            return;
        }
        res.status(200).json(results);
    });
});

// Get a single product by ID (GET)
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM products WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching product: ' + err);
            return;
        }
        res.status(200).json(result);
    });
});

// Update a product (PUT)
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;
    const query = 'UPDATE products SET name = ?, price = ?, description = ?, quantity = ? WHERE id = ?';
    
    db.query(query, [name, price, description, quantity, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating product: ' + err);
            return;
        }
        res.status(200).send('Product updated successfully');
    });
});

// Delete a product (DELETE)
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting product: ' + err);
            return;
        }
        res.status(200).send('Product deleted successfully');
    });
});

// Set up the server to listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
