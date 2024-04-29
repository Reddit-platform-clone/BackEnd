const ioClient = require("socket.io-client");

// Array to store messages for each client
let messages = [];


// Function to handle new messages
const handleMessage = (username, recipient, message,id) => {
  // Create an array for the recipient if it doesn't exist
  // if (!messages[recipient]) {
  //   messages[recipient] = [];
  // }
  // Push the new message to the recipient's array
  messages.push({ username, recipient,message,id });

 
  console.log(`New message received by ${recipient}: ${username} - ${message}`);

  console.log(messages)
 
};
const deleteMessage=(id)=>{
  const index = messages.findIndex((message) => message.id === id);

  console.log(index);
  if (index !== -1) {
    const deletedMessage = messages.splice(index, 1)[0]; 
    console.log(`Message with id ${deletedMessage.id} has been pulled from the array.`);
  }
  console.log(messages)
};
const socket1 = ioClient("http://localhost:5000", {
  query: { userId: "zyad2" },
});

socket1.on("connect", () => {
  console.log("Client 1 connected with ID:", socket1.id);
});

socket1.on("getOnlineUsers", (onlineUsers) => {
  console.log("Online users received by Client 1:", onlineUsers);
});

socket1.on("disconnect", () => {
  console.log("Client 1 disconnected");
  messages = [];
});

socket1.on("newMessage", (messageData) => {
  console.log("sok1")
  handleMessage(messageData.username, messageData.recipient, messageData.content,messageData._id);
});


const socket2 = ioClient("http://localhost:5000", {
  query: { userId: "hafez" },
});

socket2.on("connect", () => {
  console.log("Client 2 connected with ID:", socket2.id);
});

socket2.on("getOnlineUsers", (onlineUsers) => {
  console.log("Online users received by Client 2:", onlineUsers);
});

socket2.on("disconnect", () => {
  console.log("Client 2 disconnected");
});

socket2.on("newMessage", (messageData) => {
  console.log("sock2")
  handleMessage(messageData.username, messageData.recipient, messageData.content,messageData._id);
});
socket1.on("newMessageR", (messageData) => {
  console.log(`New message received by ${messageData.recipient}: ${messageData.username} - ${ messageData.content}`);

});

socket2.on("messageDeleted", (messageData) => {
  
  
  deleteMessage(messageData);
});