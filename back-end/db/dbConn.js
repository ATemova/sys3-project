const mysql = require('mysql2'); // Import the mysql2 package for database connections

// Create a connection to the MySQL database using environment variables for sensitive information
const conn = mysql.createConnection({
    host: process.env.DB_HOST,    // Database host (e.g., localhost)
    user: process.env.DB_USER,    // Database user
    password: process.env.DB_PASS, // Database password
    database: 'Qcodeigniter',     // Name of the database
});

// Connect to the database and handle any connection errors
conn.connect((err) => {
    if (err) {
        console.log("---")
        console.log("ERROR: " + err.message); // Log the error if the connection fails
        return;
    }
    console.log('Connection established'); // Log success message if the connection is successful
});

// Create an object to hold the database functions
let dataPool = {};

// Function to get all records from the 'news' table
dataPool.allNovice = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM news`, (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to get a single record from the 'news' table by ID
dataPool.oneNovica = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM news WHERE id = ?`, [id], (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to create a new record in the 'news' table
dataPool.creteNovica = (title, slug, text, file) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO news (title, slug, text, file) VALUES (?,?,?,?)`, 
        [title, slug, text, file], (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to authenticate a user based on the username
dataPool.AuthUser = (username) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user_login WHERE user_name = ?', [username], 
        (err, res, fields) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Function to add a new user to the 'user_login' table
dataPool.AddUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO user_login (user_name, user_email, user_password) VALUES (?,?,?)`, 
        [username, email, password], (err, res) => {
            if (err) { return reject(err); } // Reject the promise if an error occurs
            return resolve(res);             // Resolve the promise with the query result
        });
    });
}

// Export the dataPool object to be used in other parts of the application
module.exports = dataPool;