const express = require('express');
const router = express.Router();
const searchByController = require('../controllers/searchByController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js')
const userAuthentication = require('../middleware/userAuthMiddleware.js')

router.get('/api/searchBy/users', userAuthentication.authorizeationToken,searchByController.users);
router.get('/api/searchBy/posts', userAuthentication.authorizeationToken,searchByController.posts);
router.get('/api/searchBy/comments', userAuthentication.authorizeationToken,searchByController.comments);
router.get('/api/searchBy/communities', userAuthentication.authorizeationToken,searchByController.communities);
router.get('/api/searchBy/hashtags', userAuthentication.authorizeationToken,searchByController.hashtags);
module.exports = router;