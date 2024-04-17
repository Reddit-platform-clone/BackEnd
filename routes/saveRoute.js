const express = require('express');

const router = express.Router();
const saveController = require('../controllers/saveController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/save',userAuthentication.authorizeAccess, saveController.savePostOrComment);
router.post('/api/unsave',userAuthentication.authorizeAccess, saveController.unsavePostOrComment);

module.exports = router;
