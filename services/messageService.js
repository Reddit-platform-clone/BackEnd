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

    
    const inboxMessages = await Message.find({ recipient: sentUsername, status: 'delivered' });

   
    if (!inboxMessages || inboxMessages.length === 0) {
      return [];
    }

    return inboxMessages;
  },

  deleteMessage: async (userID,messageId) => {
    if(!messageId){
      throw new Error('message Id is null.');
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
      throw new Error('Message not found.');
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
      throw new Error('User not found.');
    }
    if (message.username !== user.username) {
      throw new Error('You are not authorized to delete this message.');
    }

    
    await Message.findOneAndDelete({_id: messageId});
  },
  reportMessage: async (userID,messageId,reportDetails) => {
    if(!reportDetails){
      throw new Error('report Details is null.');
    }
    
    if(!messageId){
      throw new Error('message Id is null.');
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
      throw new Error('Message not found.');
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
      throw new Error('User not found.');
    }
    
    if (message.username !== userID) {
      throw new Error('You are not authorized to report this message.');
    }
    await Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { report: true,reportDetails:reportDetails } },
      { runValidators: true }
      );

  },
  getSentMessages: async (sentUsername) => {

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
  markMessageUnread: async (userID,messageId) => {
    if(!messageId){
      throw new Error('message Id is null.');
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
      throw new Error('Message not found.');
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
      throw new Error('User not found.');
    }
    if (message.username !== user.username) {
      throw new Error('You are not authorized to unread this message.');
    }
    await Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { status: 'delivered' } },
      { runValidators: true }
      );
  },
  markAllMessagesRead: async (sentuserId) => {

  },
  getUserMentions: async (messageId, sentuserId) => {

  },
};

module.exports = messageService;
