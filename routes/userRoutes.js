const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/login', userController.logIn);
router.post('/signup', userController.singUp);
router.post('/login/forget_password', userController.logInForgetPassword);
router.post('/login/forget_username', userController.logInForgetUsername);
router.post('/login/reset_password', userController.resetPassword);
router.post('/login/verify_email', userController.verifyEmail);

router.post('/api/block_user', authMiddleware, userController.blockUser);
router.post('/api/report_user', userController.reportUser);
router.delete('/api/v1/me/friends/:username', authMiddleware, userController.removeFriend);

router.post('/r/:subreddit/api/friend', authMiddleware, userController.createRelationship);
router.post('/r/:subreddit/api/unfriend', userController.removeRelationship);

router.get('/api/v1/me/friends/:username', userController.getFriendInfo);
router.get('/api/username_available', userController.checkUsernameAvailability);

router.get('/user/:username/about', userController.getUserAbout);
router.get('/user/:username/overview', userController.getUserOverview);
router.get('/user/:username/submitted', userController.getUserSubmitted);
router.get('/user/:username/comments', userController.getUserComments);
router.get('/user/:username/upvoted', userController.getUserUpvoted);
router.get('/user/:username/downvoted', userController.getUserDownvoted);

router.get('/api/v1/me', userController.getIdentity);
router.patch('/api/v1/me/prefs', userController.getPreferences);

module.exports = router;
