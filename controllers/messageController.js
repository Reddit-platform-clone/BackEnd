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
      
      const unreadMessages = await messageService.getUnreadMessages(username);

      
      res.status(200).json(unreadMessages);
    } catch (error) {
      
      console.error('Failed to retrieve unread messages:', error);
      res.status(500).json({ error: 'Failed to retrieve unread messages.' });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      
      const messageId = req.body.messageId;
      

      
      await messageService.deleteMessage(req.user,messageId);

      
      res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (error) {
      
      console.error('Failed to delete the message:', error);
      res.status(500).json({ error: 'Failed to delete the message.' });
    }
  },
  reportMessage: async (req, res) => {
       try {
      
      const {_id,reportDetails} = req.body;
      

      
      await messageService.reportMessage(req.user,_id,reportDetails);

      
      res.status(200).json({ message: 'Message reported successfully.' });
    } catch (error) {
      
      console.error('Failed to report the message:', error);
      res.status(500).json({ error: 'Failed to report the message.' });
    }
  },
  getSentMessages: async (req, res) => {
    try {
      const username = req.user;
      
      const unreadMessages = await messageService.getSentMessages(username);

      
      res.status(200).json(unreadMessages);
    } catch (error) {
      
      console.error('Failed to retrieve sent messages:', error);
      res.status(500).json({ error: 'Failed to retrieve sent messages.' });
    }
  },
  markMessageUnread: async (req, res) => {
  
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
