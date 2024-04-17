const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/get_post_replies', userAuthentication.authorizeAccess,postController.getPostReplies);

module.exports = router;
