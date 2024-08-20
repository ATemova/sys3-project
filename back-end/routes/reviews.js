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
        callBack(null, 'uploads'); // Set the directory for file uploads
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
        res.status(200).json({ success: true, msg: "Reviews fetched successfully.", reviews: queryResult });
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

// Get all books
reviews.get('/all-books', async (req, res) => {
    try {
        const queryResult = await DB.allBooks();
        res.status(200).json({ success: true, msg: "Books fetched successfully.", books: queryResult });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

// Get a single review by ID
reviews.get('/:id', async (req, res) => {
    try {
        const queryResult = await DB.oneReview(req.params.id);
        if (queryResult.length > 0) {
            res.status(200).json({ success: true, review: queryResult[0] });
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
        const { rating, comment, postId, userId, boktorateid, user } = req.body;
        // Check if the user exists and get their ID
        const userr = await DB.AuthUser(user);
        const user_id = userr[0].id;

        // Check if the user has already submitted a review for this post
        const existingReview = await DB.getReviewByUserAndPost(boktorateid, user_id);

        let queryResult;
        if (existingReview.length > 0) {
            // Update existing review
            queryResult = await DB.updateReview(user_id, boktorateid, rating, comment);
        } else {
            // Create new review
            queryResult = await DB.createReview(user_id, boktorateid, rating, comment);
        }

        if (queryResult.affectedRows) {
            res.status(200).json({ success: true, msg: "Review saved successfully." });
        } else {
            res.status(500).json({ success: false, msg: "Failed to save review." });
        }
    } catch (err) {
        console.error('Error saving review:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

// Update a review by ID
reviews.put('/:id', authenticateToken, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { rating, comment } = req.body;
        const userId = req.user.id; // Use authenticated user's ID

        if (!rating || !comment) {
            return res.status(400).json({ success: false, msg: "Rating and comment are required." });
        }

        const queryResult = await DB.updateReviewById(reviewId, userId, rating, comment);

        if (queryResult.affectedRows) {
            res.status(200).json({ success: true, msg: "Review updated successfully." });
        } else {
            res.status(404).json({ success: false, msg: "Review not found or you are not authorized to update this review." });
        }
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

// Delete a review by ID
reviews.delete('/:id', async (req, res) => {
    try {
        const reviewId = req.params.id;

        const queryResult = await DB.deleteCommentByUserId(reviewId);

        if (queryResult.affectedRows) {
            res.status(200).json({ success: true, msg: "Review deleted successfully." });
        } else {
            res.status(404).json({ success: false, msg: "Review not found or you are not authorized to delete this review." });
        }
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ success: false, msg: "Internal server error." });
    }
});

module.exports = reviews;