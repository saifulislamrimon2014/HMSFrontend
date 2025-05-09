import '../Homepage.css';
import './patient.css';
import './PatientHeader.css';
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from 'axios';


const PatientHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/${currentUser.uid}/`);
          setUserDetails(response.data);
        } catch (error) {
          console.error("MongoDB user fetch error:", error);
          toast.error("No user data found", { position: "top-center" });
        }
      } else {
        setUserDetails(null);
        navigate("/PatientLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/PatientLogin");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="PatientHeader">
      <header className="top-header">
        <div className="contact-info">
          <span>Emergency: +8801825674348</span>
        </div>

        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </div>
          <ul>
            <li className={location.pathname === "/PatientDashboard" ? "active-nav" : ""}>
              <Link to="/PatientDashboard">Patient's Dashboard</Link>
            </li>

            <li className={
                location.pathname === "/PrescriptionReport" || location.pathname === "/PrescriptionReport"
                    ? "active-nav"
                    : ""
                }>
                <Link to="/PatientMedicalPage">Prescription & Report</Link>
            </li>

            <li className={
                location.pathname === "/PatientAppointments" || location.pathname === "/PatientAppointment" || location.pathname === "/AppointmentSchedule"
                    ? "active-nav"
                    : ""
                }>
                <Link to="/PatientAppointments">My Appointments</Link>
            </li>

            <li className={
                location.pathname === "/PatientPayment" || location.pathname === "/PatientPayment"
                    ? "active-nav"
                    : ""
                }>
                <Link to="/PatientPayment">Payment</Link>
            </li>


            <p>|</p>
            <li className={location.pathname === "/DoctorProfile" ? "active-nav" : ""}>
              <Link to="/profile">Edit Profile</Link>
            </li>
            <li onClick={handleLogout}>Signout</li>
            <li>{userDetails?.firstName ?  <Link to="/profile">{userDetails.firstName}</Link> : "Loading..."}</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default PatientHeader;