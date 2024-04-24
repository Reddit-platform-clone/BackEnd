const express = require('express');

const router = express.Router();
const commentController = require('../controllers/commentController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/get_comment_replies', userAuthentication.authorizeationToken,commentController.getCommentReplies);
router.post('/api/comment',userAuthentication.authorizeationToken, commentController.postComment);
// router.post('/api/sendreplies',authenticateToken, commentController.postComment);
router.delete('/api/del_comment',userAuthentication.authorizeationToken, commentController.deleteComment);
router.post('/api/sendreplies', userAuthentication.authorizeationToken, (req, res) => {
    const rr = 'reply'; 
    commentController.postComment(req, res, rr); 
});
module.exports = router;
