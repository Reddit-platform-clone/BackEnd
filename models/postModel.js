let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {type: String, unique: true},
    content: { type: String, required: true },
    title: {type: String},
    userId: {type: String, required: true},
    parentId: {type: String, required: true, default:0},
    media: {type: JSON},
    downvotes: {type: Number, default:0},
    communityId: {type: String, required: true},
    communityName: {type: String},
    upvotes: {type: Number, default:0},
    numComments: {type: Number, default:0},
    scheduled: {type: Boolean, default:0},
    isSpoiler: {type: Boolean, default:0},
    numViews: {type: Number, default:0},
    isLocked: {type: Boolean, required: true},
}, {timestamps: true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;