const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentID: {
        type: String,
        required: true,
        unique: true
    },
    postID: {
        type: String,
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
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
