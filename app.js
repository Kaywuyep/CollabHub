// Import express
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./config/dbConfig");
const bodyParser = require('body-parser');
const path = require('path');


// Import routes

const userRouter = require('./routes/userRoutes');


// Initialize express instance
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// install view engine
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the CORS middleware
app.use(cors({
   origin: '*', // Allow requests from all origin
}));

// Use routes
app.use('/users', userRouter);


module.exports= app;
