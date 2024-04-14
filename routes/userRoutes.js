const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/userAuthMiddleware.js');

router.post('/login', userController.logIn);
router.post('/signup', userController.singUp);
router.post('/verifyToken', userController.verifyToken);
router.post('/login/forget_password', userController.logInForgetPassword);
router.patch('/login/reset_password/:token', userController.resetPassword);

router.post('/api/block_user', authMiddleware.authorizeationToken, userController.blockUser);
router.post('/api/report_user', authMiddleware.authorizeationToken, userController.reportUser);
router.delete('/api/v1/me/friends/:username', authMiddleware.authorizeationToken, userController.removeFriend);

router.post('/r/:subreddit/api/friend', userController.createRelationship);
router.post('/r/:subreddit/api/unfriend', userController.removeRelationship);

router.get('/api/v1/me/friends/:username', authMiddleware.authorizeationToken, userController.getFriendInfo);
router.get('/api/username_available/:username', userController.checkUsernameAvailability);

router.get('/user/:username/about', authMiddleware.authorizeationToken, userController.getUserAbout);
router.get('/user/:username/overview', userController.getUserOverview);
router.get('/user/:username/submitted', userController.getUserSubmitted);
router.get('/user/:username/comments', userController.getUserComments);
router.get('/user/:username/upvoted', userController.getUserUpvoted);
router.get('/user/:username/downvoted', userController.getUserDownvoted);

router.get('/api/v1/me', authMiddleware.authorizeationToken, userController.getUserIdentity);
router.get('/api/v1/me/prefs', authMiddleware.authorizeationToken, userController.getPrefs);
router.patch('/api/v1/me/prefs', authMiddleware.authorizeationToken, userController.updatePrefs);

router.post('/api/:username/savePost', userController.savePost);
router.post('/api/:username/unSavePost', userController.unSavePost);

module.exports = router;
