const admin = require('../utils/notificationsAdmin.js'); // Import initialized admin object

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

// Export the functions for use in other files
module.exports = {
    sendPushNotificationToToken,
    sendPushNotificationToTopic
};
