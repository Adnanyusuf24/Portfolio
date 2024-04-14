//const dbURI = 'mongodb+srv://RecipeFinder:Test1234cluster0.yl9aluj.mongodb.net/?retryWrites=true&w=majority';
const express = require('express');
const mongoose = require('mongoose');
const SmoothieRoutes = require('./routes/SmoothieRoutes');
const portfolioRoutes = require('./routes/PortfolioRoutes');
const EcommerceRoutes = require('./routes/E-commerceRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/SmoothieMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Mule:Test1234@cluster0.xnqqeoh.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.use(SmoothieRoutes);
// app.get('/', (req, res) => res.render('/'));
app.use(portfolioRoutes);
app.use(EcommerceRoutes);
// app.use(portfolioRoutes);