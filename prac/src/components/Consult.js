import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../mystyle.css"; // Ensure this CSS file exists

const experts = [
  {
    name: "Dr. Ramesh Patil",
    specialization: "Soil Science",
    username: "ramesh.patil@example.com",
    experience: "15 years",
    languages: ["English", "Hindi", "Marathi"],
  },
  {
    name: "Ms. Aditi Sharma",
    specialization: "Crop Management",
    username: "aditi.sharma@example.com",
    experience: "10 years",
    languages: ["English", "Hindi"],
  },
  {
    name: "Dr. Kiran Das",
    specialization: "Agronomy",
    username: "kiran.das@example.com",
    experience: "12 years",
    languages: ["English", "Bengali", "Hindi"],
  },
  {
    name: "Mr. Vijay Rao",
    specialization: "Irrigation Specialist",
    username: "vijay.rao@example.com",
    experience: "20 years",
    languages: ["English", "Telugu"],
  },
  {
    name: "Dr. Meera Nair",
    specialization: "Organic Farming",
    username: "meera.nair@example.com",
    experience: "18 years",
    languages: ["English", "Malayalam", "Hindi"],
  },
  {
    name: "Dr. Suraj Bansal",
    specialization: "Pesticide Management",
    username: "suraj.bansal@example.com",
    experience: "14 years",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    name: "Ms. Sneha Iyer",
    specialization: "Precision Agriculture",
    username: "sneha.iyer@example.com",
    experience: "9 years",
    languages: ["English", "Tamil"],
  },
  {
    name: "Dr. Ravi Verma",
    specialization: "Agroforestry",
    username: "ravi.verma@example.com",
    experience: "16 years",
    languages: ["English", "Hindi"],
  },
  {
    name: "Dr. Anjali Kapoor",
    specialization: "Plant Pathology",
    username: "anjali.kapoor@example.com",
    experience: "11 years",
    languages: ["English", "Gujarati", "Hindi"],
  },
  {
    name: "Mr. Sanjay Kulkarni",
    specialization: "Dairy Farming",
    username: "sanjay.kulkarni@example.com",
    experience: "13 years",
    languages: ["English", "Marathi"],
  }
];

const ConsultPage = () => {
  const [confirmation, setConfirmation] = useState({ expert: "", message: "" });

  // Function to handle appointment booking
  const handleBookAppointment = (expertName) => {
    setConfirmation({
      expert: expertName,
      message: `Appointment with ${expertName} confirmed! You will receive a notification in 5 minutes.`
    });

    // Auto-hide message after 5 seconds
    setTimeout(() => setConfirmation({ expert: "", message: "" }), 5000);
  };

  return (
    <div className="consult-container">
      <h2 className="page-title">Agri-Expert Consultation</h2>
      <p className="page-description">Connect with top agriculture experts for expert advice.</p>

      <div className="experts-container">
        {experts.map((expert, index) => (
          <div key={index} className="expert-card">
            <div className="expert-header">
              <h3 className="expert-name">{expert.name}</h3>
            </div>

            <p><strong>Specialization:</strong> {expert.specialization}</p>
            <p><strong>Experience:</strong> {expert.experience}</p>
            <p><strong>Languages:</strong> {expert.languages.join(", ")}</p>
            <p><strong>Username:</strong> {expert.username}</p>

            <button 
              className="book-appointment" 
              onClick={() => handleBookAppointment(expert.name)}
            >
              Book Appointment
            </button>

            {/* Show confirmation message only for the clicked expert */}
            {confirmation.expert === expert.name && (
              <p className="confirmation-message">{confirmation.message}</p>
            )}
          </div>
        ))}
      </div>

      {/* 🔙 Back to Home Button */}
      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default ConsultPage;
