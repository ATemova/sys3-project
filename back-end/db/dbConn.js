const mysql = require('mysql2'); // Import the mysql2 package for database connections
const process = require('process');

// Create a connection to the MySQL database using environment variables for sensitive information
const conn = mysql.createConnection({
    host: process.env.DB_HOST,    // Database host (e.g., localhost)
    user: process.env.DB_USER,    // Database user
    password: process.env.DB_PASS, // Database password
    database: 'SISIII2024_89221055',     // Name of the database
});

// Connect to the database and handle any connection errors
conn.connect((err) => {
    if (err) {
        console.log("---");
        console.log("ERROR: " + err.message); // Log the error if the connection fails
        return;
    }
    console.log('Connection established'); // Log success message if the connection is successful
});

// Create an object to hold the database functions
let dataPool = {};

// Function to get all reviews from the 'reviews' table
dataPool.allReviews = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM reviews`, (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to get a single review from the 'reviews' table by ID
dataPool.oneReview = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM reviews WHERE id = ?`, [id], (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to create a new review in the 'reviews' table (no file handling)
dataPool.createReview = (rating, comment) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO reviews (rating, comment) VALUES (?,?)`, 
        [rating, comment], (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to authenticate a user based on the username (unchanged)
dataPool.AuthUser = (username) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User WHERE username = ?', [username], 
        (err, res, fields) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to add a new user to the 'User' table (unchanged)
dataPool.AddUser = (name, surname, username, email, password) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO User (name, surname, username, email, password) VALUES (?,?,?,?,?)`, 
        [name, surname, username, email, password], (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Export the dataPool object to be used in other parts of the application
module.exports = dataPool;