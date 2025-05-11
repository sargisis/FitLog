import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {username} 👋</h1>
        <p style={styles.subtitle}>Start tracking your nutrition today</p>

        <div style={styles.grid}>
          <Link to="/calculator" style={styles.navCard}>
            <span style={styles.emoji}>📊</span>
            <h3>Calorie Calculator</h3>
            <p>Track calories and macros in your meals.</p>
          </Link>

          <Link to="/meal-plan" style={styles.navCard}>
            <span style={styles.emoji}>🥗</span>
            <h3>Meal Plan</h3>
            <p>Get personalized food recommendations.</p>
          </Link>

          <Link to="/gemini" style={styles.navCard}>
            <span style={styles.emoji}>💬</span>
            <h3>Ask Gemini</h3>
            <p>Get smart advice from AI nutritionist.</p>
          </Link>
        </div>

        <blockquote style={styles.quote}>
          “Every bite is a step toward your goal.” 💪
        </blockquote>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    paddingTop: "40px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: "800px",
    width: "90%",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    color: "#d61a3c",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#444",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  navCard: {
    backgroundColor: "#fafafa",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "20px",
    width: "220px",
    textDecoration: "none",
    color: "#333",
    transition: "all 0.3s ease",
  },
  emoji: {
    fontSize: "32px",
    display: "block",
    marginBottom: "10px",
  },
  quote: {
    fontStyle: "italic",
    color: "#666",
    marginTop: "10px",
  },
};

export default Home;
