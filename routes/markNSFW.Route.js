const express = require('express');

const router = express.Router();
const nsfwController = require('../controllers/markNSFWController');

router.post('/api/marknsfw', nsfwController.markNsfwModPosts);

module.exports = router;
