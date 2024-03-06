const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

router.post('/api/get_post_replies', postController.getPostReplies);
router.post('/api/comment', commentController.postComment);

module.exports = router;
