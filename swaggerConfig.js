const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const YAML = require('yamljs');
const router = express.Router();

// Load Swagger YAML files
const swaggerMessageAll = YAML.load('./swaggers/swaggerMessageAll.yaml');
const swaggerSentMessage = YAML.load('./swaggers/swaggerSentMessage.yaml');

// Combine the `paths` sections of the YAML files
const mergedPaths = {
    ...swaggerMessageAll.paths,
    ...swaggerSentMessage.paths
};

// Merge into a single YAML object
const mergedSwaggerYAML = {
    ...swaggerMessageAll,
    paths: mergedPaths
};

// Serve Swagger UI at the root path
router.use('/', swaggerUi.serve);

// Set up route for the merged Swagger YAML file
router.get('/', (req, res) => {
    res.send(swaggerUi.generateHTML(mergedSwaggerYAML));
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

module.exports = {
    swaggerUi,
    specs,
    router, 
};
