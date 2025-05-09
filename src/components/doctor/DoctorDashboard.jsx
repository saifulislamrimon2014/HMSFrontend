import '../Homepage.css';
import './Doctor.css';
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import DoctorHeader from './DoctorHeader';
import DoctorFooter from './DoctorFooter';
import axios from 'axios';



const DoctorDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();


    // ✅ Fetch logged-in user info
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const res = await axios.get(`http://localhost:8000/api/user/${currentUser.uid}/`);
            setUserDetails(res.data);
          } catch (error) {
            console.error("Error fetching patient data:", error);
            toast.error("User data not found", { position: "top-center" });
          }
        } else {
          setUserDetails(null);
          navigate("/DoctorLogin");
        }
      });
  
      return () => unsubscribe();
    }, [navigate]);
  
    // ✅ Fetch dashboard statistics from MongoDB
    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/api/dashboard/');
          console.log("Dashboard data:", response.data); // 👈 Important to confirm
          setDashboardData(response.data);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          toast.error("Error fetching dashboard data");
        }
      };
    
      fetchDashboardData();
  }, []);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/DoctorLogin");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.error("Logout error:", error);
    }
  };


  const [dashboardData, setDashboardData] = useState({
    DocID: 0,
    PendingAppointment: 0,
    RegisteredPatient: 0,
    Referral: 0,
    OnlineConsultation: 0,  
});
  



  
  return (
    <div className="DoctorDashboard">

      <DoctorHeader />
                
      <div className="welcome-section">
                    <h3>Welcome to your panel, Dr. {userDetails?.firstName || ''}!</h3>
                    <p>
                        You can now manage your appointments, view patient records, and handle online consultations with ease.
                    </p>
                    </div>

                <div className="dashboard-container">

                <div className="dashboard-card">
                    <h5>PENDING APPOINTMENTS</h5>
                    {/* <div className="circle-progress">35%</div> */}
                    <h2>{dashboardData.PendingAppointment}</h2>
                </div>
                <div className="dashboard-card">
                    <h5>REGISTERED PATIENTS</h5>
                    {/* <div className="circle-progress">25%</div> */}
                    <h2>{dashboardData.RegisteredPatient}</h2>
                </div>
                <div className="dashboard-card">
                    <h5>REFERRALS</h5>
                    {/* <div className="circle-progress">25%</div> */}
                    <h2>{dashboardData.Referral}</h2>
                </div>
                <div className="dashboard-card">
                    <h5>ONLINE CONSULTATIONS</h5>
                    {/* <div className="circle-progress">25%</div> */}
                    <h2>{dashboardData.OnlineConsultation}</h2>
                </div>
        </div>
        <DoctorFooter/>


    </div>
  );
};

export default DoctorDashboard;
