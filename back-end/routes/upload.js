const express = require("express");
const upload = express.Router();
const DB = require('../db/dbConn.js');

// Handle POST requests (without file upload)
upload.post('/', async (req, res, next) => {
    // Handle the POST request logic here

    // Example: You could process data from req.body here
    const data = req.body; // Assuming you're sending data in the request body

    // Log the received data to the console (for debugging)
    console.log(data);

    // Process the data or interact with the database as needed
    try {
        // Example: Assume you have a function in DB to process the data
        const result = await DB.processData(data);

        // Respond with a success message if everything went well
        res.send({ status: { success: true, msg: "Data processed", result } });
    } catch (err) {
        // Respond with an error message if something went wrong
        res.send({ status: { success: false, msg: "Could not process data", error: err.message } });
    }
});

module.exports = upload;