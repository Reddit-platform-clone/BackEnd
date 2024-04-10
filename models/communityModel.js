const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    isNSFW: { type: Boolean, default: false },
    description: String,
    rules: { type: [String], default: [] },
    banned: { type: [String], default: [] },
    moderatorsUsernames: { type:[String], required:true },
    members: { type: [String], default: [] }
}, { strict: 'throw' });

const Communities = mongoose.model('Communities', communitySchema);

module.exports = Communities;
