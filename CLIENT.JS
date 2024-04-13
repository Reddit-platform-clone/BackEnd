const ioClient = require("socket.io-client");

const socket1 = ioClient("http://localhost:5000", {
  query: { userId: "zoz" },
});

socket1.on("connect", () => {
  console.log("Client 1 connected with ID:", socket1.id);
});

socket1.on("getOnlineUsers", (onlineUsers) => {
  console.log("Online users received by Client 1:", onlineUsers);
});

socket1.on("disconnect", () => {
  console.log("Client 1 disconnected");
});


const socket2 = ioClient("http://localhost:5000", {
  query: { userId: "kofta 3alfa7m" },
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
  console.log("New message received by Client 2:", messageData);
});
