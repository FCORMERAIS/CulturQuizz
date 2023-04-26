import React, { useState,useEffect  } from "react";
import "./quizz.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(Math.floor(Math.random() * questions.length));

  };
  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
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
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);

  console.log(questions)
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
    <div className="App">
      <h1>Question Culture Général</h1>

      <h2>Score: {score}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ):(showResults ? (
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <div className="question-card">
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