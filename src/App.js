import React from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";
import RandomPractice from "./pages/RandomPractice";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "../src/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LearnPage />} />
          <Route
            exact
            path="/edit"
            element={
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>
            }
          />
          <Route exact path="/practice" element={<PracticePage />} />
          <Route exact path="/random-practice" element={<RandomPractice />} />
          <Route exact path="/signin" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
