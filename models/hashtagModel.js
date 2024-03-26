let mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    hashtagString: {type: string, required: true, unique: true} 
});

const Hashtag = mongoose.model('hashtag', hashtagSchema);

module.exports = Hashtag;