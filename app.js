const express = require('express');
const mongoose = require('mongoose');
const SmoothieRoutes = require('./routes/SmoothieRoutes');
const portfolioRoutes = require('./routes/PortfolioRoutes');
const EcommerceRoutes = require('./routes/E-commerceRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/SmoothieMiddleware');

const app = express();

// Load environment variables
require('dotenv').config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Listen only when the database connection is successful
    const PORT = process.env.PORT || 3000; // Vercel will provide the PORT via environment variable
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('Database connection error:', err));

// routes
app.get('*', checkUser);
app.use(SmoothieRoutes);
app.use(portfolioRoutes);
app.use(EcommerceRoutes);
