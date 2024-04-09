/* eslint-disable no-unused-vars */

const Message = require('../models/messageModel'); 
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel'); 
const messageService = {
  composeMessage: async (messageData) => {
    try {
     
      const errors = validationResult(messageData);
      if (!errors.isEmpty()) {
          return { success: false, errors: errors.array() };
      }

      
      const { username, recipient } = messageData;
      if (username === recipient) {
        return { success: false, error: 'Sender and recipient cannot be the same.' };
    }
      const senderExists = await UserModel.exists({ username: username });
      const receiverExists = await UserModel.exists({ username: recipient });
      
      if ( !receiverExists) {
        return { success: false, error: 'receiver does not exist.' };
    }   if (!senderExists) {
      
      return { success: false, error: `Sender (${username}) does not exist.` };
  }

//ADEED IN THE FUTURE
      // if (sender.blockedUsers.includes(receiver._id) || receiver.blockedUsers.includes(sender._id)) {
      //     return { success: false, error: 'Message cannot be sent because of blocking.' };
      // }
      
    const message = new Message(messageData);

    await message.save();

      

    return { success: true, message: 'Message sent successfully.' };
  } catch (error) {
      console.error('Error composing message:', error);
      return { success: false, error: 'Failed to send message.' };
  }
  },

  getInboxMessages: async (sentUsername) => {
    

    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
      throw new Error('User not found.');
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername });

    
    if (!inboxMessages || inboxMessages.length === 0) {
      return [];
    }

    return inboxMessages;
  },

  getUnreadMessages: async (sentUsername) => {

    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
      throw new Error('User not found.');
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername, status: 'sent' });

   
    if (!inboxMessages || inboxMessages.length === 0) {
      return [];
    }

    return inboxMessages;
  },

  deleteMessage: async (messageId, sentuserId) => {
    // Logic to delete a message by its IDs
    // Example: await Message.findByIdAndDelete(messageId);
  },
  reportMessage: async (messageId, sentuserId) => {
    // Logic to report a message by its IDs
    // Example: await Message.findById(messageId);
  },
  getSentMessages: async (sentuserId) => {

  },
  markMessageUnread: async (messageId, sentuserId) => {

  },
  markAllMessagesRead: async (sentuserId) => {

  },
  getUserMentions: async (messageId, sentuserId) => {

  },
};

module.exports = messageService;
