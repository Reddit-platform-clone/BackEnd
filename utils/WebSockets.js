const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}
const conversationUserMap = {}; // {conversationId: [userId1, userId2, ...]}

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const isUserInConversation = (userId, conversationId) => {
    const participants = conversationUserMap[conversationId];
    return participants && participants.includes(userId);
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("joinConversation", (conversationId) => {
        if (conversationId && !isUserInConversation(userId, conversationId)) {
            if (!conversationUserMap[conversationId]) {
                conversationUserMap[conversationId] = [];
            }
            conversationUserMap[conversationId].push(userId);
            console.log(`User ${userId} joined conversation ${conversationId}`);
        }
    });

    socket.on("exitConversation", (conversationId) => {
        if (conversationId && isUserInConversation(userId, conversationId)) {
            const participants = conversationUserMap[conversationId];
            const index = participants.indexOf(userId);
            if (index !== -1) {
                participants.splice(index, 1);
                console.log(`User ${userId} exited conversation ${conversationId}`);
            }
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // Remove user from all conversations
        Object.keys(conversationUserMap).forEach((conversationId) => {
            const participants = conversationUserMap[conversationId];
            const index = participants.indexOf(userId);
            if (index !== -1) {
                participants.splice(index, 1);
                console.log(`User ${userId} left conversation ${conversationId}`);
            }
        });
    });
});

module.exports = { app, io, server, getReceiverSocketId, isUserInConversation };
