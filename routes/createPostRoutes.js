const express = require('express');
const router = express.Router();
const createPostController = require('../controllers/createPostController.js');


router.post('/createPost/create', createPostController.createPost);
module.exports = router;