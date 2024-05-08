const mongoose = require('mongoose');

const modqueueSchema = new mongoose.Schema({
    communityName: { 
        type: String,
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type:{
        type:String,
        required: true,
        enum: ['post', 'comment']
    },
    username: {
        type: String,
        required: true
    },
    modStatus: {
        type: String,
        required: true,
        enum: ['reported', 'removed', 'approved', 'edited', 'unmoderated', 'spam']
    },
    reason: {
        type: String,
        default: null
    },
    moderatorNmae: { type: String, default: undefined }

}, { timestamps: true });

const Modqueue = mongoose.model('Modqueue', modqueueSchema);

module.exports = Modqueue;