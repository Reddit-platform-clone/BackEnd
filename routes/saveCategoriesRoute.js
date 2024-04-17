const express = require('express');

const router = express.Router();
const savedCategoriesController = require('../controllers/savedCategoriesController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.get('/api/saved_categories', userAuthentication.authorizeAccess,savedCategoriesController.getSavedCategories);

module.exports = router;
