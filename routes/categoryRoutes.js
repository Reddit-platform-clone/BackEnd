const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');


router.get('/api/category/best', userAuthentication.authorizeAccess ,categoryController.best);
router.get('/api/category/hot', userAuthentication.authorizeAccess,categoryController.hot);
router.get('/api/category/new', userAuthentication.authorizeAccess,categoryController.new);
router.get('/api/category/today', userAuthentication.authorizeAccess ,categoryController.today);
module.exports = router;