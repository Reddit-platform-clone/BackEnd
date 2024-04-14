let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_id: {type: Number, required: true, unique: true},
    content: { type: String},
    user_id: {type: String, required: true},
    date_time: {type: Date, default: Date.now},
    parent_id: {type: Number, required: true},
    media: {type: JSON},
    downvotes: {type: Number},
    subreddit_id: {type: Number, required: true},
    upvotes: {type: Number},
    num_comments: {type: Number, required: true},
    scheduled: {type: Boolean},
    is_spoiler: {type: Boolean},
    num_views: {type: Number, required: true},
    is_locked: {type: Boolean, required: true} 
});

postSchema.index({ content: 'text', title: 'text' });
const Post = mongoose.model('post', postSchema);

module.exports = Post;