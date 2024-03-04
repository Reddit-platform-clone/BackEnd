// messageRoutes.js

/**
 * @swagger
 * /api/message/compose:
 *   post:
 *     summary: Send a private message
 *     description: Send a private message to a recipient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 description: Username of the recipient
 *               message:
 *                 type: string
 *                 description: Content of the message
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message sent successfully
 */


const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js'); // Import messageController

// Define route for sending private message
router.post('/compose', messageController.compose);


module.exports = router;
