const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js'); 

router.post('/api/get_post_replies', postController.getPostReplies);

module.exports = router;