const express = require('express');
const router = express.Router();
const listCommunityController = require('../controllers/listCommunityController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.get('/api/community/list', userAuthentication.authorizeAccess ,listCommunityController.listCommunities);

module.exports = router;