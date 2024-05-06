
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    reportedUsername: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    type: {
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
    description : {
        type: String,
        required: false
    },

    communityName: {
        type: String,
        default: null
    }
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;





