// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { swaggerUi, specs, router } = require('./swaggerConfig');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use Swagger middleware
app.use('/api-docs', router);

// Function to dynamically load routes from a directory
function loadRoutes(directory) {
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const route = require(filePath);
        app.use('/', route);
    });
}

// Load routes from the 'routes' directory
const routesDirectory = path.join(__dirname, 'routes');
loadRoutes(routesDirectory);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
