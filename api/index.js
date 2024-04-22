const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Adjusting paths using the path module for clarity and reliability
const SmoothieRoutes = require(path.join(__dirname, './routes/SmoothieRoutes'));
const portfolioRoutes = require(path.join(__dirname, './routes/PortfolioRoutes'));
const EcommerceRoutes = require(path.join(__dirname, './routes/E-commerceRoutes'));
const { requireAuth, checkUser } = require(path.join(__dirname, './middleware/SmoothieMiddleware'));
const aimTrainerRoutes = require(path.join(__dirname, './routes/aim-trainer'));
const tictactoeRoutes = require(path.join(__dirname, './routes/tictactoe'));

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });  // Adjust path to the .env file

// Middleware
app.use(express.static(path.join(__dirname, '../public')));  // Adjust path to static files
app.use(express.json());
app.use(cookieParser());

// View engine
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // This sets the views directory to the 'views' folder at the root of your project

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Conditionally start server based on environment
    if (process.env.NODE_ENV !== 'production') {
        const PORT = process.env.PORT || 3000; // Use PORT environment variable
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
  })
  .catch((err) => console.log('Database connection error:', err));

// Routes
app.get('*', checkUser);
app.use(SmoothieRoutes);
app.use(portfolioRoutes);
app.use(EcommerceRoutes);
app.use(aimTrainerRoutes);
app.use(tictactoeRoutes);