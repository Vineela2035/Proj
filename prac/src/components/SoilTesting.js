import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link for routing
import './SoilTesting.css'; // You can create a separate CSS file for custom styles

const SoilTesting = () => {
  const [samples, setSamples] = useState([]);
  const [newSample, setNewSample] = useState({
    pH: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organicMatter: "",
    recommendedCrop: "",
  });

  // Function to determine the recommended crop
  const getRecommendedCrop = (pH, nitrogen, phosphorus, potassium, organicMatter) => {
    if (pH >= 6.0 && pH <= 7.0 && nitrogen >= 45 && nitrogen <= 55 && phosphorus >= 20 && phosphorus <= 30) {
      return "Wheat";
    } else if (pH >= 7.0 && nitrogen >= 40 && phosphorus >= 25) {
      return "Rice";
    } else if (pH >= 6.5 && pH <= 7.0 && nitrogen >= 48) {
      return "Corn";
    } else if (pH <= 6.0 && nitrogen >= 58) {
      return "Cotton";
    } else if (pH >= 6.5 && phosphorus >= 21 && potassium >= 30) {
      return "Turmeric";
    } else if (pH >= 6.7 && phosphorus >= 19 && potassium >= 34) {
      return "Chillies";
    } else {
      return "Other";
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewSample({ ...newSample, [e.target.name]: e.target.value });
  };

  // Add new soil sample
  const addSoilSample = (e) => {
    e.preventDefault(); // Prevent the form submission default behavior

    // Validation: Check if all fields have numeric values
    const { pH, nitrogen, phosphorus, potassium, organicMatter } = newSample;
    if (
      !pH || !nitrogen || !phosphorus || !potassium || !organicMatter ||
      isNaN(pH) || isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium) || isNaN(organicMatter)
    ) {
      alert("Please enter valid numeric values for all fields.");
      return;
    }

    const recommendedCrop = getRecommendedCrop(
      parseFloat(newSample.pH),
      parseInt(newSample.nitrogen),
      parseInt(newSample.phosphorus),
      parseInt(newSample.potassium),
      parseFloat(newSample.organicMatter)
    );

    const sampleWithCrop = { ...newSample, recommendedCrop };

    setSamples([...samples, sampleWithCrop]);

    setNewSample({ pH: "", nitrogen: "", phosphorus: "", potassium: "", organicMatter: "", recommendedCrop: "" });
  };

  return (
    <div className="soil-testing-container">
      <h2>🌱 Digital Soil Testing & Analysis</h2>

      {/* Input Form */}
      <form className="soil-form" onSubmit={addSoilSample}>
        <input type="number" name="pH" placeholder="pH Level" value={newSample.pH} onChange={handleInputChange} />
        <input type="number" name="nitrogen" placeholder="Nitrogen" value={newSample.nitrogen} onChange={handleInputChange} />
        <input type="number" name="phosphorus" placeholder="Phosphorus" value={newSample.phosphorus} onChange={handleInputChange} />
        <input type="number" name="potassium" placeholder="Potassium" value={newSample.potassium} onChange={handleInputChange} />
        <input type="number" name="organicMatter" placeholder="Organic Matter (%)" value={newSample.organicMatter} onChange={handleInputChange} />
        <button type="submit">➕ Add Soil Sample</button>
      </form>

      {/* Display Soil Samples */}
      <div className="soil-samples">
        {samples.map((sample, index) => (
          <div key={index} className="sample-card">
            <p><strong>pH:</strong> {sample.pH}</p>
            <p><strong>Nitrogen:</strong> {sample.nitrogen}</p>
            <p><strong>Phosphorus:</strong> {sample.phosphorus}</p>
            <p><strong>Potassium:</strong> {sample.potassium}</p>
            <p><strong>Organic Matter:</strong> {sample.organicMatter}%</p>
            <p><strong>🌾 Recommended Crop:</strong> {sample.recommendedCrop}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default SoilTesting;
