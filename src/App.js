import React from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LearnPage />} />
        <Route exact path="/edit" element={<EditPage />} />
        <Route exact path="/practice" element={<PracticePage />} />
      </Routes>
    </>
  );
}

export default App;
