import React, { useState,useEffect  } from "react";
import {socket} from "../../io";
import "./quizz.css";
import Cookies from 'js-cookie';

function App() {
  // Properties
  let cookies = Cookies.get()
  if (cookies.Pseudo === undefined) {
    cookies.Pseudo = "Not Connected"
  }
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [codeRoom, setCodeRoom ] = useState("");
  const [nbQuestion, setNbQuestion ] = useState(0);
  const [players, setPlayers ] = useState([]);

  socket.on("question", (data) => {
    setQuestions(data["question"]);
    setNbQuestion(data.nbQuestion);
    console.log("nb question : " + nbQuestion);
    setCurrentQuestion(data.indexQ);
    setIsLoading(false);
  });
  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    console.log(currentQuestion)
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
    socket.emit("answer", {"codeRoom": codeRoom, "score":score,"name":cookies.Pseudo});
    setIsLoading(true);
    socket.on("question" , (data)=>{
      setQuestions(data["question"]);
      setIsLoading(false);
      setNbQuestion(data.nbQuestion);
      setCurrentQuestion(data.indexQ);

    console.log("nb question : " + nbQuestion);


      console.log("on vien de recevoir une question");
    })
    socket.on("ending", (data) => {
      setQuestions(data["question"]);
      setIsLoading(false);
      setCurrentQuestion(data.indexQ);
      setPlayers(data.players);
      setScores(data.scores);
      setShowResults(true);
    });
  };
  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setIsLoading(true);
    socket.emit("Restart",{codeRoom: codeRoom});
  };

useEffect(() => {
  // Fetch data from URL using promise
  console.log("arrivé sur la page");
  socket.on("question", (data) => {
    setCodeRoom(data.codeRoom);
    setNbQuestion(data.nbQuestion);
    console.log("nb question : " + nbQuestion);
    setQuestions(data["question"]);
    setIsLoading(false);
    setCurrentQuestion(data.indexQ);

  });
  
  }, []);
  function DisplayObjectsByType({ data }) {
    if (data.type === "Question4choices") {
      return (<div key={data.id}>{data["question"]}
            <ul>
            {data.options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
          </div>);
    }
    if (data.type === "Question3choices") {
      return (<div key={data.id}>{data.question}<ul>
      {data.options.map((option) => {
        return (
          <li
            key={option.id}
            onClick={() => optionClicked(option.isCorrect)}
          >
            {option.text}
          </li>
        );
      })}
    </ul>
    </div>);
    }
    if (data.type === "TrueFalse") {
      return(<div><div key={data.id}>{data.question}</div><button onClick={() => optionClicked(data.options[0].isCorrect)} class="button">Vrai !</button>
      <button onClick={() => optionClicked(data.options[1].isCorrect)} class="button">Faux !</button>
      </div>);
    }
    if (data.type === "Text") {
      return (<div key={data.id}>{data.question}<div class="form__group field">
      <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
      <input type="submit" onClick={() => optionClicked(true)}/>
    </div></div>);
    }
  }

  return (
    <div class="App">
      <h1>Question Culture Général</h1>
      <h2 id='score'>Score: {score}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ):(showResults ? (
        <div class="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {nbQuestion} correct - (
            {(score / nbQuestion) * 100}%)
          </h2>
          <ul>
            {players?.map((user,index) => (
              <li className="user">{user} : {scores[index]}</li>
            ))}
          </ul>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <div class="question-card">
          <h2>
            Question: {currentQuestion + 1} out of {nbQuestion}
          </h2>
          <div>
            <DisplayObjectsByType data={questions} />
          </div>
          {/* List of possible answers  */}
        </div>
      ))}
    </div>
  );
}

export default App;