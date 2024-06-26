
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    content: {
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
    },
     report: {
        type: Boolean,
        default: false
    },
    reportDetails : {
        type: String,
        default: null
    },
    type : {
        type:String,
        enum: ['compose', 'live'], 
        default: "compose"
    },
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
