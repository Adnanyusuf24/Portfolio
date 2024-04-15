const express = require('express');
const mongoose = require('mongoose');
const SmoothieRoutes = require('../../routes/SmoothieRoutes');  // Moved up two directories
const portfolioRoutes = require('../../routes/PortfolioRoutes');  // Moved up two directories
const EcommerceRoutes = require('../../routes/E-commerceRoutes');  // Moved up two directories
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('../../middleware/SmoothieMiddleware');  // Moved up two directories

const app = express();

// Load environment variables
require('dotenv').config({ path: '../.env' });  // Adjust path to the .env file if needed

// middleware
app.use(express.static('../public'));  // Adjust path to static files
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
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

// routes
app.get('*', checkUser);
app.use(SmoothieRoutes);
app.use(portfolioRoutes);
app.use(EcommerceRoutes);
