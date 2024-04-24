const express = require('express');
const router = express.Router();
const unmarkNSFWController = require('../controllers/unmarkNSFWController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/unmarknsfw', userAuthentication.authorizeationToken,unmarkNSFWController.unmarkNSFW);

module.exports = router;
