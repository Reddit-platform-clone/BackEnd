const express = require('express');

const router = express.Router();
const unhideController = require('../controllers/unHideController');

router.post('/api/unhide', unhideController.unhideLink);

module.exports = router;
