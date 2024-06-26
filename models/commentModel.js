const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    postID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content:{
    type:String,
    required: true
    },
    userID: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    upvote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    },
    isSpoiler: {
        type: Boolean,
        default: false
    },
    replyToID: {
        type: String,
        default: null
    },
    hashtags:{type:[String]},
    mentions: {type: [String]}
});
commentSchema.index({ content: 'text'});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
