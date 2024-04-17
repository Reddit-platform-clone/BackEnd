const express = require('express');
const router = express.Router();
const searchByController = require('../controllers/searchByController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js')

router.get('/api/searchBy/users', userAuthentication.authorizeAccess,searchByController.users);
router.get('/api/searchBy/posts', userAuthentication.authorizeAccess,searchByController.posts);
router.get('/api/searchBy/comments', userAuthentication.authorizeAccess,searchByController.comments);
router.get('/api/searchBy/communities', userAuthentication.authorizeAccess,searchByController.communities);
router.get('/api/searchBy/hashtags', userAuthentication.authorizeAccess,searchByController.hashtags);
module.exports = router;