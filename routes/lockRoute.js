const express = require('express');

const router = express.Router();
const lockController = require('../controllers/lockController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');


router.post('/api/lock', userAuthentication.authorizeationToken,lockController.lockPost);
router.post('/api/unlock', userAuthentication.authorizeationToken,lockController.unlockPost);
module.exports = router;
