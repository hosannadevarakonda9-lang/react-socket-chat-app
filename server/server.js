import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // USER JOIN
  socket.on("join", (username) => {
    socket.username = username;

    socket.broadcast.emit("system_message", {
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString()
    });
  });

  // RECEIVE MESSAGE
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", {
      username: socket.username,
      text: data.text,
      time: new Date().toLocaleTimeString(),
      type: "received"
    });
  });

  // USER LEAVE
  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("system_message", {
        text: `${socket.username} left the chat`,
        time: new Date().toLocaleTimeString()
      });
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
