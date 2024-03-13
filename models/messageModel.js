
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageID: {
        type: String,
        required: true,
        unique: true
    },
    senderID: {
        type: String,
        required: true
    },
    receiverID: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'], 
        default: 'sent'
    }
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
