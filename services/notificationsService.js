const admin = require('../utils/notificationsAdmin.js'); // Import initialized admin object
const User = require('../models/userModel.js')
const Notification = require('../models/notificationsModel.js')

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

        await saveNotificationToDB(token, title, body);
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

        await saveNotificationToDB(token, title, body);
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

async function getNotifications(username) {
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return {success: false};
        }
        const userId = user._id;
        const notifications = await Notification.find({user: userId});
        return {success: true, data: notifications};
    } catch (error) {
        console.error("Notification service error");
        return {success: false, message: error.message}
    }
}

async function saveNotificationToDB(userIdentifier, title, body) {
    try {
      const user = await User.findOne({ $or: [{ username: userIdentifier }, { deviceToken: userIdentifier }] });
      if (!user) {
        throw new Error('User not found');
      }
  
      const notification = new Notification({
        user: user._id,
        title: title,
        body: body,
      });
  
      await notification.save();
      console.log('Notification saved to database:', notification);
  
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  }

// Export the functions for use in other files
module.exports = {
    sendPushNotificationToToken,
    sendPushNotificationToTopic,
    getDeviceToken,
    getNotifications
};
