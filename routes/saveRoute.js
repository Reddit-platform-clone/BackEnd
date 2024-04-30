const express = require('express');

const router = express.Router();
const saveController = require('../controllers/saveController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/save',userAuthentication.authorizeationToken, saveController.savePostOrComment);
router.post('/api/unsave',userAuthentication.authorizeationToken, saveController.unsavePostOrComment);
router.get('/api/get_save',userAuthentication.authorizeationToken, saveController.get_save);

module.exports = router;
