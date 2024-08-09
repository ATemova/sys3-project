const multer = require('multer');
const express = require("express");
const upload = express.Router();
const DB = require('../db/dbConn.js');

// Configure Multer's storage settings
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        // Set the destination folder for uploaded files
        callBack(null, 'uploads');
    },
    filename: (req, file, callBack) => {
        // Set the filename for uploaded files to their original name
        // You might want to consider adding a unique identifier (like a timestamp) to prevent filename collisions
        callBack(null, `${file.originalname}`);
    }
});

// Initialize Multer with the configured storage
let upload_dest = multer({ storage: storage });

// Handle file upload via POST request
upload.post('/', upload_dest.single('file'), async (req, res, next) => {
    // 'single' means it expects a single file upload under the form field named 'file'
    const file = req.file; // Get the uploaded file information

    // Log the filename to the console (for debugging)
    console.log(file.filename);

    // Check if the file was uploaded successfully
    if (!file) {
        // Respond with an error message if no file was uploaded
        res.send({ status: { success: false, msg: "Could not upload" } });
    } else {
        // Respond with a success message if the file was uploaded
        res.send({ status: { success: true, msg: "File uploaded" } });
    }
});

module.exports = upload;