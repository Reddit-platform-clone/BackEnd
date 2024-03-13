const express = require('express');

const router = express.Router();
const suggestedSortController = require('../controllers/suggestedSortController');

router.post('/api/set_suggested_sort', suggestedSortController.setSuggestedSort);

module.exports = router;
