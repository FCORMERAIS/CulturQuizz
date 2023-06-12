import "./App.css";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import {socket} from "./io";
import Cookies from 'js-cookie';

function App() {
  let cookies = Cookies.get()
  if (cookies.Pseudo == undefined) {
    cookies.Pseudo = "Not Connected"
  }

  //Room State
  const navigate = useNavigate();


  const [codeRoom, setCodeRoom ] = useState("");
  const [inRoom, setInRoom ] = useState(false);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const RoomGreeting = (props) => {
    return <div>
    <h1>Creating room !</h1>
    <p> Code de la party : {props.codeRoom}</p>
    <button onClick={StartGame}>Lancer La partie</button>

    <ol>
    {props.player?.map((user) => (
        <li className="user">{user}</li>
      ))}
    </ol>
  </div>;
  }
  const UserGreeting = (props) => {
    return <h1>Bienvenue !</h1>;
  }
  const Greeting = (props) => {
  const inRoom = props.inRoom;
  if (inRoom) {
    return <RoomGreeting codeRoom={props.codeRoom} player={props.player} />;
  }
  return <UserGreeting />;
  }
  
  const StartGame = () => {
    console.log("partie lancé");
    navigate("/quizz");
    socket.emit("Start_Game",{status:"StartGame","codeRoom":codeRoom});
  }

  const joinRoom = () => {
    if (codeRoom !== "") {
      socket.emit("join_room",{"codeRoom" :codeRoom,"name":cookies.Pseudo});
      socket.on("receive_message", (data) => {
        setMessageReceived(data.status);
        console.log(data.status+ " : data");
        console.log(messageReceived+ " : message");
        
        setPlayers(data.players);
        console.log("data.status")
        if(data.status === "StartGame"){
          navigate("/quizz");
        }
      });
      console.log(messageReceived)
      if (messageReceived === "no room"){
        console.log("Aucune room existante avec ce code")
        setInRoom(false);
      }else{
        console.log("Join room");
        setInRoom(true);
        listenServer();
      }
    }else{
      alert("Vous devez renseigner un pseudo et un code de partie spour jouer !");
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, codeRoom });
  };
  socket.on("question", (data) => {
    console.log("on vien de recevoir une question dans");
    console.log(data);
  });
  const listenServer = () => {
    socket.on("receive_message", (data) => {
      if (data.status === "new player"){
        setPlayers(data.players)
      }
      if(data.status === "StartGame"){
        navigate("/quizz");
      }
    });
  }

  const createRoom = () => {
    let uuidCode = uuid()
    setCodeRoom(uuidCode);
    setInRoom(true);
    console.log(inRoom);
    socket.emit("create_room", {"codeRoom" :uuidCode,"name":cookies.Pseudo});
    console.log("Create Room with code :" + uuidCode);
    listenServer();
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return cookies.Pseudo === "Not Connected" ? (
    ""
  ) : (
    <div className="App">
      <input
        placeholder="Code Room..."
        onChange={(event) => {
          setCodeRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <button onClick={createRoom}> Create Room</button>
  
      <Greeting inRoom={inRoom} codeRoom={codeRoom} player={players}></Greeting>
    </div>
  );
}

export default App;