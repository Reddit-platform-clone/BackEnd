const express = require('express');

const router = express.Router();
const hideController = require('../controllers/hideController');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/api/hide',authenticateToken, hideController.hideLink);
router.post('/api/unhide',authenticateToken, hideController.unhideLink);
module.exports = router;
