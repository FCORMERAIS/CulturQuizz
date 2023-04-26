import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "scenes/Layout";
import Home from "./scenes/Home";
import Quizz from "./scenes/quizz/quizz";
import Question from "./scenes/questionAdd/question";
import NoPage from "scenes/NoPage";
// import Context from "./gameContext";


export default function App() {
  
  return (
    <BrowserRouter>
    {/* <Context.Provider value={null}> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Quizz" element={<Quizz/>} />
          <Route path="Question" element={<Question/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {/* </Context.Provider> */}
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);