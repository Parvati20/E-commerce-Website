const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productCtrl');

const { checkRequiredFields } = require('../validation/validate');

productRouter.post('/create', productController.createProduct);
productRouter.post('/create/logo-icon', productController.createLogoAndIcon);

productRouter.get('/all/logo-icon', productController.getAllLogoAndIcons);
productRouter.get('/all', productController.getAllProcuts);
productRouter.get('/all/category', productController.getAllProcutsByCategory);
productRouter.get('/all/type', productController.getAllProcutsByType);
productRouter.get('/all/price', productController.getAllProductsByPrice);

productRouter.delete('/delete', checkRequiredFields(['productId']), productController.deleteProduct);

module.exports = productRouter;