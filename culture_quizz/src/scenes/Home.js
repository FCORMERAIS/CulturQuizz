import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

const socket = io.connect("http://localhost:3001");

function RoomGreeting(props) {
  return <div>
    <h1>Creating room !</h1>
    <p> Code de la party : {props.codeRoom}</p>
    <ol>
    {props.player?.map((user) => (
        <li className="user">{user}</li>
      ))}
    </ol>
  </div>;
}
function UserGreeting(props) {
  return <h1>Bienvenue !</h1>;
}
function Greeting(props) {
  const inRoom = props.inRoom;
  if (inRoom) {
    return <RoomGreeting codeRoom={props.codeRoom} player={props.player} />;
  }
  return <UserGreeting />;
}
function App() {
  //Room State
  const [codeRoom, setCodeRoom ] = useState("");
  const [inRoom, setInRoom ] = useState(false);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (codeRoom !== "" && name!== "") {
      socket.emit("join_room",{"codeRoom" :codeRoom,"name":name});
      socket.on("receive_message", (data) => {
        setMessageReceived(data.status);
        setPlayers(data.players)
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
      alert("Vous devez renseigner un pseudo et un code de party spour jouer !");
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, codeRoom });
  };

  const listenServer = () => {
    socket.on("receive_message", (data) => {
      if (data.status === "new player"){
        setPlayers(data.players)
      }
    });
  }

  const createRoom = () => {
    if (name!==""){
      setCodeRoom(uuid());
      setInRoom(true);
      socket.emit("create_room", {"codeRoom" :codeRoom,"name":name});
      console.log("Create Room with code :" + codeRoom);
      listenServer();
    }else{
      alert("Vous devez renseigner un pseudo pour jouer !");
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Pseudo"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
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