
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
     console.log(messageData)
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
if (receiverSocketId) {
  
  io.to(receiverSocketId).emit("newMessage", messageData);
  messageData.status="delivered"


}
messageData.type='live';
    const message = new Message(messageData);

    await message.save();

//      check= await  Converstaion.findOne({
//         $or: [
//           { users: { $elemMatch: { $eq: username, $eq: recipient } } },
//           { users: { $elemMatch: { $eq: recipient, $eq: username } } }
//         ]
//       });
//     if(check){
//         const converstaion=new Converstaion(
//         {users:[username,recipient],
//         messagesId: [message._id]
        
        
//     });
//     converstaion.save();
// }
// else{
//   await check.messageId.push(message._id);
//   check.save();
// }
      

    return { success: true, message: 'Message sent successfully.' };
  } catch (error) {
      console.error('Error composing message:', error);
      return { success: false, error: 'Failed to send message.' };
  }
  },};

  module.exports = liveMessagesService;
  //sent delivered
