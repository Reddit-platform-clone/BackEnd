// server.js

const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes.js'); 
const { swaggerUi, specs, router } = require('./swaggerConfig.js');
const searchByRoutes = require('./routes/searchByRoutes.js');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger middleware
app.use('/api-docs', router);

// Use messageRoutes
app.use('/', messageRoutes);
app.use('/', searchByRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
