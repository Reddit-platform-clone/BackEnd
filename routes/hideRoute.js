const express = require('express');

const router = express.Router();
const hideController = require('../controllers/hideController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/hide',userAuthentication.authorizeationToken, hideController.hideLink);
router.post('/api/unhide',userAuthentication.authorizeationToken, hideController.unhideLink);
module.exports = router;
