/* eslint-disable no-unused-vars */
const { request } = require('express');
const messageService = require('../services/messageService');
const jwt = require('jsonwebtoken');
const messageController = {
  compose: async (req, res) => {
    try {
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }


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
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
  
      const inboxMessages = await messageService.getInboxMessages(username);
     
      if (inboxMessages.success) {
       
      res.status(200).json(inboxMessages.message);
    } else {
      res.status(400).json({ errors: inboxMessages.errors, message: inboxMessages.error });
  }
    } catch (error) {
      
      console.error('Failed to retrieve inbox messages:', error);
      res.status(500).json({ error: 'Failed to retrieve inbox messages.' });
    }
  },
  getUnreadMessages: async (req, res) => {
    try {
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
      
      const unreadMessages = await messageService.getUnreadMessages(username);

      if (unreadMessages.success) {
      res.status(200).json(unreadMessages.message);
    } else {
      res.status(400).json({ errors: unreadMessages.errors, message: unreadMessages.error });
  }
    } catch (error) {
      
      console.error('Failed to retrieve unread messages:', error);
      res.status(500).json({ error: 'Failed to retrieve unread messages.' });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
      
  messageId=req.body

      
      const result=await messageService.deleteMessage( username ,messageId);

      if (result.success) {
      res.status(200).json({ message: 'Message deleted successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      
      console.error('Failed to delete the message:', error);
      res.status(500).json({ error: 'Failed to delete the message.' });
    }
  },
  reportMessage: async (req, res) => {
       try {
      
      const {_id,reportDetails} = req.body;
      
        let username =req.user;
        // console.log(req.user.iat);
        if (req.user?.iat){
          username=req.user.username;
        }
    else{
      username=req.user;
    }
      

      
      const result=await messageService.reportMessage( username ,_id,reportDetails);
      
      if (result.success) {
      
      res.status(200).json({ message: 'Message reported successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      
      console.error('Failed to report the message:', error);
      res.status(500).json({ error: 'Failed to report the message.' });
    }
  },
  getSentMessages: async (req, res) => {
    try {
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
   
    
      const unreadMessages = await messageService.getSentMessages(username);

      if (unreadMessages.success) {
      res.status(200).json(unreadMessages.message);
    } else {
      res.status(400).json({ errors: unreadMessages.errors, message: unreadMessages.error });
  }
    } catch (error) {
      
      console.error('Failed to retrieve sent messages:', error);
      res.status(500).json({ error: 'Failed to retrieve sent messages.' });
    }
  },
  markMessageUnread: async (req, res) => {
    try {
      
      const messageId = req.body;
      
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
   
      const result =await messageService.markMessageUnread( username ,messageId);

      if (result.success) {
      res.status(200).json({ message: 'Message unread successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      
      console.error('Failed to unread the message:', error);
      res.status(500).json({ error: 'Failed to unread the message.' });
    }
  },
  markAllMessagesRead: async (req, res) => {
    try {
      
      
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
   
    
      
      const result =await messageService.markAllMessagesRead(username);
      
      if (result.success) {
      
      res.status(200).json({ message: 'Messages readed successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      
      console.error('Failed to read the messages:', error);
      res.status(500).json({ error: 'Failed to mark read the message.' });
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
