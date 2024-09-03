const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/addUser',authController.addUser);
router.post('/updateUser/:id',authController.updateUser);
router.post('/userProfile/:id',authController.updateUser);

router.get('/deleteUser/:id',authController.deleteUser)


router.get('/logout', (req, res) => {
    console.log('Logout request received');
    res.clearCookie('token', { path: '/' });
    res.redirect('/login');

});

module.exports = router;
