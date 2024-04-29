
const mongoose = require('mongoose');

const spoilerSchema = new mongoose.Schema({
   

    markUsername: {
        type: String,
        required: true
    },
    typeOfUser: {
        type: String,
        required: true
    },

    typeOfEntity: {
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


const Spoiler = mongoose.model('Spoiler', spoilerSchema);

module.exports = Spoiler;





