const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');
router.post('/api/get_comment_replies', commentController.getCommentReplies);

module.exports = router;
