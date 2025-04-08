import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css"; // Your styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("loggedInUser");
    if (userLoggedIn) {
      navigate("/", { replace: true }); // Redirect to homepage if user is already logged in
    }
  }, [navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");

    // Retrieve stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    const existingUser = storedUsers.find((user) => user.email === email);

    if (existingUser) {
      alert("Welcome back! Logging in...");
      localStorage.setItem("loggedInUser", email); // Store login session
      navigate("/", { replace: true }); // Redirect to Home page after successful login
    } else {
      alert("No account found. Redirecting to signup...");
      navigate("/signup", { replace: true }); // Redirect to Signup page if no account found
    }
  };

  return (
    <div className="auth-container">
      <div className="page-container">
        <h2>Login / Signup</h2>
        <form onSubmit={handleContinue}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          New user?{" "}
          <span
            className="link"
            onClick={() => navigate("/signup", { replace: true })} // Navigate to Signup page if user is new
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
