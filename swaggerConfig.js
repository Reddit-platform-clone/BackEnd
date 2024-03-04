

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
    apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
