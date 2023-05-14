const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
let questionPass = []
rooms = [];
players = {};

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/questions');
    var questions = await response.json();
    
  } catch (error) {
    console.error(error);
  }

  console.log(questions);

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    playersRoom = [];
    socket.on("join_room", (data) => {
      if(rooms.includes(data.codeRoom)){
        socket.join(data.codeRoom);
        players[data.name] = data.codeRoom;
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
      console.log("recu message");
      socket.to(data.codeRoom).emit("receive_message", data);
    });
    socket.on("create_room", (data) => {
      socket.join(data.codeRoom);
      rooms.push(data.codeRoom);
      players[data.name] = data.codeRoom
  
      console.log("create room with code :" + data.codeRoom);
    });
    socket.on("Start_Game",(data)=>{
      socket.to(data.codeRoom).emit("receive_message", data);

      var currentQuestion = Math.floor(Math.random() * questions.length);
      data["question"] = questions[currentQuestion];
      questionPass.push(currentQuestion)
      data["nbQuestion"] = questions.length;
      data["indexQ"] = questionPass.length-1;

      console.log(data);
      io.to(data.codeRoom).emit("question", data);

    })
    nbAnswer=0;
    socket.on("answer",(data)=>{
      nbAnswer+=1
      console.log("nouvel rep");
      if (nbAnswer == playersRoom.length){
        nbAnswer=0;
        if (questionPass.length === questions.length) {
          questionPass = []
          data["nbQuestion"] = questions.length;
          data["indexQ"] = questionPass.length-1;
          
          io.to(data.codeRoom).emit("ending", data);

        }else{
          let aleatory = -1
          while (aleatory === -1 || questionPass.indexOf(aleatory) !== -1) {
            aleatory = Math.floor(Math.random() * questions.length)
          }
          questionPass.push(aleatory)
          data["question"] = questions[aleatory];
          data["nbQuestion"] = questions.length;
          data["indexQ"] = questionPass.length-1;
          io.to(data.codeRoom).emit("question", data);
        }
        
    }})
    socket.on("Restart", (data) => {
      var currentQuestion = Math.floor(Math.random() * questions.length);
      data["question"] = questions[currentQuestion];
      questionPass=[];
      questionPass.push(currentQuestion)
      data["nbQuestion"] = questions.length;
      data["indexQ"] = questionPass.length-1;

      console.log(data);
      io.to(data.codeRoom).emit("question", data);
    });
  });
  
  server.listen(3002, () => {
    console.log("SERVER IS RUNNING");
  });
};
fetchData()