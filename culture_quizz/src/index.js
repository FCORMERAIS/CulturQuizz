import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "scenes/LoginOrSignIn/Layout";
import Home from "./Home";
import Quizz from "./scenes/quizz/quizz";
import Question from "./scenes/questionAdd/question";
import NoPage from "scenes/LoginOrSignIn/NoPage";
import Login from "./scenes/LoginOrSignIn/Login"
import Signin from "./scenes/LoginOrSignIn/Signin"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="Quizz" element={<Quizz/>} />
          <Route path="Question" element={<Question/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);