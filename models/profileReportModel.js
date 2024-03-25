const mongoose = require('mongoose');

const reportProfileSchema = new mongoose.Schema({
    reportID: {
        type: Number,
        required: true,
        unique: true
    },
    reporterUsername: {
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
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const profileReport = mongoose.model('Profile Reports', reportProfileSchema);

module.exports = profileReport;
