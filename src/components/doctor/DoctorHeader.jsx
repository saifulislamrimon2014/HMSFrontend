import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";
import "../Homepage.css";
import "./Doctor.css";

const DoctorHeader = () => {
  const { doctor, setDoctor } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    setDoctor(null);
    toast.success("Logged out successfully!");
    // navigate("/DoctorLogin");
    setTimeout(500);
    window.location.href = "/DoctorLogin"; // Redirect to DoctorLogin
  };

  return (
    <div className="DoctorHeader">
      <header className="top-header">
        <div className="contact-info">
          <span>Emergency: +8801825674348</span>
        </div>
        <nav className={`main-nav ${isMenuOpen ? "active" : ""}`}>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </div>
          <ul>
            <li className={location.pathname === "/DoctorDashboard" ? "active-nav" : ""}>
              <Link to="/DoctorDashboard">Doctor's Dashboard</Link>
            </li>
            <li className={location.pathname === "/DoctorAppointmentList" ? "active-nav" : ""}>
              <Link to="/DoctorAppointmentList">Appointments</Link>
            </li>
            <li className={["/DoctorRegisteredPatient", "/DoctorPatientDetails", "/DoctorIssuePrescription"].includes(location.pathname) ? "active-nav" : ""}>
              <Link to="/DoctorRegisteredPatient">Registered Patient</Link>
            </li>
            <li>Online Consultations</li>
            <li>Referrals</li>
            <p>|</p>
            <li className={location.pathname === "/DoctorProfile" ? "active-nav" : ""}>
              <Link to="/DoctorProfile">Edit Profile</Link>
            </li>
            <li onClick={handleLogout}>Signout</li>
            <li>{doctor?.DocName ? <Link to="/DoctorProfile">{doctor.DocName}</Link> : "Loading..."}</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default DoctorHeader;
