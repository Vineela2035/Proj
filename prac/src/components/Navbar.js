import React from "react";
import { Link } from "react-router-dom";
import "../mystyle.css"; // Your styles

const Navbar = ({ isLoggedIn }) => {
  return (
    <div className="navbar">
      {/* Logo and Title */}
      <header className="header">
        <Link to="/">
          <img src="/images/Agriserv.jpeg" alt="AgriServ Logo" className="logo" />
        </Link>
        <h1 className="title">AgriServ</h1>
      </header>

      {/* Navigation Menu */}
      <nav>
        {["Home", "Daily Updates"].map((menu, index) => (
          <div className="dropdown" key={index}>
            <Link to={menu === "Home" ? "/" : `/${menu.toLowerCase().replace(" ", "-")}`}>{menu}</Link>
            <div className="dropdown-content">
              {menu === "Daily Updates" && (
                <>
                  <Link to="/prices">Market Prices 📊</Link>
                  <Link to="/schemes">Schemes 📰</Link>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Login/Signup Button or Logout */}
        <div className="dropdown">
          {!isLoggedIn ? (
            <Link to="/login" className="login-link">Login/Signup</Link>
          ) : (
            <Link to="/" className="logout-link" onClick={() => {
              localStorage.removeItem("loggedInUser"); // Log the user out
              window.location.reload(); // Refresh the page
            }}>
              Logout
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
