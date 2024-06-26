/* eslint-disable no-unused-vars */

const Message = require('../models/messageModel'); 
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel'); 
const mongoose = require('mongoose');
const { getReceiverSocketId, io } = require("../utils/WebSockets");
const Mention=require('../models/mentionModel');
const pushNotificationService = require('./notificationsService.js');
const messageService = {
  composeMessage: async (messageData) => {
    try {
      
      if(!messageData.title){
        return { success: false, errors: "title cant be null" };
      }
     
      const errors = validationResult(messageData);
      if (!errors.isEmpty()) {
          return { success: false, errors: errors.array() };
      }

      
      const { username, recipient } = messageData;
      if (username === recipient) {
        return { success: false, error: 'Sender and recipient cannot be the same.' };
    }
      const sender = await UserModel.findOne({ username: username });
      const receiver = await UserModel.findOne({ username: recipient });
      
      if ( !receiver) {
        return { success: false, error: 'receiver does not exist.' };
    }   if (!sender) {
      
      return { success: false, error: `Sender  does not exist.` };
  }
  

if ((sender.blockedUsers && sender.blockedUsers.includes(receiver.username)) || 
(receiver.blockedUsers && receiver.blockedUsers.includes(sender.username))) {
return { success: false, error: 'Message cannot be sent because of blocking.' };
}   
const receiverSocketId = getReceiverSocketId(receiver.username);
if (receiverSocketId) {
  
  io.to(receiverSocketId).emit("newMessage", messageData);
  messageData.status="delivered"


}
    const message = new Message(messageData);

    await message.save();
    const notificationMessage = `${username}: ${messageData.title}`;
    pushNotificationService.sendPushNotificationToToken(receiver.deviceToken, 'Sarakel',notificationMessage )


      

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
     
      return { success: false, error:'User not found.'};
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername,type:'compose' });

    for(const messagei of inboxMessages){
      if (messagei.status === 'sent') {
        messagei.status ='delivered';
        await Message.updateOne(
          { _id: messagei._id },
          { $set: { status: 'delivered' } },
          { runValidators: true }
        );

      }
    }
    if (!inboxMessages || inboxMessages.length === 0) {
      
      return { success: true, message: [] };
    }

    return { success: true, message: inboxMessages };
   
  
  }catch (error) {
      console.error('Error get message:', error);
      return { success: false, error: 'Failed to get message.' };
  }
  },

  getUnreadMessages: async (sentUsername) => {
    try {
    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
      return { success: false, error:' error:User not found.'};
    }

    
    const inboxMessages = await Message.find({ recipient: sentUsername, status: 'delivered' ,type:'compose'});

   
    if (!inboxMessages || inboxMessages.length === 0) {
      return { success: true, message: []};
    }
    return { success: true, message: inboxMessages };
    }catch (error) {
      console.error('Error get unread message:', error);
      return { success: false, error: 'Failed to get unread message.' };
  }
  },

  deleteMessage: async (userID,messageId) => {
    try {
    if(!messageId){
       return { success: false, error:'message Id is null.'};
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
       return { success: false, error:'Message not found.'};
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
       return { success: false, error:'User not found.'};
    }
    if (message.username !== user.username) {
       return { success: false, error:'You are not authorized to delete this message.'};
    }

    
    await Message.findOneAndDelete({_id: messageId});
    return { success: true, message: 'Message deleted successfully' };
  }catch (error) {
      console.error('Error del message:', error);
      return { success: false, error: 'Failed to del message.' };
  }
  },
  reportMessage: async (userID,messageId,reportDetails) => {
    try {
      
    if(!reportDetails){
       return { success: false, error:'report Details is null.'};
    }
    
    if(!messageId){
      
       return { success: false, error:'message Id is null.'};
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
       return { success: false, error:'Message not found.'};
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
       return { success: false, error:'User not found.'};
    }
    
    if (message.username !== userID) {
       return { success: false, error:'You are not authorized to report this message.'};
    }
    mongoose.set('useFindAndModify', false);

    await Message.updateOne(
      { _id: messageId },
      { $set: { report: true, reportDetails: reportDetails } },
      { runValidators: true }
    );
    return { success: true, message: 'Message reported successfully.' };
    }
      catch (error) {
        console.error('Error report message:', error);
        return { success: false, error: 'Failed to report message.' };
    }
  },
  getSentMessages: async (sentUsername) => {
    try {

    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
       return { success: false, error:'User not found.'};
    }

    
    const inboxMessages = await Message.find({ username: sentUsername ,type:'compose'});
    

   
    if (!inboxMessages || inboxMessages.length === 0) {
      return { success: true, message: [] };
    }

    return {success: true, message:inboxMessages};}
    catch (error) {
      console.error('Error get sent message:', error);
      return { success: false, error: 'Failed to get sent message.' };
  }
  },
  markMessageUnread: async (userID,messageId) => {
    try{
      
    if(!messageId){
       return { success: false, error:'message Id is null.'};
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
       return { success: false, error:'Message not found.'};
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
       return { success: false, error:'User not found.'};
    }
   
    if (message.recipient !== userID) {
       return { success: false, error:'You are not authorized to unread this message.'};
    }
    if (message.status !== 'read') {
       return { success: false, error:'message is not read'};
    }
    await Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { status: 'delivered' } },
      { runValidators: true }
      );
      return { success: true, message: 'Message unread successfully.' };}catch (error) {
        console.error('Error unread message:', error);
        return { success: false, error: 'Failed to mark unread message.' };
    }
  },
  markMessageRead: async (userID,messageId) => {
    try{
      
    if(!messageId){
       return { success: false, error:'message Id is null.'};
    }
    const message = await Message.findOne({_id: messageId});
    if (!message) {
       return { success: false, error:'Message not found.'};
    }

    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
       return { success: false, error:'User not found.'};
    }
   
    if (message.recipient !== userID) {
       return { success: false, error:'You are not authorized to read this message.'};
    }
    if (message.status !== 'delivered') {
       return { success: false, error:'message is not delivered'};
    }
    await Message.findOneAndUpdate(
      { _id: messageId },
      { $set: { status: 'read' } },
      { runValidators: true }
      );
      return { success: true, message: 'Message read successfully.' };}catch (error) {
        console.error('Error read message:', error);
        return { success: false, error: 'Failed to mark read message.' };
    }
  },
  markAllMessagesRead: async (userID) => {
    try {
    
    const user = await UserModel.findOne({ username: userID });
    if (!user) {
       return { success: false, error:'User not found.'};
    }
    const message = await Message.find({recipient: userID,status:'delivered',type:'compose'});
   
    if (!message || message.length === 0) {
      return { success: false, message: 'No Messages to read .' };
    }
    const result = await Message.updateMany(
      { recipient: userID, status: 'delivered' },
      { $set: { status: 'read' } } 
    );
    return { success: true, message: 'All Message readed successfully.' };}catch (error) {
      console.error('Error all read message:', error);
      return { success: false, error: 'Failed to all read message.' };
  }
  },
  getUserMentions: async ( userID) => {
   try{ 
    const user = await UserModel.findOne({ username: userID });
    
    if (!user) {
       return { success: false, error:'User not found.'};
    }
    const mentions = await Mention.find({ mentioned: userID});
    if (!mentions || mentions.length === 0) {
      return { success: true, message: [] };
    }

    return {success: true, message:inboxMessages};}
    catch (error) {
      console.error('Error get sent message:', error);
      return { success: false, error: 'Failed to get sent message.' };
    }
  },
};

module.exports = messageService;
