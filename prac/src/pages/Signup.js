import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css"; // Your styles

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate Email
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate Password
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic field validation
    if (!firstName || !lastName || !contact || !userId || !password || !confirmPassword) {
      setError("All fields must be filled!");
      return;
    }

    // Validate contact (must be an email or a phone number)
    if (isNaN(contact) && !validateEmail(contact)) {
      setError("Enter a valid email or phone number");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError("Password must contain uppercase, lowercase, number, and special character.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Store new user in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push({ firstName, lastName, contact, userId, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Account Created Successfully! Redirecting to Login...");
    navigate("/login", { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="page-container">
        <h2>Register</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="text" placeholder="Email or Phone" value={contact} onChange={(e) => setContact(e.target.value)} required />
          <input type="text" placeholder="Create User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit">Create Account</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login", { replace: true })}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
