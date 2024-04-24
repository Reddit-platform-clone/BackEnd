const express = require('express');
const router = express.Router();
const createPostController = require('../controllers/createPostController.js');


router.post('/api/createPost/create', createPostController.createPost);
module.exports = router;