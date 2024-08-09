const express = require("express");
const novice = express.Router(); // Create a new Router object
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

// Get all news from the database
novice.get('/', async (req, res, next) => {
    try {
        const queryResult = await DB.allNovice(); // Fetch all news items
        res.json(queryResult); // Send the results as JSON
    } catch (err) {
        console.log(err); // Log any errors
        res.sendStatus(500); // Send a 500 status code if an error occurs
        next(); // Pass control to the next middleware
    }
});

// Get a single news item by ID
novice.get('/:id', async (req, res, next) => {
    try {
        const queryResult = await DB.oneNovica(req.params.id); // Fetch the news item by ID
        res.json(queryResult); // Send the result as JSON
    } catch (err) {
        console.log(err); // Log any errors
        res.sendStatus(500); // Send a 500 status code if an error occurs
        next(); // Pass control to the next middleware
    }
});

// Add a new news item to the database
novice.post('/', upload_dest.single('file'), async (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
        res.json({
            success: false,
            msg: "Cannot add news. You need to log in!"
        });
        return;
    }
    try {
        // Extract data from the request body
        const { title, slug, text } = req.body;
        let file = "";

        // Check if a file was uploaded
        if (req.file != null) {
            file = req.file.filename;
        }

        // Check if the necessary fields are provided
        const isAcompleteNovica = title && slug && text;
        if (isAcompleteNovica) {
            // Insert the new article into the database
            const queryResult = await DB.creteNovica(title, slug, text, file);
            if (queryResult.affectedRows) {
                console.log("New article added!");
                res.status(200).send({
                    success: true,
                    msg: "News item added"
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

module.exports = novice; // Export the Router object