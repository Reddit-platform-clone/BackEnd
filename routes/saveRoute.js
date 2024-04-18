const express = require('express');

const router = express.Router();
const saveController = require('../controllers/saveController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/save',userAuthentication.authorizeationToken, saveController.savePostOrComment);
router.post('/api/unsave',userAuthentication.authorizeationToken, saveController.unsavePostOrComment);

module.exports = router;
