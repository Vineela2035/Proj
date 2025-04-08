import React from "react";
import style from "../mystyle.css";

function Hero() {
  const handleExploreClick = () => {
    const serviceSection = document.getElementById("services-section"); // ✅ Get element by ID
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth" }); // ✅ Scroll smoothly
    }
  };

  return (
    <div className="hero">
      <div>
        <h1>Farm Service Solutions</h1>
        <button onClick={handleExploreClick}>Explore Services</button>
      </div>
    </div>
  );
}

export default Hero;
