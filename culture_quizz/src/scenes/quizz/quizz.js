import React, { useState } from "react";
import "./quizz.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: "Quel odeur émane de Marius !",
      type : "Question4choices",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text: "Question 2",
      type : "Question4choices",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text: "Question 3",
      type : "Question3choices",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text: "Question 4 ",
      type : "Question4choices",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text : "Marius est t'il beau ? ",
      type : "TrueFalse",
      options: [
        { id: 0, text: "true", isCorrect: false },
        { id: 1, text: "false", isCorrect: true },
      ],
    },
    {
      text : "cite 2 qualités de Marius",
      type : "Text",
    }
  ];

  // Helper Functions

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
      {/* 1. Header  */}
      <h1>Question Culture Général</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <div>
            <DisplayObjectsByType data={questions[currentQuestion]} />
          </div>
          {/* List of possible answers  */}
        </div>
      )}
    </div>
  );
}

export default App;