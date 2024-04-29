
const mongoose = require('mongoose');

const nsfwSchema = new mongoose.Schema({
   

    NsfwUsername: {
        type: String,
        required: true
    },
    typeOfUser: {
        type: String,
        required: true
    },

    dateTime: {
        type: Date,
        default: Date.now
    },

    entityId: {
        type: String,
        required: true
    },

});


const Nsfw = mongoose.model('Nsfw', nsfwSchema);

module.exports = Nsfw;





