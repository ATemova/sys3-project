const express = require('express');
const session = require('express-session');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8229; // Default port is 8229 if not specified in environment variables

app.use(cookieParser()); // Middleware to parse cookies

// Session configuration
let sess = {
    secret: process.env.SESSION_SECRET || 'our little secret', // Session secret key for signing cookies
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save new sessions even if they are not modified
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (only sent over HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site cookies in production, 'lax' otherwise
        httpOnly: true, // Prevent JavaScript from accessing session cookies
        proxy: process.env.NODE_ENV === 'production', // Set to true if behind a proxy (e.g., Heroku)
    }
};

app.use(session(sess)); // Apply session middleware

// CORS configuration
app.use(cors({
    methods: ["GET", "POST", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    origin: ['http://localhost:3000', 'http://localhost:3001'] // Allowed origins (adjust for production)
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// Routes
const reviews = require('./routes/reviews'); // Import reviews routes
const users = require('./routes/users'); // Import users routes
const upload = require('./routes/upload'); // Import file upload routes

app.use('/reviews', reviews); // Mount reviews routes at /reviews
app.use('/users', users); // Mount users routes at /users
app.use('/uploadFile', upload); // Mount file upload routes at /uploadFile

// Static files configuration
app.use(express.static(path.join(__dirname, "build"))); // Serve static files from "build" directory
app.use(express.static(path.join(__dirname, "uploads"))); // Serve uploaded files from "uploads" directory

// Serve the main HTML file for the React application
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html")); 
});

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));