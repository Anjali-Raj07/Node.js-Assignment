const express = require('express');
const viewController= require('../controllers/viewController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();


router.get('/register', viewController.renderRegisterPage);
router.get('/login', viewController.renderLoginPage);
router.get('/adminHome',authMiddleware,viewController.renderAdminPage);
router.get('/userHome',viewController.renderUserPage);
router.get('/addUser',viewController.renderAddUserPage)

module.exports = router;
