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

// Use the CORS middleware
// app.use(cors({
//    origin: '*', // Allow requests from all origin
// }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://aa-collab-hub-pro-85dt.vercel.app', 'http://localhost:5173'); // Allow your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow necessary headers
  next();
  });   
  

const corsOpts = {
  // origin: '*',
  origin: [
    'https://aa-collab-hub-pro-85dt.vercel.app',
    'http://localhost:5173'
  ],
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
  credentials: true,
};

app.use(cors(corsOpts))
app.options('*', cors(corsOpts)); // Preflight requests


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
