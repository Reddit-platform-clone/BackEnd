const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subredditSchema = new Schema({
  description: String,
  subreddit_id: { type: Number,required: true, unique: true},
  rules: [String],
  banned: [{type: String, required: true}],
  community_id: {type: Number, required: true},
  moderator_id: {type:String, required:true},
  members: [{type: String, required: true}]
});

module.exports = mongoose.model('Subreddit', subredditSchema);
