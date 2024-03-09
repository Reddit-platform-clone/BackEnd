const express = require('express');
const router = express.Router();
const unlockController = require('../controllers/unlockController');

router.post('/api/unlock', unlockController.unlockItem);

module.exports = router;
