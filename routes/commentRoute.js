const express = require('express');

const router = express.Router();
const commentController = require('../controllers/commentController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/get_comment_replies', userAuthentication.authorizeAccess,commentController.getCommentReplies);
router.post('/api/comment',userAuthentication.authorizeAccess, commentController.postComment);
// router.post('/api/sendreplies',authenticateToken, commentController.postComment);
router.delete('/api/del_comment',userAuthentication.authorizeAccess, commentController.deleteComment);
router.post('/api/sendreplies', userAuthentication.authorizeAccess, (req, res) => {
    const rr = 'reply'; 
    commentController.postComment(req, res, rr); 
});
module.exports = router;
