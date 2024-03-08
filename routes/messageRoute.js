
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');


router.post('/message/compose', messageController.compose);
router.get('/message/inbox', messageController.getInboxMessages);
router.get('/message/unread', messageController.getUnreadMessages);
router.delete('/message/del_msg', messageController.deleteMessage);
router.post('/api/report_msg', messageController.reportMessage);
router.get('/message/sent', messageController.getSentMessages);
router.post('/api/unread_message', messageController.markMessageUnread);
router.post('/api/read_all_messages', messageController.markAllMessagesRead);
module.exports = router;
