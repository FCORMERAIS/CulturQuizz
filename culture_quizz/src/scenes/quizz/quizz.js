// Page qui permet de répondre aux questions, voir son score et jouer aves les autres joueurs dans la partie.

import React, { useState,useEffect  } from "react";
import "./quizz.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionPass,setQuestionPass] = useState([]);
  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    console.log(currentQuestion)
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
    let tempo = questionPass
    tempo.push(currentQuestion)
    setQuestionPass(tempo)
    if (questionPass.length === questions.length-1) {
      setQuestionPass([])
    }
    let aleatory = -1
    while (aleatory === -1 || questionPass.indexOf(aleatory) !== -1) {
      aleatory = Math.floor(Math.random() * questions.length)
    }
    setCurrentQuestion(aleatory);
  };
  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(Math.random() * questions.length);
    setShowResults(false);
  };

useEffect(() => {
  // Fetch data from URL using promise
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/questions');
      const data = await response.json();
      setQuestions(data);
      setIsLoading(false);
      setCurrentQuestion(Math.random() * questions.length)
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);

  function DisplayObjectsByType({ data }) {
    if (data.type === "Question4choices") {
      return (<div key={data.id}>Type 1 object: {data.text}
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
      return (<div key={data.id}>Type 2 object: {data.text}<ul>
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
      return(<div><button onClick={() => optionClicked(data.options[0].isCorrect)} class="button">Vrai !</button>
      <button onClick={() => optionClicked(data.options [1].isCorrect)} class="button">Faux !</button>
      </div>);
    }
    if (data.type === "Text") {
      return (<div class="form__group field">
      <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
      <input type="submit" onClick={() => optionClicked(true)}/>
    </div>);
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
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <div class="question-card">
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <div>
            <DisplayObjectsByType data={questions[currentQuestion]} />
          </div>
          {/* List of possible answers  */}
        </div>
      ))}
    </div>
  );
}

export default App;