const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
  users:
{    type: [String],}
  ,
  messagesId: { type: [String],}
});
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation

