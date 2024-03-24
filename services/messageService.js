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
    

      await Message.create(messageData);

      return { success: true, message: 'Message sent successfully.' };
  } catch (error) {
      console.error('Error composing message:', error);
      return { success: false, error: 'Failed to send message.' };
  }
  },

  getInboxMessages: async (sentuserId) => {

    // Logic to retrieve inbox messages for the specified user
    // Example: const inboxMessages = await Message.find({ recipient: userId });
    // return inboxMessages;
  },

  getUnreadMessages: async (sentuserId) => {

    // Logic to retrieve unread messages for the specified user
    // Example: const unreadMessages = await Message.find({ recipient: userId, status: 'unread' });
    // return unreadMessages;
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
