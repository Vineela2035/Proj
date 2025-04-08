import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RentEquipments = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const userLocation = params.get("location") || "Unknown Location";

    const equipments = [
        { id: "1", name: "Tractor", price: "₹500/day" },
        { id: "2", name: "Plough", price: "₹200/day" },
        { id: "3", name: "Seeder", price: "₹300/day" },
        { id: "4", name: "Harvesting Machine", price: "₹800/day" },
        { id: "5", name: "Irrigation Pump", price: "₹400/day" },
        { id: "6", name: "Sprayer", price: "₹250/day" },
        { id: "7", name: "Tiller", price: "₹350/day" },
        { id: "8", name: "Fertilizer Spreader", price: "₹450/day" },
        { id: "9", name: "Water Tanker", price: "₹600/day" },
        { id: "10", name: "Soil Cultivator", price: "₹550/day" }
    ];

    // Filter the number of displayed equipment based on location
    let displayedEquipments = equipments; // Default: Show all
    if (userLocation === "Nandyal") {
        displayedEquipments = equipments.slice(0, 6); // Show only 6 items
    } else if (userLocation === "Vellore") {
        displayedEquipments = equipments.slice(0, 4); // Show only 4 items
    } // If Hyderabad or any other location, display all

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
                    {displayedEquipments.map((item) => (
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

export default RentEquipments;
