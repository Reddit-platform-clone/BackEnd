const express = require('express');

const router = express.Router();
const suggestedSortController = require('../controllers/suggestedSortController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/set_suggested_sort', userAuthentication.authorizeAccess,suggestedSortController.setSuggestedSort);

module.exports = router;
