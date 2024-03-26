const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  communityID: {type: Number, required: true, unique: true},
  moderatorID: {type:String, required:true},
  moderatorInvite: {type: Boolean, required: true},
  rules: [],
  members: [],
  subreddits: []
});

module.exports = mongoose.model('Community', communitySchema);
