import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./mystyle.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Service from "./components/Services"; // ✅ Services Page
import Faq from "./components/Faq"; // ✅ FAQ Page
import Footer from "./components/Footer";
import MarketDashboard from "./components/Market";
import SoilTesting from "./components/SoilTesting";
import LocalProduce from "./components/LocalProduce";
import Schemes from "./components/Schemes";
import ConsultPage from "./components/Consult";
import LocationForm from "./components/LocationForm";
import RentEquipments from "./components/RentEquipments";
import Rent from "./components/Rent";
import Register from "./components/Register";
import EquipmentRent from "./components/EquipmentRent";

import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function MainContent({ aboutRef, footerRef }) {
  const location = useLocation();

  const isHiddenPage = [
    "/consult", "/market", "/prices", "/news", "/local-produce", "/schemes", 
    "/location-form", "/rent-equipments", "/rent", "/register", "/soiltesting", "/faq"
  ].some(path => location.pathname.startsWith(path));

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && !isHiddenPage && <Hero />}
      {!isAuthPage && !isHiddenPage && <div ref={aboutRef}><About /></div>}
      {!isAuthPage && !isHiddenPage && <Service />}
      {!isAuthPage && !isHiddenPage && <div ref={footerRef}><Footer /></div>}
    </>
  );
}

function App() {
  const aboutRef = useRef(null);
  const footerRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("loggedInUser"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <>
        <Navbar isLoggedIn={isLoggedIn} aboutRef={aboutRef} footerRef={footerRef} />
        <Routes>
          {/* Basic Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />} />
          
          {/* Other Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/rent-equipment" element={<EquipmentRent />} />
          <Route path="/consult" element={<ConsultPage /> } />
          <Route path="/market" element={<MarketDashboard />} />
          <Route path="/prices" element={<MarketDashboard />} />
          <Route path="/soiltesting" element={<SoilTesting />} />
          <Route path="/local-produce" element={<LocalProduce />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/location-form" element={<LocationForm />} />
          <Route path="/rent-equipments" element={<RentEquipments />} />
          <Route path="/rent/:equipmentId" element={<Rent />} />
          
          {/* Additional Routes */}
          <Route path="/services" element={<Service />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <MainContent aboutRef={aboutRef} footerRef={footerRef} />
      </>
    </Router>
  );
}

export default App;
