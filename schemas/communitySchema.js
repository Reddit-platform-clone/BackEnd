const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  community_id: {type: Schema.Types.ObjectId, unique: true},
  moderator_id: {type:Number, required:true},
  moderator_invite: {type:Schema.Types.ObjectId, ref:'User'},
  rules: [String],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  subreddits: [{type: Schema.Types.ObjectId, ref:'Subreddit'}]
});

module.exports = mongoose.model('Community', communitySchema);
