const express = require('express');

const router = express.Router();
const followController = require('../controllers/followController');

router.post('/api/follow_post', followController.followPost);

module.exports = router;
