// server.js

const express = require('express');
const bodyParser = require('body-parser');

const { swaggerUi, specs, router } = require('./swaggerConfig');
const messageRoute = require('./routes/messageRoute.js');
const userRoute = require('./routes/userRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


// Use Swagger middleware
app.use('/api-docs', router); 


app.use('/', messageRoute);
app.use('/', userRoute);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
