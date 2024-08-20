const mysql = require('mysql2'); // Import the mysql2 package for database connections
const process = require('process');

// Create a connection to the MySQL database using environment variables for sensitive information
const conn = mysql.createConnection({
    host: process.env.DB_HOST,    // Database host (e.g., localhost)
    user: process.env.DB_USER,    // Database user
    password: process.env.DB_PASS, // Database password
    database: 'SISIII2024_89221055', // Name of the database
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
        conn.query('SELECT Rating.*, Book.title FROM Rating JOIN Book ON Book.id = Rating.book_id', (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

dataPool.allBooks = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Book', (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to get a single review from the 'reviews' table by ID
dataPool.oneReview = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Rating WHERE user_id = ?', [id], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

dataPool.getReviewByUserAndPost = (bookid, userid) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Rating WHERE book_id = ? AND user_id = ?', [bookid, userid], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to create a new review in the 'reviews' table with user association
dataPool.createReview = (userId, postid, rating, comment) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO Rating (user_id, book_id, star, comment) VALUES (?, ?, ?, ?)', 
        [userId, postid, rating, comment], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to update an existing review
dataPool.updateReview = (userId, bookid, rating, comment) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE Rating SET star = ?, comment = ? WHERE user_id = ? AND book_id = ?', 
        [rating, comment, userId, bookid], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to get all comments from the 'comments' table
dataPool.allComments = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM comments', (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to get a single comment from the 'comments' table by ID
dataPool.oneComment = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM comments WHERE id = ?', [id], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to create a new comment in the 'comments' table with user association
dataPool.createComment = (userId, comment, rating, file) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO comments (user_id, comment, rating, file) VALUES (?, ?, ?, ?)', 
        [userId, comment, rating, file], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to update an existing comment
dataPool.updateComment = (userId, comment, rating, file) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE comments SET comment = ?, rating = ?, file = ? WHERE user_id = ?', 
        [comment, rating, file, userId], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to get a comment by user ID
dataPool.getCommentByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM comments WHERE user_id = ?', [userId], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to delete a comment by user ID
dataPool.deleteCommentByUserId = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Rating WHERE id = ?', [id], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to authenticate a user based on the username
dataPool.AuthUser = (username) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User WHERE username = ? ', [username], (err, res) => {
            if (err) {return reject(err);} // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}

// Function to add a new user to the 'User' table
dataPool.AddUser = (name, surname, username, email, password) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO User (name, surname, username, email, password) VALUES (?, ?, ?, ?, ?)', 
        [name, surname, username, email, password], (err, res) => {
            if (err) return reject(err); // Reject the promise if an error occurs
            resolve(res); // Resolve the promise with the query result
        });
    });
}



// Export the dataPool object to be used in other parts of the application
module.exports = dataPool;