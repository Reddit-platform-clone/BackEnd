const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subredditSchema = new Schema({
  description: String,
  subreddit_id: { type: Schema.Types.ObjectId, unique: true},
  moderator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rules: [String],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  banned: [{type:Schema.Types.ObjectId, ref:'User'}],
  community_id: {type:Schema.Types.ObjectId, ref:'Community'}
});

module.exports = mongoose.model('Subreddit', subredditSchema);
