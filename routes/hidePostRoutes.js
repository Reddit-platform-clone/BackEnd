const express = require('express');
const router = express.Router();
const hidePostController = require('../controllers/hidePostController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/hidePost/hide', userAuthentication.authorizeationToken,hidePostController.hide);
module.exports = router;