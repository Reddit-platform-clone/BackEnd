

const WebSocket = require('ws');

function startWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    ws.on('message', function incoming(message) {
      console.log('Received:', message);
      handleMessage(message, ws);
    });

    ws.send('Hello, client!');
  });

  console.log('WebSocket server is running');
}

function handleMessage(message, ws) {
  try {
    const data = JSON.parse(message);
    if (data.type === 'compose') {
      // Handle composing and sending message logic here
      const { recipient, title, content, token } = data;
      // Validate token and other parameters here
      if (token === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpveiIsImlhdCI6MTcxMjczODg2OX0.PxLOy9StcnAbyzOgIJUrQpTSLFipzz6op381Xg6P4sU') {
        // Send message to recipient
        sendMessageToRecipient(recipient, title, content);
        ws.send('Message sent successfully.');
      } else {
        ws.send('Invalid token.');
      }
    }
  } catch (error) {
    console.error('Error handling message:', error);
    ws.send('Error handling message.');
  }
}

function sendMessageToRecipient(recipient, title, content) {
  // Logic to send message to recipient
  console.log(`Sending message to ${recipient}:`);
  console.log(`Title: ${title}`);
  console.log(`Content: ${content}`);
}

module.exports = startWebSocketServer;
