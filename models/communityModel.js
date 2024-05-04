const mongoose = require('mongoose');
const Post = require('./postModel.js')

const communitySchema = new mongoose.Schema({
    communityName: { type: String, unique: true, required: true },
    type: { type: String, enum: ['private', 'restricted', 'public']},
    isNSFW: { type: Boolean, default: false },
    description: {type: String},
    rules: { type: [String], default: [] },
    banned: { type: [String], default: [] },
    muted: { type: [String], default: [] },
    moderatorsUsernames: { type:[String], required:true },
    members: { type: [String], default: [] },
    displayPicUrl: {type: String},
    backgroundPicUrl: {type: String},
    posts: {type: [mongoose.Schema.Types.ObjectId], ref: 'post'},
    communityCategory: {type:[String], required: true}
}, { strict: 'throw', timestamps: true });

const Communities = mongoose.model('Communities', communitySchema);

module.exports = Communities;
