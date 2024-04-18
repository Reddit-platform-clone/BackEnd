const express = require('express');
const router = express.Router();
const unlockController = require('../controllers/unlockController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/unlock', userAuthentication.authorizeationToken,unlockController.unlockItem);

module.exports = router;
