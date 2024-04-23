const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messagesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation