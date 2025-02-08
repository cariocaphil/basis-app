import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Welcome to the Financial Platform</h2>

      {/* Navigation Button to Dashboard */}
      <Link to="/dashboard" style={{
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        marginBottom: "20px",
      }}>
        📊 Go to Dashboard
      </Link>

      {/* Embedded Micro-Frontend (e.g., Currency Converter) */}
      <br />
      <iframe
        src="https://cariocaphil.github.io/remote-app-4"
        width="450"
        height="400"
        style={{
          border: "none",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      />
    </div>
  );
};

export default HomePage;
