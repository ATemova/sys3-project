const express = require("express");
const users = express.Router();
const bcrypt = require('bcrypt');
const DB = require('../db/dbConn.js');

// User login route
users.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (username && password) {
            const queryResult = await DB.AuthUser(username);

            if (queryResult.length > 0) {
                const user = queryResult[0];
                
                const passwordMatch = await bcrypt.compare(password, user.user_password);

                if (passwordMatch) {
                    req.session.user = user;
                    req.session.logged_in = true;

                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

                    return res.status(200).json({
                        user: user, 
                        status: { success: true, msg: "Logged in" }
                    });
                } else {
                    return res.status(401).json({
                        user: null, 
                        status: { success: false, msg: "Username or password incorrect" }
                    });
                }
            } else {
                return res.status(404).json({
                    user: null, 
                    status: { success: false, msg: "Username not registered" }
                });
            }
        } else {
            return res.status(400).json({
                user: null, 
                status: { success: false, msg: "Input element missing" }
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            status: { success: false, msg: "An internal error occurred" } 
        });
    }
});

// User registration route
users.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        if (username && password && email) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            const queryResult = await DB.AddUser(username, email, hashedPassword);

            if (queryResult.affectedRows) {
                const newUser = { user_name: username, user_email: email, user_password: hashedPassword };

                req.session.user = newUser;
                req.session.logged_in = true;

                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

                return res.status(201).json({
                    status: { success: true, msg: "New user created and logged in" }
                });
            } else {
                return res.status(400).json({
                    status: { success: false, msg: "Failed to create user" }
                });
            }
        } else {
            return res.status(400).json({
                status: { success: false, msg: "Input element missing" }
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: { success: false, msg: "An internal error occurred" }
        });
    }
});

// Check session route
users.get('/session', (req, res) => {
    try {
        if (req.session.user && req.session.logged_in) {
            res.status(200).json({
                user: req.session.user, 
                logged_in: req.session.logged_in,
                status: { success: true, msg: "User is logged in" }
            });
        } else {
            res.status(200).json({
                user: null,
                logged_in: false,
                status: { success: false, msg: "No active session" }
            });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Logout route
users.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ status: { success: false, msg: "Failed to log out" } });
            } else {
                res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
                return res.status(200).json({ status: { success: true, msg: "Logged out successfully" } });
            }
        });
    } else {
        return res.status(400).json({ status: { success: false, msg: "No user is logged in" } });
    }
});

module.exports = users;