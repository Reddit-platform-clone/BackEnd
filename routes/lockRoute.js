const express = require('express');

const router = express.Router();
const lockController = require('../controllers/lockController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/lock', userAuthentication.authorizeAccess,lockController.lockPost);

module.exports = router;
