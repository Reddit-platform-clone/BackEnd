const express = require('express');

const router = express.Router();
const lockController = require('../controllers/lockController');

router.post('/api/lock', lockController.lockPost);

module.exports = router;
