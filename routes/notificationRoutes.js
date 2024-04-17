
const express = require('express');
const router = express.Router();
const notificationContoller = require('../controllers/notificationController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.get('/api/live/thread', userAuthentication.authorizeAccess,notificationContoller.getThread);
router.post('/api/live/create', userAuthentication.authorizeAccess,notificationContoller.getCreate);
router.post('/api/live/thread/edit', userAuthentication.authorizeAccess,notificationContoller.getEdit);
router.post('/api/live/thread/update', userAuthentication.authorizeAccess,notificationContoller.getUpdate);
router.post('/api/live/thread/close_thread', userAuthentication.authorizeAccess,notificationContoller.getCloseThread);
module.exports = router;