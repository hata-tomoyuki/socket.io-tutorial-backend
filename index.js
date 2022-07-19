const { Socket } = require("dgram");
const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

const PORT = 3001;

io.on("connection", (socket) => {
    console.log("Connected to Client");

    socket.on("send_message", (data) => {
        console.log(data);

        io.emit("received_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));