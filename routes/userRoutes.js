const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/userAuthMiddleware.js');

router.post('/api/login', userController.logIn);
router.post('/api/signup', userController.singUp);
router.post('/api/verifyToken', userController.verifyToken);
router.post('/api/login/forget_password', userController.logInForgetPassword);
router.patch('/api/login/reset_password/:token', userController.resetPassword);
router.post('/api/login/forget_username', userController.logInForgetUsername);
router.patch('/api/login/reset_username/:token', userController.resetUsername);

router.post('/api/block_user', authMiddleware.authorizeationToken, userController.blockUser);
router.post('/api/report_user', authMiddleware.authorizeationToken, userController.reportUser);
router.delete('/api/v1/me/friends/:username', authMiddleware.authorizeationToken, userController.removeFriend);

router.get('/api/v1/me/friends/:username', authMiddleware.authorizeationToken, userController.getFriendInfo);
router.get('/api/username_available/:username', userController.checkUsernameAvailability);

router.get('/api/user/:username/about', authMiddleware.authorizeationToken, userController.getUserAbout);
router.get('/api/user/:username/overview', authMiddleware.authorizeationToken, userController.getUserOverview);
router.get('/api/user/:username/submitted', authMiddleware.authorizeationToken, userController.getUserSubmitted);
router.get('/api/user/:username/comments', authMiddleware.authorizeationToken, userController.getUserComments);
router.get('/api/user/:username/upvoted', authMiddleware.authorizeationToken, userController.getUserUpvoted);
router.get('/api/user/:username/downvoted', authMiddleware.authorizeationToken, userController.getUserDownvoted);

router.get('/api/v1/me', authMiddleware.authorizeationToken, userController.getUserIdentity);
router.get('/api/v1/me/prefs', authMiddleware.authorizeationToken, userController.getPrefs);
router.patch('/api/v1/me/prefs', authMiddleware.authorizeationToken, userController.updatePrefs);

router.post('/api/:username/savePost', userController.savePost);
router.post('/api/:username/unSavePost', userController.unSavePost);
router.post('/api/:username/viewPost', authMiddleware.authorizeationToken, userController.viewPost);

router.get('/api/:username/recentlyViewedPosts',authMiddleware.authorizeationToken, userController.getRecentlyViewedPosts);


module.exports = router;
