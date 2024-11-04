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

// Simplified CORS configuration - place this BEFORE other middleware
app.use(cors());
app.options('*', cors()); // enable pre-flight for all routes

// view engine setup
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple middleware to add headers
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', '*');
   res.setHeader('Access-Control-Allow-Headers', '*');
   next();
 });
 
 // Routes
 app.use('/users', userRouter);
 
 // Error handling middleware
 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ 
     success: false, 
     message: 'Internal Server Error'
   });
});

// // install view engine
// app.set('view engine', 'ejs') 
// app.set('views', path.join(__dirname, 'views'));

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));


// // Middleware to parse incoming JSON requests
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Use the CORS middleware
// app.use(cors({
//    origin: '*', // Allow requests from all origin
//    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
// }));


// // Use routes
// app.use('/users', userRouter);


module.exports= app;
