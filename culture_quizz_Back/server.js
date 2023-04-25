const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

rooms = [];
players = {};



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
      players[data.name] = data.codeRoom;
      playersRoom = [];
      for(const [key, value] of Object.entries(players)){
        if (value == data.codeRoom){
          playersRoom.push(key);
        }
        console.log(value + " "+ key);
      }
      socket.emit("receive_message", {"status":"JoinRoom" ,"players":playersRoom});
      socket.to(data.codeRoom).emit("receive_message", {"status":"new player" ,"players":playersRoom});
      console.log("Un utilisateur a rejoint la room "+ data.codeRoom)
    }else{
      socket.emit("receive_message", {"status":"no room"});
      console.log("pas de room existante " + rooms.join("/"));
    }
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("create_room", (data) => {
    socket.join(data.codeRoom);
    rooms.push(data.codeRoom);
    players[data.name] = data.codeRoom

    console.log("create room with code :" + data.codeRoom);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});