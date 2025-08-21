import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>🎓 Student Management System</h1>
      <div className="button-group">
        <button onClick={() => navigate("/register")}>Student Registration</button>
        <button onClick={() => navigate("/update")}>Update Student Details</button>
        <button onClick={() => navigate("/payment")}>Course Fee Payment</button>
      </div>
    </div>
  );
}

export default LandingPage;
