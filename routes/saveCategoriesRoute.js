const express = require('express');

const router = express.Router();
const savedCategoriesController = require('../controllers/savedCategoriesController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.get('/api/saved_categories', userAuthentication.authorizeationToken,savedCategoriesController.getSavedCategories);

module.exports = router;
