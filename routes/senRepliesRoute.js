const express = require('express');

const router = express.Router();
const sendRepliesController = require('../controllers/sendRepliesController');

router.post('/api/sendreplies', sendRepliesController.toggleInboxReplies);

module.exports = router;
