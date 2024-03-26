const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController.js');

router.post('/message/compose', messageController.compose);
router.get('/message/inbox', messageController.getInboxMessages);
router.get('/message/unread', messageController.getUnreadMessages);
router.delete('/message/del_msg', messageController.deleteMessage);
module.exports = router;