const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.get('/category/best', categoryController.best);
router.get('/category/hot', categoryController.hot);
router.get('/category/new', categoryController.new);
router.get('/category/today', categoryController.today);
module.exports = router;