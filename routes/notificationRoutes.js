
const express = require('express');
const router = express.Router();
const notificationContoller = require('../controllers/notificationController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.get('/api/live/thread', userAuthentication.authorizeationToken,notificationContoller.getThread);
router.post('/api/live/create', userAuthentication.authorizeationToken,notificationContoller.getCreate);
router.post('/api/live/thread/edit', userAuthentication.authorizeationToken,notificationContoller.getEdit);
router.post('/api/live/thread/update', userAuthentication.authorizeationToken,notificationContoller.getUpdate);
router.post('/api/live/thread/close_thread', userAuthentication.authorizeationToken,notificationContoller.getCloseThread);
module.exports = router;