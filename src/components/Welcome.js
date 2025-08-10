// src/components/Welcome.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser, isAuthenticated } from "../utils/auth";
import "../styles/Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  }, [navigate]);

  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome, {user?.name || user?.email || "User"}!</h1>
      <p>Email: {user?.email || "Not available"}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
