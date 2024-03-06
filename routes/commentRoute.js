const express = require('express');

const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/api/get_comment_replies', commentController.getCommentReplies);
router.post('/api/comment', commentController.postComment);
router.delete('/api/del_comment', commentController.deleteComment);
module.exports = router;
