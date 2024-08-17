const express = require('express');
const session = require('express-session');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8229;

app.use(cookieParser());

// Session configuration
let sess = {
    secret: process.env.SESSION_SECRET || 'our little secret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        proxy: process.env.NODE_ENV === 'production', // Required for secure cookies over HTTPS behind proxy
    }
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust the first proxy when behind a reverse proxy like Nginx or Heroku
}

app.use(session(sess));

// CORS configuration
app.use(cors({
 methods:["GET", "POST"],
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const novice = require('./routes/novice');
const users = require('./routes/users');
const upload = require('./routes/upload');

app.use('/novice', novice);
app.use('/users', users);
app.use('/uploadFile', upload);

// Static files configuration
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html")); 
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
