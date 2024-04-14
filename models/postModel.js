let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {type: String, unique: true},
    content: { type: String, required: true },
    title: {type: String},
    userId: {type: String, required: true},
    parentId: {type: String, required: true},
    media: {type: JSON},
    downvotes: {type: Number},
    communityId: {type: String, required: true},
    communityName: {type: String},
    upvotes: {type: Number},
    numComments: {type: Number},
    scheduled: {type: Boolean},
    isSpoiler: {type: Boolean},
    numViews: {type: Number, required: true},
    isLocked: {type: Boolean, required: true},
}, {timestamps: true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;