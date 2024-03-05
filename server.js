// server.js

const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes.js'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use messageRoutes
app.use('/', messageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
