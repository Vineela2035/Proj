import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Rent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const userLocation = params.get("location") || "Unknown Location";
    const { equipmentId } = useParams();

    const equipments = [
        { id: "1", name: "Tractor", price: "₹500/day" },
        { id: "2", name: "Plough", price: "₹200/day" },
        { id: "3", name: "Seeder", price: "₹300/day" },
    ];

    const [formData, setFormData] = useState({
        location: "",
        rentalDate: "",
        duration: "1",
        customDuration: "", // New state for custom duration
        contactNumber: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateForm = () => {
        const newErrors = {};
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.rentalDate) newErrors.rentalDate = "Rental date is required";
        if (!/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = "Valid 10-digit phone required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const selectedEquipment = equipments.find(eq => eq.id === equipmentId);
            alert(`Rental request submitted for ${selectedEquipment?.name} at ${formData.location}`);
            navigate("/");
        }
    };

    // ✅ If an equipment is selected, show the rental form
    if (equipmentId) {
        const selectedEquipment = equipments.find(eq => eq.id === equipmentId);

        return (
            <div className="form-container">
                <h2>Rent {selectedEquipment?.name}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="location" placeholder="Delivery Location" value={formData.location} onChange={handleChange} />
                    {errors.location && <p className="error">{errors.location}</p>}

                    <input type="date" name="rentalDate" value={formData.rentalDate} onChange={handleChange} />
                    {errors.rentalDate && <p className="error">{errors.rentalDate}</p>}

                    {/* Updated duration input with 'Other' option */}
                    <div>
                        <select name="duration" value={formData.duration} onChange={handleChange} className="select-duration">
                            <option value="1">1 day</option>
                            <option value="3">3 days</option>
                            <option value="7">1 week</option>
                            <option value="30">1 month</option>
                            <option value="other">Other</option>
                        </select>

                        {/* If 'Other' is selected, show the custom duration input */}
                        {formData.duration === "other" && (
                            <input 
                                type="number" 
                                name="customDuration" 
                                placeholder="Enter custom duration (in days)" 
                                value={formData.customDuration} 
                                onChange={handleChange} 
                                className="custom-duration-input" 
                            />
                        )}
                    </div>

                    <input type="tel" name="contactNumber" placeholder="Enter 10-digit phone number" value={formData.contactNumber} onChange={handleChange} />
                    {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}

                    <button type="submit" className="submit-button">Confirm Rental</button>
                </form>
            </div>
        );
    }

    // ✅ If no equipment is selected, show the equipment list
    return (
        <div className="equipment-container">
            <h2>Available Equipment for {userLocation}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Equipment</th>
                        <th>Rental Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="rent-now-btn" onClick={() => navigate(`/rent/${item.id}`)}>Rent Now</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rent;
