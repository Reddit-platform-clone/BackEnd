const express = require('express');

const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/api/get_comment_replies', commentController.getCommentReplies);
router.post('/api/comment',authenticateToken, commentController.postComment);
router.delete('/api/del_comment',authenticateToken, commentController.deleteComment);
module.exports = router;
