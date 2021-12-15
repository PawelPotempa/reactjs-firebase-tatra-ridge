import React from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";
import RandomPractice from "./pages/RandomPractice";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LearnPage />} />
        <Route exact path="/edit" element={<EditPage />} />
        <Route exact path="/practice" element={<PracticePage />} />
        <Route exact path="/random-practice" element={<RandomPractice />} />
      </Routes>
    </>
  );
}

export default App;
