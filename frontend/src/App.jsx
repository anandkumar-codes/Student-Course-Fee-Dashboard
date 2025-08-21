// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentRegister from "./pages/StudentRegister";
import StudentUpdate from "./pages/StudentUpdate";
import CourseFeePayment from "./pages/CourseFeePayment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/update" element={<StudentUpdate />} />
        <Route path="/payment" element={<CourseFeePayment />} />
      </Routes>
    </Router>
  );
}

export default App;
