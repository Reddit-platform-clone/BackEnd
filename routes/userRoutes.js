const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/login', userController.logIn);
router.post('/signup', userController.singUp);
router.post('/login/forget_password', userController.logInForgetPassword);
router.post('/login/forget_username', userController.logInForgetUsername);
router.post('/login/reset_password', userController.resetPassword);
router.post('/login/verify_email', userController.verifyEmail);

router.post('/api/block_user', userController.blockUser);
router.post('/api/report_user', userController.reportUser);
router.delete('/api/v1/me/friends/:username', userController.removeFriend);

router.post('/r/:subreddit/api/friend', userController.createRelationship);
router.post('/r/:subreddit/api/unfriend', userController.removeRelationship);

router.get('/api/v1/me/friends/:username', userController.getFriendInfo);
router.get('/api/username_available', userController.checkUsernameAvailability);

module.exports = router;
