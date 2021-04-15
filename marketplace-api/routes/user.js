const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const commandController = require('../controllers/command.controller')
const auth = require('../middleware/rootAuth')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/activateAccount/:token', userController.activateAccount);
router.get('/loggedInUser', userController.loggedInUser);
router.get('/logout', userController.logOut);
router.get('/wantToBeSeller', auth.verifyRootToken, userController.wantToBeSellerList);
router.put('/becomeSeller/:id', userController.becomeSeller);
router.get('/Allusers', userController.getALL);
router.get('/user/:id', userController.getOne);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/suspendUser/:id', userController.suspendUser);
router.put('/inSuspendUser/:id', userController.inSuspendUser);
router.post('/addproduct', productController.addProduct);
router.get('/products', productController.Products);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getProduct/:id', productController.getProductsbySeller);
router.post('/addcommand', commandController.addCommand);
router.post('/addcommand', commandController.addCommand);
router.put('/upgrade/:id', userController.upgradAccount);
// router.get('/revenue/:id', userController.revenue);



module.exports = router;