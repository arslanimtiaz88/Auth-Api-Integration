// src/components/Navbar.js
import React from "react";
import { isAuthenticated, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const hideLogin = window.location.pathname === "/login";

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      {!hideLogin && (
        <nav className="navbar">
          <div className="logo" onClick={() => navigate("/welcome")}>Auth App</div>
          {isAuthenticated() && <button onClick={handleLogout}>Logout</button>}
        </nav>
      )}
    </>
  );
}
