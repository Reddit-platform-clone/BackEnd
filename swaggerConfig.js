const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const YAML = require('yamljs');

const router = express.Router();
const fs = require('fs');
const path = require('path');

// Function to load Swagger YAML files
function loadSwaggerFiles() {
  const swaggerFiles = fs.readdirSync('./swaggers');
  const mergedPaths = {};

  swaggerFiles.forEach((file) => {
    if (file.endsWith('.yaml')) {
      const filePath = path.join(__dirname, 'swaggers', file);
      const swaggerData = YAML.load(filePath);
      Object.assign(mergedPaths, swaggerData.paths);
    }
  });

  const mergedSwaggerYAML = {
    openapi: '3.0.0',
    info: {
      title: 'Messaging API',
      version: '1.0.0',
      description: 'API documentation for messaging service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    paths: mergedPaths,
  };

  return mergedSwaggerYAML;
}

// Serve Swagger UI at the root path
router.use('/', swaggerUi.serve);

// Set up route for the merged Swagger YAML file
router.get('/', (req, res) => {
  res.send(swaggerUi.generateHTML(loadSwaggerFiles()));
});

// Watch for changes in the swaggers folder
fs.watch('./swaggers', (eventType, filename) => {
  if (eventType === 'change' || eventType === 'rename') {
    console.log(`File ${filename} was ${eventType}`);
    // Reload Swagger YAML files
    specs.swaggerDoc = loadSwaggerFiles();
  }
});


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Messaging API',
      version: '1.0.0',
      description: 'API documentation for messaging service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

// Watch for changes in the swaggers folder
fs.watch('./swaggers', (eventType, filename) => {
  if (eventType === 'change' || eventType === 'rename') {
    console.log(`File ${filename} was ${eventType}`);
    // Reload Swagger YAML files
    specs.swaggerDoc = loadSwaggerFiles();
  }
});

// Serve Swagger UI at the root path
router.use('/', swaggerUi.serve);

// Set up route for the merged Swagger YAML file
router.get('/', (req, res) => {
  res.send(swaggerUi.generateHTML(loadSwaggerFiles()));
});

module.exports = {
  swaggerUi,
  specs,
  router,
};

