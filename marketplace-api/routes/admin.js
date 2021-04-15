const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')
const auth = require('../middleware/rootAuth')
const productController = require('../controllers/product.controller')
const commandController = require('../controllers/command.controller')
const deliveryController = require('../controllers/delivery.controller')

router.post('/',adminController.loginAdmin);
router.post('/add',  auth.verifyRootToken , adminController.addAdmin);
router.delete('/deleteAdmin/:id',auth.verifyRootToken,  adminController.deleteAdmin);
router.put('/updatePassword',auth.verifyRootToken,  adminController.updatePassword);
router.get('/logout', adminController.logOut);
router.post('/login', adminController.loginAdmin);
router.get('/loggedIn', adminController.loggedIn);
router.get('/all', auth.verifyRootToken  ,adminController.getAllAdmin);
router.post('/addads', auth.verifyRootToken, adminController.AddAds);
router.get('/allAds', adminController.AllAds); //addautontif
router.put('/hideAds/:id', adminController.hideAdd);
router.put('/showAds/:id', adminController.showAdd);
router.get('/products',  productController.Products); //addautontif
router.get('/commands', commandController.allCommand); //addautontif
router.put('/validateCommand/:id', commandController.validateCommand);
router.post('/addDelivery', deliveryController.adddeliveryman);
router.delete('/deleteDelivery/:id', deliveryController.deletedelivery);
router.get('/Deliverymen', deliveryController.getAlldelivery);


module.exports = router;