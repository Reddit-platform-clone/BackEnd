const express = require('express');
const router = express.Router();
const createPostController = require('../controllers/createPostController.js');
const authMiddleware = require('../middleware/userAuthMiddleware.js');


router.post('/createPost/create', authMiddleware.authorizeationToken, createPostController.createPost);
module.exports = router;