import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Imported Link
import './register.css'; // Import the CSS file

const EquipmentRent = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [features, setFeatures] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [equipmentList, setEquipmentList] = useState([]);
  const navigate = useNavigate();

  // Fetch equipment list from server
  const fetchEquipments = async () => {
    try {
      const response = await fetch('http://localhost:5000/equipments');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setEquipmentList(data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
      alert("Failed to fetch equipment data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!equipmentName || !features || !condition || !price) {
      alert("All fields are required.");
      return;
    }

    const equipmentDetails = {
      equipmentName,
      features,
      condition,
      price: parseInt(price, 10), // Ensure price is converted to number
    };

    try {
      const response = await fetch('http://localhost:5000/equipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentDetails),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert('Equipment added successfully!');
      setEquipmentName('');
      setFeatures('');
      setCondition('');
      setPrice('');
      fetchEquipments(); // Re-fetch the list of equipment after adding
    } catch (error) {
      console.error("Error adding equipment:", error);
      alert('Failed to add equipment. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/equipments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert('Equipment deleted successfully!');
      fetchEquipments(); // Re-fetch after deletion
    } catch (error) {
      console.error("Error deleting equipment:", error);
      alert('Failed to delete equipment. Please try again.');
    }
  };

  const handleUpdate = async (id) => {
    if (!price) {
      alert("Please enter a price before updating.");
      return;
    }

    const updatedPrice = parseInt(price, 10);
    try {
      const response = await fetch(`http://localhost:5000/equipments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: updatedPrice }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert('Equipment updated successfully!');
      setPrice(''); // Clear price input after update
      fetchEquipments(); // Re-fetch after updating
    } catch (error) {
      console.error("Error updating equipment:", error);
      alert('Failed to update equipment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Provide Equipment for Rent</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Equipment Name</label>
          <input
            type="text"
            placeholder="Equipment Name"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Features</label>
          <textarea
            placeholder="Features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Condition</label>
          <input
            type="text"
            placeholder="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Price per day</label>
          <input
            type="number"
            placeholder="Price per day"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Equipment</button>
      </form>

      <h3>Available Equipment for Rent</h3>
      <ul>
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <li key={equipment.id}>
              <h4>{equipment.equipmentName}</h4>
              <p><strong>Features:</strong> {equipment.features}</p>
              <p><strong>Condition:</strong> {equipment.condition}</p>
              <p><strong>Price:</strong> ₹{equipment.price}</p>
              <button onClick={() => handleDelete(equipment.id)}>Delete</button>
              <button onClick={() => handleUpdate(equipment.id)}>Update Price</button>
            </li>
          ))
        ) : (
          <p>No equipment available for rent.</p>
        )}
      </ul>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default EquipmentRent;
