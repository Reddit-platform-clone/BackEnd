const admin = require('../utils/notificationsAdmin.js'); // Import initialized admin object
const User = require('../models/userModel.js')

// Function to send push notification to a single FCM token
async function sendPushNotificationToToken(token, title, body) {
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to send push notification to a topic
async function sendPushNotificationToTopic(topic, title, body) {
    const message = {
        notification: {
            title: title,
            body: body
        },
        topic: topic
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message to topic:', response);
    } catch (error) {
        console.error('Error sending message to topic:', error);
    }
}

async function getDeviceToken(username, deviceToken) {
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

// Export the functions for use in other files
module.exports = {
    sendPushNotificationToToken,
    sendPushNotificationToTopic,
    getDeviceToken
};
