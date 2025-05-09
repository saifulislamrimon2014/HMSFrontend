import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./PatientHeader.css";
import "./patient.css";


const PatientDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    PatID: 0,
    PatPendingAppointment: 0,
    PatDoctorCount: 0,
    PatDue: 0,
  });

  const navigate = useNavigate();

  // ✅ Fetch user details once logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserDetails(currentUser.uid);
      } else {
        setUserDetails(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // ✅ Separate async function to fetch user
  const fetchUserDetails = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${uid}/`);
      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching doctor user data:", error);
      toast.error("User data not found", { position: "top-center" });
    }
  };

  // ✅ Fetch dashboard data from MongoDB
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/api/patient-dashboard/");

        setDashboardData(res.data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
        toast.error("Error fetching dashboard data", { position: "top-center" });
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="PatientDashboard">
      <PatientHeader />

      <div className="welcome-section">
        <h3>Welcome to your panel,  {userDetails?.firstName || ''}!</h3>
        <p>
          You can now manage your appointments, payment, and other services.
        </p>
      </div>

      <div className="dashboard-container">
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h5>PENDING APPOINTMENTS</h5>
          <h2>{dashboardData.PatPendingAppointment}</h2>
        </div>

        <div className="dashboard-card">
          <h5>DOCTOR COUNT</h5>
          <h2>{dashboardData.PatDoctorCount}</h2>
        </div>

        <div className="dashboard-card">
          <h5>DUE</h5>
          <h2>{dashboardData.PatDue + " BDT"}</h2>
        </div>

        <div className="dashboard-card">
          <h5>AI CHAT</h5>
          <h2>OPEN</h2>
        </div>
      </div>


      </div>

      <DoctorFooter />
    </div>
  );
};

export default PatientDashboard;
