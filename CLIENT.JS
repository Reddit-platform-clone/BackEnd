const ioClient = require("socket.io-client");
console.log("s");
// console.log(ioClient)
const socket1 = ioClient("http://localhost:5000", {
    
  query: { userId: "user1" },
});
console.log("s");

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
  query: { userId: "user2" },
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
