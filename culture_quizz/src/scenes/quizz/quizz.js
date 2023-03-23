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
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text: "Question 2",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text: "Question 3",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
    {
      text: "Question 4 ",
      options: [
        { id: 0, text: "Les fleurs j'adore ! <3", isCorrect: false },
        { id: 1, text: "Les bonbons... J'ai envie de le croquer ", isCorrect: false },
        { id: 2, text: "Le Parfum. Quel homme chic ! ", isCorrect: false },
        { id: 3, text: "Les poubelles ! C'est bon frère vas prendre une douche XoX", isCorrect: true },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

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
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
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
        </div>
      )}
    </div>
  );
}

export default App;