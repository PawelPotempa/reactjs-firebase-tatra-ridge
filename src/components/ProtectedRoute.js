import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Route, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let auth = useAuth();
  return auth.currentUser ? children : <Navigate to="/signin" />;
}
