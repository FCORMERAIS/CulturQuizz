import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

const socket = io.connect("http://localhost:3002");

function App() {
  //Room State
  const [codeRoom, setCodeRoom ] = useState("");
  const [inRoom, setInRoom ] = useState(false);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [isCreator, setIsCreator ] = useState(false);

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
  
  const StartGame =() =>{
    console.log("partie lancé");
    socket.emit("send_message",{status:"StartGame",room:codeRoom});
  }

  const joinRoom = () => {
    if (codeRoom !== "" && name!== "") {
      socket.emit("join_room",{"codeRoom" :codeRoom,"name":name});
      socket.on("receive_message", (data) => {
        setMessageReceived(data.status);
        console.log(data.status+ " : data");
        console.log(messageReceived+ " : message");
        
        setPlayers(data.players);
      });
      console.log(messageReceived)
      if (messageReceived === "no room"){
        console.log("Aucune room existante avec ce code")
        setInRoom(false);
      }else{
        console.log("Join room");
        setInRoom(true);
        listenServer();
        setIsCreator(false);
      }
    }else{
      alert("Vous devez renseigner un pseudo et un code de partie spour jouer !");
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
      let uuidCode = uuid()
      setCodeRoom(uuidCode);
      setInRoom(true);
      setIsCreator(true);
      console.log(inRoom);
      socket.emit("create_room", {"codeRoom" :uuidCode,"name":name});
      console.log("Create Room with code :" + uuidCode);
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