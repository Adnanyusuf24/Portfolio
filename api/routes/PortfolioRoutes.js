const { Router } = require('express');
const PorfolioController = require('../controllers/PortfolioController');

const router = Router();

router.get('/', PorfolioController.home_get);

module.exports=router; 