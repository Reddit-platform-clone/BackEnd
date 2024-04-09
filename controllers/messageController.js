/* eslint-disable no-unused-vars */
const { request } = require('express');
const messageService = require('../services/messageService');
const jwt = require('jsonwebtoken');
const messageController = {
  compose: async (req, res) => {
    try {
  
      const username = req.user;
      

     
      const { recipient, from, title, content } = req.body;

      const result = await messageService.composeMessage({ username, recipient, from, title, content });

      if (result.success) {
          res.status(200).json({ message: result.message });
      } else {
          res.status(400).json({ errors: result.errors, message: result.error });
      }
  } catch (error) {
      console.error('Error composing message:', error);
      res.status(500).json({ error: 'Failed to send message.' });
  }
  },
  

  getInboxMessages: async (req, res) => {
    try {
      const username = req.user;
      const inboxMessages = await messageService.getInboxMessages(username);

      
      res.status(200).json(inboxMessages);
    } catch (error) {
      
      console.error('Failed to retrieve inbox messages:', error);
      res.status(500).json({ error: 'Failed to retrieve inbox messages.' });
    }
  },
  getUnreadMessages: async (req, res) => {
    try {
      const username = req.user;
      console.log(username);
      const unreadMessages = await messageService.getUnreadMessages(username);

      
      res.status(200).json(unreadMessages);
    } catch (error) {
      
      console.error('Failed to retrieve unread messages:', error);
      res.status(500).json({ error: 'Failed to retrieve unread messages.' });
    }
  },
  deleteMessage: async (req, res) => {
    res.json({ success: true, message: 'Message sent successfully' });
  },
  reportMessage: async (req, res) => {
    res.json({ success: true, message: 'Message reported successfully' });
  },
  getSentMessages: async (req, res) => {
    // Placeholder for retrieving sent messages
    try {
      // Placeholder response
      const inboxMessages = [
        {
          messageId: '1',
          sender: 'user1',
          title: 'Message 1',
          recipient: 'user2',
          content: 'This is the content of message 1',
          status: 'unread',
          createdAt: new Date(),
        },

      ];

      res.json({ success: true, data: inboxMessages });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve inbox messages', error: error.message });
    }
  },
  markMessageUnread: async (req, res) => {
    // Placeholder for marking a specific message as unread
    try {
      // Placeholder logic to mark message as unread
      const { messageId } = req.body; // Assuming message ID is sent in the request body
      // Placeholder response
      res.json({ success: true, message: `Message ${messageId} marked as unread successfully` });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to mark message as unread', error: error.message });
    }
  },
  markAllMessagesRead: async (req, res) => {
    // Placeholder for marking all messages as read
    try {
      // Placeholder logic to mark all messages as read
      // This could involve updating the status of all messages in the database
      // Placeholder response
      res.json({ success: true, message: 'All messages marked as read successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to mark all messages as read', error: error.message });
    }
  },
  getUserMentions: async (req, res) => {
    // Placeholder for retrieving username mentions
    try {
      // Placeholder logic to retrieve username mentions
      // This could involve querying the database for messages containing username mentions
      // Placeholder response
      const mentions = [
        {
          messageId: 1, sender: 'user1', content: 'This message mentions @user2 ', recipient: 'user2',
        },
        {
          messageId: 2, sender: 'user2', content: 'Another message mentioning @user1', recipient: 'user1',
        },
      ];
      res.json({ success: true, data: mentions });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve username mentions', error: error.message });
    }
  },
};

module.exports = messageController;
