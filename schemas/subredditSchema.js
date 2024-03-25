const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subredditSchema = new Schema({
  description: String,
  subredditID: { type: Number,required: true, unique: true},
  rules: [String],
  banned: [{type: String, required: true}],
  communityID: {type: Number, required: true},
  moderatorID: {type:String, required:true},
  members: [{type: String, required: true}]
});

module.exports = mongoose.model('Subreddit', subredditSchema);
