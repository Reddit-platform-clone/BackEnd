const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/get_post_replies', userAuthentication.authorizeationToken, postController.getPostReplies);

router.post('/api/hidePost/hide', userAuthentication.authorizeationToken, postController.hide);
// router.post('/api/hidePost/hide', postController.hide);


router.post('/createPost/create', userAuthentication.authorizeationToken, postController.createPost);

module.exports = router;
