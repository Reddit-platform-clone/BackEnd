const express = require('express');
const router = express.Router();
const listCommunityController = require('../controllers/listCommunityController.js');

router.get('/community/list', listCommunityController.listCommunities);

module.exports = router;