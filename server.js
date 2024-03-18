/* eslint-disable import/no-dynamic-require, global-require */
const express = require('express');
const bodyParser = require('body-parser');
let dotenv = require('dotenv').config();
const mongoose = require('./database');

const fs = require('fs');
const path = require('path');
const swaggerConfig = require('./swaggerConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api-docs', swaggerConfig.router);

function loadRoutes(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);

    const route = require(filePath);
    app.use('/', route);
  });
}

const routesDirectory = path.join(__dirname, 'routes');
loadRoutes(routesDirectory);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/* eslint-enable import/no-dynamic-require, global-require */
