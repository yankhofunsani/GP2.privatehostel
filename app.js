const express = require("express");
const { pool } = require("./database/connection.js");
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3000;
const HOST = "localhost";
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'Ejs'));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/landlord", (req, res) => {
    res.render("landlord");
});

// Function to insert data into the database
const insertData = (ID, name, category, capacity, price, availableslots, location, owner) => {
    const sql = 'INSERT INTO details (ID, name, category, capacity, price, availableslots, location, owner) VALUES (?, ?,?,?,?,?,?,?)';
    const values = [ID, name, category, capacity, price, availableslots, location, owner];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log(`Record inserted successfully with ID: ${result.insertId}`);
    });
};

// Post route to update data
app.post('/landlord', (req, res) => {
    // Extract data from the form
    const { id, name, category, capacity, price, availableslots, location, owner } = req.body;
    
    // SQL update query
    let query = `
        UPDATE details 
        SET 
            name = ?, 
            category = ?, 
            capacity = ?,  
            price = ?, 
            availableslots = ?, 
            location = ?, 
            owner = ?  
        WHERE ID = ?
    `;

    // Values to be updated, including the ID for the WHERE clause
    const values = [name, category, capacity, price, availableslots, location, owner, id];

    // Execute the query
    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send('An error occurred while updating the user.');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found.');
        }
        res.send('User updated successfully!');
    });
});
// Retrieve data and render the landlord page
app.get('/landlord/records', (req, res) => {
    const sql = 'SELECT * FROM details'; // Query to fetch all records
    pool.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data from the database:", err);
            return res.status(500).send('Error fetching data');
        }
        // Render the allRecords.ejs template and pass the results
        res.render('allRecords', { records: results });
    });
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`Server listening at port ${PORT}`);
});
