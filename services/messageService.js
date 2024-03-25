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
    
    try {
    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
      throw new Error('User not found.');
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername });

    
    if (!inboxMessages || inboxMessages.length === 0) {
      return [];
    }

    return inboxMessages;}catch (error) {
      console.error('Error get message:', error);
      return { success: false, error: 'Failed to get message.' };
  }
  },

  getUnreadMessages: async (sentUsername) => {
    try {
    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
      throw new Error('User not found.');
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername, status: 'delivered' });

   
    if (!inboxMessages || inboxMessages.length === 0) {
      return [];
    }

    return inboxMessages;}catch (error) {
      console.error('Error get unread message:', error);
      return { success: false, error: 'Failed to get unread message.' };
  }
  },

  deleteMessage: async (userID,messageId) => {
    try {
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

    
    await Message.findOneAndDelete({_id: messageId});}catch (error) {
      console.error('Error del message:', error);
      return { success: false, error: 'Failed to del message.' };
  }
  },
  reportMessage: async (userID,messageId,reportDetails) => {
    try {
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
      );}
      catch (error) {
        console.error('Error report message:', error);
        return { success: false, error: 'Failed to report message.' };
    }
  },
  getSentMessages: async (sentUsername) => {
    try {

    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
      throw new Error('User not found.');
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername, status: 'sent' });

   
    if (!inboxMessages || inboxMessages.length === 0) {
      return [];
    }

    return inboxMessages;}
    catch (error) {
      console.error('Error get sent message:', error);
      return { success: false, error: 'Failed to get sent message.' };
  }
  },
  markMessageUnread: async (userID,messageId) => {
    try{
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
    if (message.status !== 'read') {
      throw new Error('message is not read');
    }
    await Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { status: 'delivered' } },
      { runValidators: true }
      );}catch (error) {
        console.error('Error read message:', error);
        return { success: false, error: 'Failed to mark read message.' };
    }
  },
  markAllMessagesRead: async (userID) => {
    try {
    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
      throw new Error('User not found.');
    }
    const message = await Message.find({username: userID,status:'delivered'});
   
    if (!message || message.length === 0) {
      return [];
    }
    const result = await Message.updateMany(
      { username: userID, status: 'delivered' },
      { $set: { status: 'read' } } 
    );
    return result}catch (error) {
      console.error('Error all read message:', error);
      return { success: false, error: 'Failed to all read message.' };
  }
  },
  getUserMentions: async (messageId, sentuserId) => {

  },
};

module.exports = messageService;
