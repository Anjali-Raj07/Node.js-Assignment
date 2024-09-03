const express = require('express');
const viewController= require('../controllers/viewController');
const authMiddleware = require('../middleware/authMiddleware');
const admiMiddleware = require('../middleware/adminMiddleware')

const router = express.Router();


router.get('/register', viewController.renderRegisterPage);
router.get('/login', viewController.renderLoginPage);
router.get('/adminHome',admiMiddleware,viewController.renderAdminPage);
router.get('/userHome',authMiddleware,viewController.renderUserPage);
router.get('/addUser',viewController.renderAddUserPage);
router.get('/updateUser/:id',admiMiddleware,viewController.renderUpdateUserPage)
router.get('/userProfile/:id',authMiddleware,viewController.renderUserProfile)

module.exports = router;
