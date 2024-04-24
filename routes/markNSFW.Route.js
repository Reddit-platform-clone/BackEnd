const express = require('express');

const router = express.Router();
const nsfwController = require('../controllers/markNSFWController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');


router.post('/api/marknsfw', userAuthentication.authorizeationToken,nsfwController.markNsfwModPosts);

module.exports = router;
