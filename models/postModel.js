let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {type: String, unique: true},
    content: { type: String },
    title: {type: String, required: true},
    userId: {type: String, required: true},
    media: {type: JSON},
    downvotes: {type: Number,default:0},
    communityId: {type: String, required: true},
    communityName: {type: String},
    communityImage:{type:JSON},
    upvotes: {type: Number,default:0},
    numComments: {type: Number,default:0},
    scheduled: {type: Boolean},
    isSpoiler: {type: Boolean},
    numViews: {type: Number, required: true, default: 0},
    isLocked: {type: Boolean, required: true},


}, {timestamps: true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
