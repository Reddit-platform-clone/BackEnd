const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { swaggerUi, specs, router } = require('./swaggerConfig');
const { app, server } = require("./utils/WebSockets");

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', router);

function loadRoutes(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    const route = require(filePath);
    app.use('/', route);
  });
}

const routesDirectory = path.join(__dirname, 'routes');
loadRoutes(routesDirectory);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is running on port ${server.address().port}`);
});

module.exports = app;
