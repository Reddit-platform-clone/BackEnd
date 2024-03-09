// server.js

const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoute.js');
const { swaggerUi, specs, router } = require('./swaggerConfig.js')
const userRoute = require('./routes/userRoute.js') 
const subredditRoute = require('./routes/subredditRoutes.js');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger middleware
app.use('/api-docs', router);

// Use messageRoutes
app.use('/', messageRoutes);
app.use('/', userRoute)
app.use('/', subredditRoute)

// Use Swagger middleware
app.use('/api-docs', router); 


app.use('/', messageRoutes);
app.use('/', userRoute);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
