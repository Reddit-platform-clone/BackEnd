
const notificationService = require('../services/notificationsService.js');

const notificationContoller = {
    getThread: async (req, res) => {
        res.json({ succes: true, message: 'Thread sent successfully'});
    },

    getCreate: async (req, res) => {
        res.json({ succes: true, message: 'Create sent successfully'});
    },

    getEdit: async (req, res) => {
        res.json({ succes: true, message: 'Edit sent successfully'});
    },

    getUpdate: async (req, res) => {
        res.json({ succes: true, message: 'Update sent successfully'});
    },

    getCloseThread: async (req, res) => {
        res.json({ succes: true, message: 'Close thread sent successfully'});
    }
};

module.exports = notificationContoller;
