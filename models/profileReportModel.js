const mongoose = require('mongoose');

const reportProfileSchema = new mongoose.Schema({
    reporterUsername: {
        type: String,
        required: true
    },
    reportedUsername: {
        type: String,
        required: true
    },
    reason: {
        type: [String],
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


const profileReport = mongoose.model('ProfileReports', reportProfileSchema);

module.exports = profileReport;
