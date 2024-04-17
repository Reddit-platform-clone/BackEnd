const express = require('express');
const router = express.Router();
const createPostController = require('../controllers/createPostController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/createPost/create', userAuthentication.authorizeAccess ,createPostController.createPost);
module.exports = router;