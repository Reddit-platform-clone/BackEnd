/**
 * @swagger
 * /api/message/compose:
 *   post:
 *     summary: Send a private message
 *     description: Send a private message to a recipient
 *     parameters:
 *       - in: body
 *         name: message
 *         description: Message details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             recipient:
 *               type: string
 *               description: Username of the recipient.
 *             from:
 *               type: string
 *               description: Username of the current user sending the message.
 *             title:
 *               type: string
 *               description: Title of the message.
 *             content:
 *               type: string
 *               description: Content of the message.
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
 *               from:
 *                 type: string
 *                 description: Username of the current user sending the message.
 *               title:
 *                 type: string
 *                 description: Title of the message.
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
 *                   description: Indicates whether the message was sent successfully.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A success message indicating the status of the operation.
 *                   example: Message sent successfully
 */


const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');

// Define route for sending private message
router.post('/compose', messageController.compose);


module.exports = router;
