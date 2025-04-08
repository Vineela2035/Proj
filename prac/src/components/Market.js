import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

const MarketDashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedCommodities, setExpandedCommodities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart references
  const commodityChartRef = useRef(null);
  const marketChartRef = useRef(null);
  const chartInstances = useRef({});

  // Fetch Market Data
  useEffect(() => {
    axios
      .get("http://localhost:5000/market")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setMarketData(response.data);
        } else {
          setMarketData([]); // Prevent undefined errors
          setError("Invalid data format received");
        }
      })
      .catch(() => {
        setMarketData([]); // Prevent undefined errors
        setError("  ");
      })
      .finally(() => setLoading(false));
  }, []);

  // Provide sample data if the API fails
  useEffect(() => {
    if (marketData.length === 0) {
      const sampleData = [
        {
          category: "Grains",
          commodities: [
            { name: "Wheat", varieties: [{ name: "Standard", max: 2200, min: 1800, modal: 2000 }] },
            { name: "Rice", varieties: [{ name: "Basmati", max: 2500, min: 2000, modal: 2300 }] },
            { name: "Barley", varieties: [{ name: "Hulled", max: 1800, min: 1500, modal: 1650 }] },
            { name: "Maize", varieties: [{ name: "Sweet Corn", max: 2100, min: 1700, modal: 1900 }] },
            { name: "Millet", varieties: [{ name: "Pearl", max: 2000, min: 1600, modal: 1800 }] },
            { name: "Oats", varieties: [{ name: "Rolled", max: 2200, min: 1900, modal: 2050 }] },
            { name: "Sorghum", varieties: [{ name: "Jowar", max: 1800, min: 1400, modal: 1600 }] }
          ]
        },
        {
          category: "Fruits",
          commodities: [
            { name: "Apple", varieties: [{ name: "Red", max: 150, min: 100, modal: 130 }] },
            { name: "Banana", varieties: [{ name: "Cavendish", max: 40, min: 20, modal: 30 }] },
            { name: "Mango", varieties: [{ name: "Alphonso", max: 300, min: 250, modal: 275 }] },
            { name: "Orange", varieties: [{ name: "Nagpur", max: 120, min: 90, modal: 110 }] },
            { name: "Grapes", varieties: [{ name: "Seedless", max: 160, min: 130, modal: 145 }] },
            { name: "Papaya", varieties: [{ name: "Solo", max: 90, min: 60, modal: 75 }] },
            { name: "Pomegranate", varieties: [{ name: "Bhagwa", max: 200, min: 160, modal: 180 }] }
          ]
        },
        {
          category: "Vegetables",
          commodities: [
            { name: "Potato", varieties: [{ name: "Local", max: 30, min: 20, modal: 25 }] },
            { name: "Tomato", varieties: [{ name: "Hybrid", max: 50, min: 30, modal: 40 }] },
            { name: "Carrot", varieties: [{ name: "Nantes", max: 60, min: 40, modal: 50 }] },
            { name: "Onion", varieties: [{ name: "Red Onion", max: 70, min: 50, modal: 60 }] },
            { name: "Brinjal", varieties: [{ name: "Long", max: 45, min: 30, modal: 40 }] },
            { name: "Spinach", varieties: [{ name: "Local", max: 35, min: 20, modal: 28 }] },
            { name: "Cabbage", varieties: [{ name: "Green", max: 40, min: 25, modal: 32 }] },
            { name: "Cauliflower", varieties: [{ name: "White", max: 55, min: 35, modal: 45 }] }
          ]
        }
      ];
      setMarketData(sampleData);
      setLoading(false);
    }
  }, [marketData]);

  // Update charts when data changes
  useEffect(() => {
    if (marketData.length > 0) {
      renderCharts();
    }
  }, [marketData, expandedCategories, expandedCommodities]);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Toggle commodity expansion
  const toggleCommodity = (category, commodity) => {
    const key = `${category}-${commodity}`;
    setExpandedCommodities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Function to render charts
  const renderCharts = () => {
    const destroyChart = (key) => {
      if (chartInstances.current[key]) {
        chartInstances.current[key].destroy();
        chartInstances.current[key] = null;
      }
    };

    destroyChart("commodityChart");
    destroyChart("marketChart");

    if (commodityChartRef.current) {
      chartInstances.current["commodityChart"] = new Chart(commodityChartRef.current, {
        type: "bar",
        data: {
          labels: marketData.flatMap((category) =>
            category.commodities.map((com) => com.name)
          ),
          datasets: [
            {
              label: "Max Price",
              data: marketData.flatMap((category) =>
                category.commodities.map((com) =>
                  com.varieties.length ? com.varieties[0].max : 0
                )
              ),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Min Price",
              data: marketData.flatMap((category) =>
                category.commodities.map((com) =>
                  com.varieties.length ? com.varieties[0].min : 0
                )
              ),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    if (marketChartRef.current) {
      chartInstances.current["marketChart"] = new Chart(marketChartRef.current, {
        type: "line",
        data: {
          labels: marketData.flatMap((category) =>
            category.commodities.map((com) => com.name)
          ),
          datasets: [
            {
              label: "Modal Price Trend",
              data: marketData.flatMap((category) =>
                category.commodities.map((com) =>
                  com.varieties.length ? com.varieties[0].modal : 0
                )
              ),
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  };

  return (
    <div className="market-dashboard">
      <h2>Market Dashboard</h2>

      {loading && <p>Loading market data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && marketData.length === 0 && <p>No data available.</p>}

      {/* Charts Section */}
      <div className="charts" style={{ display: "flex", gap: "10px" }}>
        <canvas ref={commodityChartRef} style={{ width: "300px", height: "150px" }}></canvas>
        <canvas ref={marketChartRef} style={{ width: "300px", height: "150px" }}></canvas>
      </div>

      {/* Market Prices Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Commodity</th>
            <th>MSP</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((categoryData) => (
            <React.Fragment key={categoryData.category}>
              {/* Category Row */}
              <tr>
                <td colSpan="2" style={{ backgroundColor: "#d3e5ff" }}>
                  <button onClick={() => toggleCategory(categoryData.category)}>
                    {expandedCategories[categoryData.category] ? "➖" : "➕"}
                  </button>{" "}
                  <strong>{categoryData.category}</strong>
                </td>
              </tr>

              {/* Commodities Under Category */}
              {expandedCategories[categoryData.category] &&
                categoryData.commodities.map((commodity) => (
                  <React.Fragment key={commodity.name}>
                    <tr>
                      <td>
                        <button
                          onClick={() =>
                            toggleCommodity(categoryData.category, commodity.name)
                          }
                        >
                          {expandedCommodities[
                            `${categoryData.category}-${commodity.name}`
                          ]
                            ? "➖"
                            : "➕"}
                        </button>{" "}
                        {commodity.name}
                      </td>
                      <td>-</td>
                    </tr>

                    {/* Price Table for Varieties */}
                    {expandedCommodities[`${categoryData.category}-${commodity.name}`] &&
                      commodity.varieties.length > 0 && (
                        <tr>
                          <td colSpan="2">
                            <table border="1" style={{ width: "100%" }}>
                              <thead>
                                <tr>
                                  <th>Variety</th>
                                  <th>Max</th>
                                  <th>Min</th>
                                  <th>Modal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {commodity.varieties.map((variety) => (
                                  <tr key={variety.name}>
                                    <td>{variety.name}</td>
                                    <td>{variety.max}</td>
                                    <td>{variety.min}</td>
                                    <td>{variety.modal}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default MarketDashboard;
