const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB = require('../db/dbConn.js');
const UTILS = require('../utils/functions.js');

// Ensure JWT secret key is set
const JWT_SECRET_KEY = process.env.JWT_TOKEN_SECRET;
if (!JWT_SECRET_KEY) {
    console.error('JWT secret key is missing');
    process.exit(1); // Exit the process if the secret key is missing
}

// User login route
users.post('/login', async (req, res) => {
    try {
        // Destructure username and password from request body
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            console.error('Missing username or password');
            return res.status(400).json({ success: false, msg: "Please enter both Username & Password!" });
        }

        // Validate username format
        if (!UTILS.verifyUsername(username)) {
            console.error('Invalid username');
            return res.status(400).json({ success: false, msg: "Wrong username, contains disallowed characters!" });
        }

        let user;
        try {
            // Check if the username exists in the database
            const queryResult = await DB.authUsername(username);
            if (queryResult.length === 0) {
                console.error('Username not found');
                return res.status(404).json({ success: false, msg: "Username does not exist. Please create a new account!" });
            }
            user = queryResult[0]; // Get user details
        } catch (error) {
            console.error('Error querying username:', error);
            return res.status(503).json({ success: false, msg: "Error while processing username. Please try again later." });
        }

        // Compare provided password with hashed password from database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.error('Incorrect password');
            return res.status(401).json({ success: false, msg: "Incorrect password!" });
        }

        // Create a JWT token for the user
        const token = jwt.sign({ user: username }, JWT_SECRET_KEY, { expiresIn: '1h' });

        console.log("User successfully logged in!");
        return res.status(200).json({ success: true, token: token, user: user.username, msg: "User is logged in!" });
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ success: false, msg: "Internal server error! Try again later." });
    }
});

// User registration route
users.post('/register', async (req, res) => {
    try {
        // Destructure registration details from request body
        const { name, surname, username, email, password, password2, role } = req.body;

        // Check if all required fields are provided
        if (!name || !surname || !username || !email || !password || !password2 || !role) {
            console.error('Missing input fields');
            return res.status(400).json({ success: false, msg: "Input field missing! Please fill in all the fields." });
        }

        // Validate email format
        if (!UTILS.verifyEmail(email)) {
            console.error('Invalid email');
            return res.status(400).json({ success: false, msg: "Wrong email, contains disallowed characters!" });
        }

        // Validate username format
        if (!UTILS.verifyUsername(username)) {
            console.error('Invalid username');
            return res.status(400).json({ success: false, msg: "Wrong username, contains disallowed characters!" });
        }

        // Validate name and surname formats
        if (!UTILS.verifyNameSurname(name, surname)) {
            console.error('Invalid name or surname');
            return res.status(400).json({ success: false, msg: "Wrong name/surname, contains disallowed characters!" });
        }

        // Validate role
        if (!UTILS.verifyRole(role)) {
            console.error('Invalid role');
            return res.status(400).json({ success: false, msg: "Wrong role, please try again." });
        }

        // Check if passwords match
        if (password !== password2) {
            console.error('Passwords do not match');
            return res.status(401).json({ success: false, msg: "Passwords do not match!" });
        }

        try {
            // Check if email is already in use
            const queryResultEmail = await DB.authEmail(email);
            if (queryResultEmail.length > 0) {
                console.error('Email already in use');
                return res.status(400).json({ success: false, msg: "User with that E-mail already exists!" });
            }

            // Check if username is already in use
            const queryResultUsername = await DB.authUsername(username);
            if (queryResultUsername.length > 0) {
                console.error('Username already in use');
                return res.status(400).json({ success: false, msg: "User with that Username already exists!" });
            }
        } catch (error) {
            console.error('Error querying email or username:', error);
            return res.status(503).json({ success: false, msg: "Error processing DB. Please try again later." });
        }

        // Check password strength
        if (!UTILS.verifyPassStrength(password)) {
            console.error('Weak password');
            return res.status(400).json({ success: false, msg: "Wrong password, check password strength!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            console.error('Error hashing password');
            return res.status(500).json({ success: false, msg: "Error while processing password. Please try again later." });
        }

        try {
            // Add the new user to the database
            const queryResult = await DB.addUser(name, surname, username, email, hashedPassword);
            if (!(queryResult.affectedRows)) {
                console.error('Failed to add user');
                return res.status(500).json({ success: false, msg: "Error registering new user..." });
            }
        } catch (error) {
            console.error('Error saving user in DB:', error);
            return res.status(503).json({ success: false, msg: "Error while saving user in DB. Please try again later." });
        }

        try {
            // Retrieve user ID by email
            const userId = await DB.getIdByEmail(email);
            if (!userId) {
                console.error('No user ID found');
                return res.status(404).json({ success: false, msg: "No user found!" });
            }

            // Assign roles to the user based on the provided role
            if (role === "both") {
                const q1 = await DB.addRole("Helper", userId[0].id);
                const q2 = await DB.addRole("Seeker", userId[0].id);
                if (!(q1.affectedRows > 0 && q2.affectedRows > 0)) {
                    console.error('Failed to add both roles');
                    return res.status(500).json({ success: false, msg: "Failed saving user role in DB" });
                }
            } else {
                const q = await DB.addRole(role, userId[0].id);
                if (!q.affectedRows) {
                    console.error('Failed to add role');
                    return res.status(500).json({ success: false, msg: "Failed saving user role in DB" });
                }
            }
        } catch (error) {
            console.error('Error processing user role:', error);
            return res.status(503).json({ success: false, msg: "User saved, but failed processing role..." });
        }

        return res.status(200).json({ success: true, msg: "New user successfully registered." });
    } catch (err) {
        console.error('Internal server error:', err);
        return res.status(500).json({ success: false, msg: "Something happened internally! Please try again later." });
    }
});

// Check session route (for JWT)
users.get('/auth', async (req, res) => {
    try {
        // Retrieve token from authorization header
        const token = req.headers['authorization'];
        if (!token) {
            console.error('No token provided');
            return res.status(401).json({ success: false, msg: "No token provided!" });
        }

        try {
            // Verify the JWT token
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
                    if (err) return reject(err);
                    resolve(decoded);
                });
            });

            return res.status(200).json({ success: true, user: decoded.user, msg: "User is logged in!" });
        } catch (err) {
            console.error('Failed to authenticate token:', err);
            return res.status(401).json({ success: false, msg: "Failed to authenticate token." });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return res.status(500).json({ success: false, msg: "Internal server error!" });
    }
});

// Logout route (JWT specific)
users.post('/logout', (req, res) => {
    // JWT-based logout is typically handled on the client-side by deleting the token
    return res.status(200).json({ success: true, msg: "Logout successful. Please delete the token on the client-side." });
});

module.exports = users;