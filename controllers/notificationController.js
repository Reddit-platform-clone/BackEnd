
// const notificationService = require('../services/notificationsService.js');

// const notificationContoller = {
//     getThread: async (req, res) => {
//         res.json({ succes: true, message: 'Thread sent successfully'});
//     },

//     getCreate: async (req, res) => {
//         res.json({ succes: true, message: 'Create sent successfully'});
//     },

//     getEdit: async (req, res) => {
//         res.json({ succes: true, message: 'Edit sent successfully'});
//     },

//     getUpdate: async (req, res) => {
//         res.json({ succes: true, message: 'Update sent successfully'});
//     },

//     getCloseThread: async (req, res) => {
//         res.json({ succes: true, message: 'Close thread sent successfully'});
//     }
// };

// module.exports = notificationContoller;

const notificationService = require('../services/notificationsService.js')

const notificationContoller = {
    getDeviceToken: async (req, res) => {
        let {username} = req.user;
        let {deviceToken} = req.body;

        try {
            const result = await notificationService.getDeviceToken(username, deviceToken);
            if (result.success) {
                res.status(200).json({message: result.message});
            } else {
                res.status(400).json({message: result.message});
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = notificationContoller;