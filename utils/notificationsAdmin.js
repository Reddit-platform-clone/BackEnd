const admin = require('firebase-admin');
const serviceAccount = require('../utils/reddit-clone-6d463-firebase-adminsdk-ymmmf-b2fb36a353.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin