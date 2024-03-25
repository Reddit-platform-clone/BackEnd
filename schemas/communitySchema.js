const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  communityID: {type: Number, required: true, unique: true},
  moderatorID: {type:String, required:true},
  moderator_invite: {type: Boolean, required: true},
  rules: [String],
  members: [{type: String, required: true}],
  subreddits: [{type: Number, required: true}]
});

module.exports = mongoose.model('Community', communitySchema);
