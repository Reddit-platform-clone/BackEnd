const express = require('express');
const bodyParser = require('body-parser');
let dotenv = require('dotenv').config();
const mongoose = require('./database');

const fs = require('fs');
const path = require('path');
const { swaggerUi, specs, router } = require('./swaggerConfig');
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/postModel');

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api-docs', router);


function loadRoutes(directory) {
  fs.readdirSync(directory).forEach((file) => {
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
/* eslint-enable import/no-dynamic-require, global-require */

