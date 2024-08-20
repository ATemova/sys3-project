const express = require("express");
const reviews = express.Router();
const DB = require('../db/dbConn.js');
const multer = require("multer");
const jwt = require('jsonwebtoken');

// Ensure JWT secret key is set
const JWT_SECRET = process.env.JWT_TOKEN_SECRET;
if (!JWT_SECRET) {
    console.error('JWT secret key is missing');
    process.exit(1);
}

// Configure multer storage settings
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, `${Date.now()}_${file.originalname}`); // Prepend timestamp to avoid file name conflicts
    }
});

// Initialize multer with the storage settings
const upload_dest = multer({ storage: storage });

// Middleware to verify JWT and extract user info
function authenticateToken(req, res, next) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(401).json({ success: false, message: "No token provided!" });
    }

    jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Failed to authenticate token." });
        }
        req.user = decoded.user; // Attach user information to request object
        next();
    });
}

// Get all reviews from the database
reviews.get('/', async (req, res) => {
    try {
        const queryResult = await DB.allReviews();
        res.status(200).json({success: true, msg:"yers", comments: queryResult});
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

// Get a single review by ID
reviews.get('/:id', async (req, res) => {
    try {
        const queryResult = await DB.oneReview(req.params.id);
        if (queryResult.length > 0) {
            res.status(200).json(queryResult[0]);
        } else {
            res.status(404).json({ success: false, msg: "Review not found." });
        }
    } catch (err) {
        console.error('Error fetching review:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

// Add or update a review
reviews.post('/', async (req, res) => {
    try {
        const { rating, comment, userId, user } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ success: false, msg: "Rating and comment are required." });
        }
        console.log(req.body)
        const useridfromdataabse = await DB.AuthUser(user)

        const user_id = useridfromdataabse[0].id

        // Check if the user has already submitted a review
        const existingReview = await DB.oneReview(userId);
        let queryResult;

        if (existingReview.length > 0) {
            queryResult = await DB.updateReview(user_id, rating, comment);
        } else {
            queryResult = await DB.createReview(user_id, rating, comment);
        }

        if (queryResult.affectedRows) {
            console.log("Review successfully saved!");
            res.status(200).json({ success: true, msg: "Review saved successfully." });
        } else {
            console.log("Failed to save the review.");
            res.status(500).json({ success: false, msg: "Failed to save review." });
        }
    } catch (err) {
        console.error('Error saving review:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

module.exports = reviews;