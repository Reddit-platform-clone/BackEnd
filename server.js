

const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, specs } = require('./swaggerConfig');
const messageRoutes = require('./routes/messageRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Use messageRoutes
app.use('/api/message', messageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
