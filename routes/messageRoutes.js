//swagger for send message
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
// swagger for All message
/**
 * @swagger
 * /api/message/inbox:
 *   get:
 *     summary: Get inbox messages
 *     description: Retrieve messages from the inbox of the current user
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of messages per page (default: 10)
 *     responses:
 *       '200':
 *         description: Inbox messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   messageId:
 *                     type: string
 *                     description: Unique identifier of the message
 *                   sender:
 *                     type: string
 *                     description: Username of the sender
 *                   title:
 *                     type: string
 *                     description: Title of the message
 *                   content:
 *                     type: string
 *                     description: Content of the message
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp indicating when the message was created
 */


const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');

// Define routes
router.post('/compose', messageController.compose);
router.get('/inbox', messageController.getInboxMessages);

module.exports = router;
