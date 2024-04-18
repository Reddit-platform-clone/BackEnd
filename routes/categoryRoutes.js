const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const categoryController = require('../controllers/categoryController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');


router.get('/api/category/best', userAuthentication.authorizeationToken ,categoryController.best);
router.get('/api/category/hot', userAuthentication.authorizeationToken,categoryController.hot);
router.get('/api/category/new', userAuthentication.authorizeationToken,categoryController.new);
router.get('/api/category/today', userAuthentication.authorizeationToken ,categoryController.today);
module.exports = router;