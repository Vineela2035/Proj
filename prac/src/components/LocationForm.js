import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../mystyle.css";

const LocationForm = () => {
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim() === "") {
            alert("Please enter a location.");
            return;
        }
        navigate(`/rent-equipments?location=${encodeURIComponent(location)}`); // ✅ Redirects to RentEquipments
    };

    return (
        <div className="form-container">
            <h2>Enter Your Location</h2>
            <form onSubmit={handleSubmit}>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location for renting equipment"
                    required
                />
                <button type="submit" className="submit-button">Proceed</button>
            </form>
        </div>
    );
};

export default LocationForm;
