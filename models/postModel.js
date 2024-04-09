let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {type: Number, required: true, unique: true},
    content: { type: String, required: true },
    title: {type: String},
    userId: {type: String, required: true},
    dateTime: {type: Date, default: Date.now},
    parentId: {type: Number, required: true},
    media: {type: JSON},
    downvotes: {type: Number},
    communityId: {type: Number, required: true},
    communityName: {type: String, required: true},
    upvotes: {type: Number},
    numComments: {type: Number, required: true},
    scheduled: {type: Boolean},
    isSpoiler: {type: Boolean},
    numViews: {type: Number, required: true},
    isLocked: {type: Boolean, required: true},
    post_content:{type: String}
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;