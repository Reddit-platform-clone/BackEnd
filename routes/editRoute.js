const express = require('express');

const router = express.Router();
const editController = require('../controllers/editController');
const userAuthentication = require('../middleware/userAuthMiddleware');

router.post('/api/editusertext', userAuthentication.authorizeAccess, editController.editUserText);

module.exports = router;
