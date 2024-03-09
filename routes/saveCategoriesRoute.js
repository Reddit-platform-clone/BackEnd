const express = require('express');

const router = express.Router();
const savedCategoriesController = require('../controllers/savedCategoriesController');

router.get('/api/saved_categories', savedCategoriesController.getSavedCategories);

module.exports = router;
