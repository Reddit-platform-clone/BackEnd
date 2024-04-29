//read all messages
//del message
//send message

const { request } = require('express');
const messageService = require('../services/liveMessagesService');
const jwt = require('jsonwebtoken');
const liveMessagesController = {
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
  
        const { recipient, content } = req.body;
       
        const result = await messageService.composeMessage({ username, recipient, content });
  
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
        const {_id}= req.body;
        
        if (req.user?.iat){
          username=req.user.username;
        }
    else{
      username=req.user;
    }
    
        const inboxMessages = await messageService.getInboxMessages(username,_id);
       
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
    getConverstaions: async (req, res) => {
      try {
        let username =req.user;
      
        
        if (req.user?.iat){
          username=req.user.username;
        }
    else{
      username=req.user;
    }
    
        const inboxMessages = await messageService.getConverstaions(username);
       
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
          
      const {messageId,conversation} = req.body
    
          
          const result=await messageService.deleteMessage( username ,messageId,conversation);
    
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

};

    module.exports = liveMessagesController;