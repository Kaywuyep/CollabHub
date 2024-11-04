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

// // Use the CORS middleware
// app.use(cors({
//    origin: '*', // Allow requests from all origin
// }));

// CORS Configuration
const corsOptions = {
   origin: [
       'https://aa-collab-hub-pro-85dt.vercel.app',  // Your Vercel frontend
       'http://localhost:3000',                       // Local development
       'http://localhost:5173'                        // Vite default port
   ],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
   allowedHeaders: [
       'Origin',
       'X-Requested-With',
       'Content-Type',
       'Accept',
       'Authorization'
   ],
   credentials: true,
   maxAge: 86400 // 24 hours
};
// Apply CORS middleware with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "https://aa-collab-hub-pro-85dt.vercel.app");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});

// install view engine
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ 
     success: false, 
     message: 'Internal Server Error'
   });
});


module.exports= app;
