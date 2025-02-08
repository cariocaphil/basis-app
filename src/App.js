import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      {/* Navigation Menu */}
      <nav style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa" }}>
        <Link to="/" style={{ margin: "10px", textDecoration: "none", fontSize: "18px" }}>🏠 Home</Link>
        <Link to="/dashboard" style={{ margin: "10px", textDecoration: "none", fontSize: "18px" }}>📊 Dashboard</Link>
      </nav>

      {/* Routes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
