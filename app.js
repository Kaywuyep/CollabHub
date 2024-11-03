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
// Add headers before the routes are defined
app.use(function (req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', 'false');

   // Pass to next layer of middleware
   next();
});

// Use the CORS middleware
app.use(cors({
   origin: '*', // Allow requests from all origin
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
   credentials: false // disable if you're using cookies/sessions
}));

// Use routes
app.use('/users', userRouter);


module.exports= app;
