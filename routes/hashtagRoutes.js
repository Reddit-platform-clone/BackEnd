const express = require('express');
const router = express.Router();
const hashtagController = require('../controllers/hashtagController.js');


router.post('/hashtag/create', hashtagController.create);
module.exports = router;