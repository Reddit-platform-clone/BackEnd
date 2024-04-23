const express = require('express');

const router = express.Router();
const messageController = require('../controllers/liveMessagesController.js');

router.post('/api/message/chat', messageController.compose);
router.get('/api/message/converstaion', messageController.getInboxMessages);
router.get('/api/message/unread', messageController.getUnreadMessages);
router.delete('/api/message/del_livmsg', messageController.deleteMessage);
module.exports = router;
