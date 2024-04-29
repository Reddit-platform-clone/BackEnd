const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({

    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type:{
    type:String,
    required: true
    },
    username: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    rank: {
        type: Number,
        required: true
    },

});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
