// Import required modules
import path from 'path'; // Path manipulation utilities
import express from 'express'; // Web framework for Node.js

import dotenv from 'dotenv'; // Load environment variables
import cookieParser from 'cookie-parser'; // Middleware for parsing cookies

// Import database connection function
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 5000;

// Establish a connection to the database
connectDB();

// Create an instance of the Express application
const app = express();

// Configure middleware to handle JSON, URL-encoded data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes for users, categories, and products
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => console.log(`Server is running on port : ${port}`));
