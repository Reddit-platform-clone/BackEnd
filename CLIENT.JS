const WebSocket = require('ws');

const client = new WebSocket('ws://localhost:5000');

client.on('open', function() {
    console.log('WebSocket client connected');

    const message = 'This is a test message from the client';
    client.send(message);
    console.log('Sent:', message);
});

client.on('message', function(data) {
    console.log('Received:', data);
});
