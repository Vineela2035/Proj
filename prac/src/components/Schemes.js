import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from"../mystyle.css";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API fetch (replace this with an actual API call if needed)
    setTimeout(() => {
      const fetchedSchemes = [
        {
          sr_no: 1,
          title: "Agriculture Infrastructure Fund",
          publish_date: "12-06-2024",
          details: "Download (341 KB) pdf",
          link: "https://agriwelfare.gov.in/Documents/AIF_Guidelines_English_12Jun24.pdf",
        },
        {
          sr_no: 2,
          title: "PM-Kisan Samman Nidhi",
          publish_date: "28-12-2023",
          details: "Link",
          link: "#",
        },
        {
          sr_no: 3,
          title: "ATMA",
          publish_date: "03-10-2018",
          details: "Download (1.17 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/ATMA-Guidelines%202018.pdf",
        },
        {
          sr_no: 4,
          title: "AGMARKNET",
          publish_date: "14-03-2014",
          details: "Download (1.03 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Agmarknet_Guidelines.pdf",
        },
        {
          sr_no: 5,
          title: "Horticulture",
          publish_date: "05-04-2014",
          details: "Download (691.68 KB) pdf",
          link: "https://agriwelfare.gov.in/Documents/midh_Guidelines.pdf",
        },
        {
          sr_no: 6,
          title: "Online Pesticide Registration",
          publish_date: "23-09-2009",
          details: "Download (1.25 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Pesticides_Registration.pdf",
        },
        {
          sr_no: 7,
          title: "Plant Quarantine Clearance",
          publish_date: "05-01-2011",
          details: "Download (8.89 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Quarantine_Guidelinespdf.pdf",
        },
        {
          sr_no: 8,
          title: "DBT in Agriculture",
          publish_date: "12-05-2014",
          details: "Download (749.24 KB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Guideline_DBTinAgriculture.pdf",
        },
        {
          sr_no: 9,
          title: "Pradhanmantri Krishi Sinchayee Yojana",
          publish_date: "06-05-2016",
          details: "Download (244.46 KB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Guidelines_PMKSY.pdf",
        },
        {
          sr_no: 10,
          title: "Kisan Call Center",
          publish_date: "01-05-2015",
          details: "Link",
          link: "#",
        },
        {
          sr_no: 11,
          title: "mKisan",
          publish_date: "06-05-2015",
          details: "Link",
          link: "#",
        },
        {
          sr_no: 12,
          title: "Jaivik Kheti",
          publish_date: "18-05-2015",
          details: "Download (1.24 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Jaivik_Kheti_Guidelines.pdf",
        },
        {
          sr_no: 13,
          title: "e-Nam",
          publish_date: "04-10-2016",
          details: "Download (459.07 KB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Enamguidelines.pdf",
        },
        {
          sr_no: 14,
          title: "Soil Health Card",
          publish_date: "01-09-2016",
          details: "Download (1.1 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/Guidelines_Soil%20Health%20Card.pdf",
        },
        {
          sr_no: 15,
          title: "Pradhan Mantri Fasal Bima Yojana",
          publish_date: "05-08-2017",
          details: "Download (1.09 MB) pdf",
          link: "https://agriwelfare.gov.in/Documents/PMFBY_Guidelines.pdf",
        },
      ];

      setSchemes(fetchedSchemes);
      setLoading(false);
    }, 1000); // Simulated network delay
  }, []);

  return (
    <div className="schemes-container">
      <h2>Agricultural Schemes</h2>

      {loading ? (
        <p>Loading schemes...</p>
      ) : schemes.length > 0 ? (
        <table className="schemes-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Title</th>
              <th>Publish Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme.sr_no}>
                <td>{scheme.sr_no}</td>
                <td>{scheme.title}</td>
                <td>{scheme.publish_date}</td>
                <td>
                  {scheme.link !== "#" ? (
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      {scheme.details}
                    </a>
                  ) : (
                    <span>{scheme.details}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schemes available.</p>
      )}
      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default Schemes;
