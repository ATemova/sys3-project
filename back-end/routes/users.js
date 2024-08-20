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
        const { username, password } = req.body;

        if (!username || !password) {
            console.error('Missing username or password');
            return res.status(400).json({ success: false, message: "Please enter both Username & Password!" });
        }

        // Validate username format
        if (!UtilityFunctions.verifyUsername(username)) {
            console.error('Invalid username');
            return res.status(400).json({ success: false, message: "Invalid username format!" });
        }

        // Check if the username exists in the database
        const userQueryResult = await Database.AuthUser(username);
        if (userQueryResult.length === 0) {
            console.error('Username not found');
            return res.status(404).json({ success: false, message: "Username does not exist. Please create a new account!" });
        }

        const userRecord = userQueryResult[0];

        // Compare provided password with hashed password from database
        const isPasswordCorrect = await bcrypt.compare(password, userRecord.password);
        if (!isPasswordCorrect) {
            console.error('Incorrect password');
            return res.status(401).json({ success: false, message: "Incorrect password!" });
        }

        // Create a JWT token for the user
        const authToken = jwt.sign({ user: { id: userRecord.id, username: userRecord.username } }, JWT_SECRET, { expiresIn: '1h' });

        console.log("User successfully logged in!");
        return res.status(200).json({ success: true, token: authToken, user: userRecord.username, msg: "User is logged in!" });
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ success: false, message: "Internal server error! Try again later." });
    }
});

// User registration route
authRoutes.post('/register', async (req, res) => {
    try {
        const { name, surname, username, email, password } = req.body;

        if (!name || !surname || !username || !email || !password) {
            console.error('Missing input fields');
            return res.status(400).json({ success: false, message: "Input field missing! Please fill in all the fields." });
        }

        // Validate email format
        if (!UtilityFunctions.verifyEmail(email)) {
            console.error('Invalid email');
            return res.status(400).json({ success: false, message: "Invalid email format!" });
        }

        // Validate username format
        if (!UtilityFunctions.verifyUsername(username)) {
            console.error('Invalid username');
            return res.status(400).json({ success: false, message: "Invalid username format!" });
        }

        // Validate name and surname formats
        if (!UtilityFunctions.verifyNameSurname(name, surname)) {
            console.error('Invalid name or surname');
            return res.status(400).json({ success: false, message: "Invalid name or surname format!" });
        }

        // Check password strength
        if (!UtilityFunctions.verifyPassStrength(password)) {
            console.error('Weak password');
            return res.status(400).json({ success: false, message: "Weak password, please ensure it meets the strength requirements!" });
        }

        // Check if username or email already exists in the database
        const existingUser = await Database.checkUserExists(username, email);
        if (existingUser.length > 0) {
            console.error('Username or email already in use');
            return res.status(409).json({ success: false, message: "Username or email already in use!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            console.error('Error hashing password');
            return res.status(500).json({ success: false, message: "Error processing password. Please try again later." });
        }

        // Add the new user to the database
        const userInsertResult = await Database.AddUser(name, surname, username, email, hashedPassword);
        if (!userInsertResult.affectedRows) {
            console.error('Failed to add user');
            return res.status(500).json({ success: false, message: "Error registering new user." });
        }

        return res.status(200).json({ success: true, message: "New user successfully registered." });
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ success: false, message: "Internal server error! Please try again later." });
    }
});

// Check session route (for JWT)
authRoutes.get('/auth', (req, res) => {
    try {
        const authToken = req.headers['authorization'];
        if (!authToken) {
            console.error('No token provided');
            return res.status(401).json({ success: false, message: "No token provided!" });
        }

        const token = authToken.split(' ')[1]; // Extract token from "Bearer <token>"
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Failed to authenticate token:', err);
                return res.status(401).json({ success: false, message: "Failed to authenticate token." });
            }

            return res.status(200).json({ success: true, user: decoded.user, message: "User is logged in!" });
        });
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