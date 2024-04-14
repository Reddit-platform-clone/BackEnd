const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  communityID: {type: String, required: true, unique: true},
  communityName: {type: String, required: true},
  moderatorID: {type: String, required:true},
  moderatorInvite: {type: Boolean, required: true},
  rules: { type: Array, default: [] },
  members: {type: Array, default: []},
  type: {type: String, required: true},
  isNSFW: {type: Boolean},
  description: {type: String}
});

module.exports = mongoose.model('Community', communitySchema);