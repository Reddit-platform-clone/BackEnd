const User = require('../models/userModel.js');

const notificationService = {
    getDeviceToken: async (username, deviceToken) => {
        try {
            let user = await User.findOne({username: username})
            if (!user) {
                throw new Error('User not found');
            }

            user.deviceToken = deviceToken;
            await user.save();
            
            return {success: true, message: 'Device token added successfully'}
        } catch (error) {
            return {success: false, message: error.message};
        }
    }
}

module.exports = notificationService;