const mongoose = require('mongoose');
const Post = require('./postModel.js')

const communitySchema = new mongoose.Schema({
    communityName: { type: String, unique: true, required: true },
    type: { type: String, enum: ['private', 'ristricted', 'public']},
    isNSFW: { type: Boolean, default: false },
    description: {type: String},
    rules: { type: [String], default: [] },
    banned: { type: [String], default: [] },
    moderatorsUsernames: { type:[String], required:true },
    members: { type: [String], default: [] },
    displayPic: {type: String},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
}, { strict: 'throw', timestamps: true });

const Communities = mongoose.model('Communities', communitySchema);

module.exports = Communities;
