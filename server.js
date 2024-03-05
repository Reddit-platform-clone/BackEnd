const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, specs, router } = require('./swaggerConfig');
const messageRoutes = require('./routes/messageRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use Swagger middleware
app.use('/api-docs', router); 

// Use messageRoutes
app.use('/', messageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
