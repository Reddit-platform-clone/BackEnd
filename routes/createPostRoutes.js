const express = require('express');
const router = express.Router();
const createPostController = require('../controllers/createPostController.js');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/api/createPost/create',authenticateToken, createPostController.createPost);
module.exports = router;