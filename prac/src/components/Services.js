import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../mystyle.css";

const Service = forwardRef((props, ref) => {
  const navigate = useNavigate(); // ✅ Initialize navigation function

  const handleRegister = () => {
    navigate("/register"); // Navigate to the Register page
  };

  return (
    <div ref={ref} id="services-section">
      {/* Equipment Section */}
      <section className="equipment-section">
        <div className="equipment-card">
          <h2>Provide Service</h2>
          <p>You can provide equipment for rent.</p>
          <button onClick={handleRegister}>Register Now</button> {/* Redirect to Register page */}
        </div>

        <div className="equipment-receive">
          <h2>Rent Equipments</h2>
          <p>Equipments for rent are available.</p>
          <button onClick={() => navigate("/location-form")}>Rent Now</button>
        </div>
      </section>

      {/* Local Produce Section */}
      <div className="Produce">
        <h2>Local Produce Listings</h2>
        <div className="card">
          <h3>Know Produce</h3>
          <button onClick={() => navigate("/local-produce")}>Know More</button>
          <p>Discover local produce best to grow near you.</p>
        </div>
      </div>

      {/* Information Section */}
      <div className="info-section">
        <div className="info-card">
          <h2>Digital Soil Testing & Analysis</h2>
          <div className="card">
            <h3>Stay Informed</h3>
            <button onClick={() => navigate("/soiltesting")}>Testing</button>
            <p> Best crops to grow on that soil.</p>
          </div>
        </div>

        <div className="info-card">
          <h2>Government Services and Schemes</h2>
          <div className="s_s">
            <h3>Know the Schemes</h3>
            <button onClick={() => navigate("/schemes")}>Schemes</button>
            <p>Know the services provided by Government.</p>
          </div>
        </div>
      </div>

      {/* Market Section */}
      <div className="Market">
        <h2>Smart Market</h2>
        <div className="sm">
          <h3>Know the Best Rates</h3>
          <button onClick={() => navigate("/market")}>Marketing</button>
          <p>Smart marketplace for seeds and farming inputs.</p>
        </div>
      </div>

      {/* Agri-Expert Consultation Section */}
      <div className="agri-section">
        <div className="agri-card">
          <h2>Agri-Expert Consultation Hub</h2>
          <div className="a_e">
            <h3>Meet the Expert Online</h3>
            <button onClick={() => navigate("/consult")} className="consult-btn">
              Consult an Expert
            </button>
            <p>Know best about your crops by meeting an expert.</p>
          </div>
        </div>

        <div className="agri-card">
          <h2>Community Q&A Forum</h2>
          <div className="q_a">
            <h3>Frequently Asked Questions</h3>
            <button onClick={() => navigate("/faq")}>Check On</button> {/* ✅ Navigates to FAQ page */}
            <p>Find answers to commonly asked farming questions.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Service;
