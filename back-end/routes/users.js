const express = require('express');
const authRoutes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Database = require('../db/dbConn.js');
const UtilityFunctions = require('../utils/functions.js');

// Ensure JWT secret key is set
const JWT_SECRET = process.env.JWT_TOKEN_SECRET;
if (!JWT_SECRET) {
    console.error('JWT secret key is missing');
    process.exit(1); // Exit the process if the secret key is missing
}

// User login route
authRoutes.post('/login', async (req, res) => {
    try {
        // Destructure username and password from request body
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            console.error('Missing username or password');
            return res.status(400).json({ success: false, message: "Please enter both Username & Password!" });
        }

        // Validate username format
        if (!UtilityFunctions.verifyUsername(username)) {
            console.error('Invalid username');
            return res.status(400).json({ success: false, message: "Wrong username, contains disallowed characters!" });
        }

        let userRecord;
        try {
            // Check if the username exists in the database
            const userQueryResult = await Database.AuthUser(username);
            if (userQueryResult.length === 0) {
                console.error('Username not found');
                return res.status(404).json({ success: false, message: "Username does not exist. Please create a new account!" });
            }
            userRecord = userQueryResult[0]; // Get user details
        } catch (error) {
            console.error('Error querying username:', error);
            return res.status(503).json({ success: false, message: "Error while processing username. Please try again later." });
        }
        // Compare provided password with hashed password from database
        console.log(password)
        console.log(userRecord.password)
        const isPasswordCorrect = await bcrypt.compare(password, userRecord.password);
        console.log("---")
        if (!isPasswordCorrect) {
            console.error('Incorrect password');
            return res.status(401).json({ success: false, message: "Incorrect password!" });
        }

        // Create a JWT token for the user
        const authToken = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '1h' });

        console.log("User successfully logged in!");
        return res.status(200).json({ success: true, token: authToken, user: userRecord.username, ms: "User is logged in!" });
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ success: false, message: "Internal server error! Try again later." });
    }
});

// User registration route
authRoutes.post('/register', async (req, res) => {
    try {
        // Destructure registration details from request body
        const { name, surname, username, email, password } = req.body;

        // Check if all required fields are provided
        if (!name || !surname || !username || !email || !password) {
            console.error('Missing input fields');
            return res.status(400).json({ success: false, message: "Input field missing! Please fill in all the fields." });
        }

        // Validate email format
        if (!UtilityFunctions.verifyEmail(email)) {
            console.error('Invalid email');
            return res.status(400).json({ success: false, message: "Wrong email, contains disallowed characters!" });
        }

        // Validate username format
        if (!UtilityFunctions.verifyUsername(username)) {
            console.error('Invalid username');
            return res.status(400).json({ success: false, message: "Wrong username, contains disallowed characters!" });
        }

        // Validate name and surname formats
        if (!UtilityFunctions.verifyNameSurname(name, surname)) {
            console.error('Invalid name or surname');
            return res.status(400).json({ success: false, message: "Wrong name/surname, contains disallowed characters!" });
        }


        // Check password strength
        if (!UtilityFunctions.verifyPassStrength(password)) {
            console.error('Weak password');
            return res.status(400).json({ success: false, message: "Wrong password, check password strength!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            console.error('Error hashing password');
            return res.status(500).json({ success: false, message: "Error while processing password. Please try again later." });
        }

        try {
            // Add the new user to the database
            const userInsertResult = await Database.AddUser(name, surname, username, email, hashedPassword);
            if (!(userInsertResult.affectedRows)) {
                console.error('Failed to add user');
                return res.status(500).json({ success: false, message: "Error registering new user..." });
            }
        } catch (error) {
            console.error('Error saving user in DB:', error);
            return res.status(503).json({ success: false, message: "Error while saving user in DB. Please try again later." });
        }

        return res.status(200).json({ success: true, message: "New user successfully registered." });
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ success: false, message: "Something happened internally! Please try again later." });
    }
});

// Check session route (for JWT)
authRoutes.get('/auth', async (req, res) => {
    try {
        // Retrieve token from authorization header
        const authToken = req.headers['authorization'];
        if (!authToken) {
            console.error('No token provided');
            return res.status(401).json({ success: false, message: "No token provided!" });
        }

        try {
            // Verify the JWT token
            const decodedToken = await new Promise((resolve, reject) => {
                jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
                    if (err) return reject(err);
                    resolve(decoded);
                });
            });

            return res.status(200).json({ success: true, user: decodedToken.user, message: "User is logged in!" });
        } catch (err) {
            console.error('Failed to authenticate token:', err);
            return res.status(401).json({ success: false, message: "Failed to authenticate token." });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
});

// Logout route (JWT specific)
authRoutes.post('/logout', (req, res) => {
    // JWT-based logout is typically handled on the client-side by deleting the token
    return res.status(200).json({ success: true, message: "Logout successful. Please delete the token on the client-side." });
});

module.exports = authRoutes;