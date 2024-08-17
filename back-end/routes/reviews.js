const express = require("express");
const reviews = express.Router(); // Create a new Router object
const DB = require('../db/dbConn.js'); // Import the database connection module
const multer = require("multer"); // Import multer for handling file uploads

// Configure multer storage settings
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads'); // Specify the uploads folder as the destination
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`); // Use the original file name
    }
});

// Initialize multer with the storage settings
let upload_dest = multer({ storage: storage });

// Get all reviews from the database
reviews.get('/', async (req, res, next) => {
    try {
        const queryResult = await DB.allReviews(); // Fetch all reviews
        res.json(queryResult); // Send the results as JSON
    } catch (err) {
        console.log(err); // Log any errors
        res.sendStatus(500); // Send a 500 status code if an error occurs
        next(); // Pass control to the next middleware
    }
});

// Get a single review by ID
reviews.get('/:id', async (req, res, next) => {
    try {
        const queryResult = await DB.oneReview(req.params.id); // Fetch the review by ID
        res.json(queryResult); // Send the result as JSON
    } catch (err) {
        console.log(err); // Log any errors
        res.sendStatus(500); // Send a 500 status code if an error occurs
        next(); // Pass control to the next middleware
    }
});

// Add a new review to the database
reviews.post('/', upload_dest.single('file'), async (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
        res.json({
            success: false,
            msg: "Cannot add review. You need to log in!"
        });
        return;
    }
    try {
        // Extract data from the request body
        const { rating, comment } = req.body;
        let file = "";

        // Check if a file was uploaded
        if (req.file != null) {
            file = req.file.filename;
        }

        // Check if the necessary fields are provided
        const isAcompleteReview = rating && comment;
        if (isAcompleteReview) {
            // Insert the new review into the database
            const queryResult = await DB.createReview(rating, comment, file);
            if (queryResult.affectedRows) {
                console.log("New review added!");
                res.status(200).send({
                    success: true,
                    msg: "Review added"
                });
            }
        } else {
            console.log("A field is empty!");
            res.status(200).send({
                success: false,
                msg: "Input item missing"
            });
        }
        res.end();
    } catch (err) {
        console.log(err); // Log any errors
        res.sendStatus(500); // Send a 500 status code if an error occurs
        next(); // Pass control to the next middleware
    }
});

module.exports = reviews; // Export the Router object