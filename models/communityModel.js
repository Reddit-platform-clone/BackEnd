const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    description: String,
    rules: { type: [String] },
    banned: { type: [String], default: [] },
    moderatorUsername: { type:String, required:true },
    members: { type: [String], required: true }
}, { strict: 'throw' });

const Communities = mongoose.model('Communities', communitySchema);

module.exports = Communities;
