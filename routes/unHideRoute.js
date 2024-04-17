const express = require('express');

const router = express.Router();
const unhideController = require('../controllers/unHideController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/unhide', userAuthentication.authorizeAccess,unhideController.unhideLink);

module.exports = router;
