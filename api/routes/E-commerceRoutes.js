const { Router } = require('express');
const EcommerceController = require('../controllers/E-commerceController');

const router = Router();

router.get('/Ecommerce/', EcommerceController.home_get);
router.get('/Ecommerce/shop', EcommerceController.shop_get);
router.get('/Ecommerce/about', EcommerceController.about_get);

router.get('/Ecommerce/contact', EcommerceController.contact_get);
router.post('/Ecommerce/contact', EcommerceController.contact_post);

router.get('/Ecommerce/details/:productId', EcommerceController.details_get);

module.exports = router;