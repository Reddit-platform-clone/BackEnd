
const mongoose = require('mongoose');

const lockSchema = new mongoose.Schema({
   

    lockUsername: {
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


const Lock = mongoose.model('Lock', lockSchema);

module.exports = Lock;





