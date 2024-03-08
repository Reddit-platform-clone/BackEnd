const express = require('express');

const router = express.Router();
const nsfwController = require('../controllers/nsfwController');

router.post('/api/marknsfwmodposts', nsfwController.markNsfwModPosts);

module.exports = router;
