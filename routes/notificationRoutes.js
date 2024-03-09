
const express = require('express');
const router = express.Router();
const notificationContoller = require('../controllers/notificationController.js');


router.get('/live/thread', notificationContoller.getThread);
router.post('/api/live/create', notificationContoller.getCreate);
router.post('/api/live/thread/edit', notificationContoller.getEdit);
router.post('/api/live/thread/update', notificationContoller.getUpdate);
router.post('/api/live/thread/close_thread', notificationContoller.getCloseThread);
module.exports = router;