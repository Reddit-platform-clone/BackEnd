// server.js

const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes.js'); 
const categoryRoutes = require('./routes/categoryRoutes.js'); 
const createPostRoutes = require('./routes/createPostRoutes.js'); 
const hidePostRoutes = require('./routes/hidePostRoutes.js'); 
const joinCommunityRoutes = require('./routes/joinCommunityRoutes.js'); 
const { hide } = require('./controllers/hidePostController.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use messageRoutes
app.use('/', messageRoutes);
app.use('/', categoryRoutes);
app.use('/', createPostRoutes);
app.use('/', hidePostRoutes);
app.use('/', joinCommunityRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
