const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing passwords
const jwt = require('jsonwebtoken');
const util = require('util');
const jwtVerify = util.promisify(jwt.verify); // Promisify jwt.verify for async/await usage

let funct = {};

// Hash a password using bcrypt
funct.hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds); // Hash password with salt
    } catch (err) {
        console.error('Error hashing password:', err);
        return null;
    }
};

// Compare a plain password with a hashed password
funct.comparePassword = async function (userPassword, hashedPassword) {
    try {
        return await bcrypt.compare(userPassword, hashedPassword); // Compare passwords
    } catch (err) {
        console.error('Error comparing passwords:', err);
        return false;
    }
};

// Verify if an email address is valid using regex
funct.verifyEmail = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Verify if a password meets strength criteria using regex
funct.verifyPassStrength = function (pass) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[+-=!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(pass);
};

// Verify if a username meets length and character criteria using regex
funct.verifyUsername = function (username) {
    const regex = /^[a-zA-Z0-9._-]{4,16}$/;
    return regex.test(username);
};

// Verify if both name and surname meet length and character criteria using regex
funct.verifyNameSurname = function (name, surname) {
    const regex = /^[a-zA-Z0-9-']{4,16}$/;
    return regex.test(name) && regex.test(surname);
};

// Verify if an ID is numeric using regex
funct.verifyId = function (id) {
    const regex = /^[0-9]+$/;
    return regex.test(id);
};

// Verify if a role is valid
funct.verifyRole = function (role) {
    return role === "Helper" || role === "Seeker" || role === "both";
};

// Middleware to authorize a user based on JWT token
funct.authorizeLogin = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) {
        return res.status(401).json({ success: false, msg: "No JWT token found. Please log in first!" });
    }

    try {
        const user = await jwtVerify(token, process.env.JWT_TOKEN_SECRET); // Verify token
        req.user = user.user; // Attach user information to request
        next();
    } catch (err) {
        return res.status(403).json({ success: false, msg: "JWT token expired! Please log in again." });
    }
};

// Middleware to check if a user is already logged in based on JWT token
funct.authorizeLoginForLogin = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token === null) {
        return next(); // No token means the user is not logged in; proceed to the next middleware
    }

    try {
        await jwtVerify(token, process.env.JWT_TOKEN_SECRET); // Verify token
        return res.status(200).json({ success: true, msg: "User is already logged in!" });
    } catch (err) {
        next(); // Token is invalid or expired; proceed to the next middleware
    }
};

// Verify if a category number is numeric using regex
funct.verifyCategoryNumber = function (p) {
    const regex = /^[0-9]+$/;
    return regex.test(p);
};

module.exports = funct;