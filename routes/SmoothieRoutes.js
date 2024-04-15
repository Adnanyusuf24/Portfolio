const { Router } = require('express');
const SmoothieController = require('../controllers/SmoothieController');
const EcommerceController = require('../controllers/E-commerceController');

const router = Router();

router.get('/SmoothieRecipeFinder/signup', SmoothieController.signup_get);
router.post('/SmoothieRecipeFinder/signup', SmoothieController.signup_post);
router.get('/SmoothieRecipeFinder/login', SmoothieController.login_get);
router.post('/SmoothieRecipeFinder/login', SmoothieController.login_post);
router.get('/SmoothieRecipeFinder/logout', SmoothieController.logout_get);
router.get('/SmoothieRecipeFinder/smoothies', SmoothieController.smoothies_get);
router.get('/SmoothieRecipeFinder', SmoothieController.home_get);

module.exports = router;