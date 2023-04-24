const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

rooms = [];
player = {};



app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    if(rooms.includes(data.codeRoom)){
      socket.join(data.codeRoom);
      socket.emit("receive_message", "JoinRoom");
      player[data.name] = data.name
      console.log("Un utilisateur a rejoint la room "+ data)
    }else{
      socket.emit("receive_message", "no room");
      console.log("pas de room existante " + rooms.join("/"));

    }
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("create_room", (data) => {
    socket.join(data.codeRoom);
    rooms.push(data.codeRoom);
    player[data.name] = data.name

    console.log("create room with code :" + data.codeRoom);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});