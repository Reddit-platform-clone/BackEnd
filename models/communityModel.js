const mongoose = require('mongoose');
const Post = require('./postModel.js')

const communitySchema = new mongoose.Schema({
    communityName: { type: String, unique: true, required: true },
    type: { type: String, enum: ['private', 'restricted', 'public']},
    isNSFW: { type: Boolean, default: false },
    description: {type: String},
    rules: { type: String, default: null },
    removalReasons: { type: String, default: null },
    banned: { type: [String], default: [] },
    muted: { type: [String], default: [] },
    moderatorsUsernames: { type:[String], required:true },
    members: { type: [String], default: [] },
    displayPic: {type: String},
    backgroundPic: {type: String},
    posts: {type: [mongoose.Schema.Types.ObjectId], ref: 'post'},
    communityCategory: {type:[String], required: true}
}, { strict: 'throw', timestamps: true });

const Communities = mongoose.model('Communities', communitySchema);

module.exports = Communities;
