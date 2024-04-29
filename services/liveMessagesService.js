
const Converstaion = require('../models/conversationModel'); 
const Message = require('../models/messageModel'); 
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel'); 
const mongoose = require('mongoose');
const { getReceiverSocketId, io } = require("../utils/WebSockets");
const liveMessagesService = {
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
      const sender = await UserModel.findOne({ username: username });
      const receiver = await UserModel.findOne({ username: recipient });
      console.log(username);
      
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
const sendrSocketId = getReceiverSocketId(sender.username);
messageData.type='live';
if (receiverSocketId) {
  
 
  messageData.status="delivered"


}
const message = new Message(messageData);

await message.save();

if(receiverSocketId || sendrSocketId){
  io.to(receiverSocketId).emit("newMessage", message);
  io.to(sendrSocketId).emit("newMessage", message);
}
   
   
     check= await  Converstaion.findOne({
        $or: [
          { users: { $elemMatch: { $eq: username, $eq: recipient } } },
          { users: { $elemMatch: { $eq: recipient, $eq: username } } }
        ]
      });
    if(!check){

        const converstaion=new Converstaion(
        {users:[username,recipient],
          messagesId: [message._id]
        
        
    });
    converstaion.save();
}
else{

  await check.messagesId.push(message._id);
  check.save();
}
      

    return { success: true, message: 'Message sent successfully.' };
  } catch (error) {
      console.error('Error composing message:', error);
      return { success: false, error: 'Failed to send message.' };
  }
  },
  getInboxMessages: async (sentUsername,_id) => {
    
    try {
      
    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
     ;
      return { success: false, error:'User not found.'};
    }
    const messages=[]
const conversation= await Converstaion.findOne({_id:_id });
if(!conversation){
  return { success: false, error: `Conversation  does not exist.` };
}
let check=0;
for(const user of conversation.users){

if(user == sentUsername){
  check=1
}

}
if(check==0){
  return { success: false, error: `user is not authorized to open conversation.` };
}
for (const messageId of conversation.messagesId) {

  const message = await Message.findOne({_id:messageId});

 
  if (message) {
    messages.push(message);
  }
}

    return { success: true, message: messages };
    
  }catch (error) {
      console.error('Error get message:', error);
      return { success: false, error: 'Failed to get message.' };
  }
  },
  getConverstaions: async (sentUsername) => {
    
    try {
      
    const user = await UserModel.findOne({ username: sentUsername });
    if (!user) {
     
      return { success: false, error:'User not found.'};
    }
    const messages=[]
 
const conversation= await Converstaion.find({ users: { $elemMatch: { $eq: sentUsername } }});
if(!conversation){
  return { success: true, message: [] };
}


    return { success: true, message: conversation };
    
  }catch (error) {
      console.error('Error get message:', error);
      return { success: false, error: 'Failed to get message.' };
  }
  },

  getConverstaionId: async (sentUsername,reciptant) => {
    
    try {
      if(sentUsername==reciptant){
        return { success: false, error:'User cannot send to himself.'};
      }
    const user = await UserModel.findOne({ username: sentUsername });
    const rec = await UserModel.findOne({ username: reciptant });
    if (!rec||!user) {
     
      return { success: false, error:'User not found.'};
    }
   
    const check= await  Converstaion.findOne({
      users: { $all: [sentUsername, reciptant] }
    });
    console.log(check)
if(!check){
  return { success: true, message: "no conversation" };
}


    return { success: true, message: check._id };
    
  }catch (error) {
      console.error('Error get message:', error);
      return { success: false, error: 'Failed to get message.' };
  }
  },

  deleteMessage: async (userID,messageId,_id) => {
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
    const conversation= await Converstaion.findOne({_id:_id });
    if(!conversation){
      return { success: false, error: `Conversation  does not exist.` };
    }
    let check=0;
    for(const user of conversation.users){
    
    if(user == userID){
      check=1
    }
    
    }
    if(check==0){
      return { success: false, error: `user is not authorized to open conversation.` };
    }
    conversation.messagesId.pull(messageId);
    conversation.save();
    const sender = await UserModel.findOne({ username: message.username });
    const receiver = await UserModel.findOne({ username: message.recipient });
    await Message.findOneAndDelete({_id: messageId});
  
const receiverSocketId = getReceiverSocketId(receiver.username);
const sendrSocketId = getReceiverSocketId(sender.username);
if(receiverSocketId && sendrSocketId){
  io.to(receiverSocketId).to(sendrSocketId).emit("messageDeleted", messageId);
}

    return { success: true, message: 'Message deleted successfully' };
  }catch (error) {
      console.error('Error del message:', error);
      return { success: false, error: 'Failed to del message.' };
  }
  },



};

  module.exports = liveMessagesService;

