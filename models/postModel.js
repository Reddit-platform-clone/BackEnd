let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {type: String, unique: true},
    content: { type: String, required: true },
    title: {type: String},
    userId: {type: String, required: true},
    dateTime: {type: Date, default: Date.now},
    parentId: {type: Number},
    media: {type: JSON},
    downvotes: {type: Number},
    communityId: {type: Number, required: true},
    communityName: {type: String},
    upvotes: {type: Number},
    numComments: {type: Number},
    scheduled: {type: Boolean},
    isSpoiler: {type: Boolean},
    numViews: {type: Number},
    isLocked: {type: Boolean, required: true, default: false},
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;