let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content: { type: String },
    title: {type: String, required: true},
    username: {type: String, required: true},
    media: {type: JSON},
    downvotes: {type: Number,default:0},
    communityId: {type: String, required: true},
    upvotes: {type: Number,default:0},
    scheduled: {
        date: {
            type: Date,
            required: false
        },
        time: {
            type: String,
            required: false
        }
    },
    isSpoiler: {type: Boolean,default:false},
    isLocked: {type: Boolean,default:false},
    isReported: {type: Boolean,default:false},
    isReason:{type:[String],default:false},
    nsfw:{type: Boolean,default:false},
    ac:{type: Boolean,default:false},
    url:{  type: [String],
        default: []  },
    flair:{  type: [String],
        default: []  }, 
    
    hashtags:{type: [String]},
    mentions:{type:[String]}


}, {timestamps: true});

postSchema.index({ content: 'text', title: 'text'});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
