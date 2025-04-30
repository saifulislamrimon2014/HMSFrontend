import '../Homepage.css';
import './Doctor.css';
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";

const DoctorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "Users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            toast.error("No user data found", { position: "top-center" });
          }
        } catch (error) {
          toast.error("Error fetching user data", { position: "top-center" });
          console.error("Error:", error);
        }
      } else {
        setUserDetails(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  return (
    <div className="DoctorHeader">
      <header className="top-header">
        <div className="contact-info">
          <span>Emergency: +8801825674348</span>
        </div>

        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </div>
          <ul>
            <li className={location.pathname === "/DoctorDashboard" ? "active-nav" : ""}>
              <Link to="/DoctorDashboard">Doctor's Dashboard</Link>
            </li>
            <li className={location.pathname === "/DoctorAppointmentList" ? "active-nav" : ""}>
                <Link to="/DoctorAppointmentList">Appointments</Link>
            </li>

            <li className={
                location.pathname === "/DoctorRegisteredPatient" || location.pathname === "/DoctorPatientDetails" || location.pathname === "/DoctorIssuePrescription"
                    ? "active-nav"
                    : ""
                }>
                <Link to="/DoctorRegisteredPatient">Registered Patient</Link>
            </li>

            <li>Online Consultations</li>
            <li>Referrals</li>
            <p>|</p>
            <li className={location.pathname === "/DoctorProfile" ? "active-nav" : ""}>
              <Link to="/DoctorProfile">Edit Profile</Link>
            </li>
            <li onClick={handleLogout}>Signout</li>
            <li>{userDetails?.firstName ?  <Link to="/DoctorProfile">Dr. {userDetails.firstName}</Link> : "Loading..."}</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default DoctorHeader;
