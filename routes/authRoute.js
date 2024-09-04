const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const admiMiddleware = require('../middleware/adminMiddleware')


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/addUser',admiMiddleware,authController.addUser);
router.post('/updateUser/:id',admiMiddleware,authController.updateUser);
router.post('/userProfile/:id',authMiddleware,authController.updateProfile);

router.get('/deleteUser/:id',admiMiddleware,authController.deleteUser)


router.get('/logout', (req, res) => {
    console.log('Logout request received');
    res.clearCookie('token', { path: '/' });
    res.redirect('/login');

});

module.exports = router;
