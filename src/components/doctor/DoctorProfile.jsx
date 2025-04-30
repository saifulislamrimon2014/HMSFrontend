import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




function DoctorProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    dateOfBirth: '',
    address: '',
    bloodGroup: ''
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const navigate = useNavigate();

  const fetchUserData = () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          console.log("Fetching data for UID:", user.uid);
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Firestore data:", data);
            setUserDetails(data);
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              contactNumber: data.contactNumber || '',
              dateOfBirth: data.dateOfBirth || '',
              address: data.address || '',
              bloodGroup: data.bloodGroup || ''
            });
          } else {
            console.log("No document found for UID:", user.uid);
            toast.error("No user data found in Firestore", { position: "top-center" });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data", { position: "top-center" });
        }
      } else {
        console.log("No user is logged in");
        toast.error("Please log in to view your profile", { position: "top-center" });
        navigate("/login");
      }
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchUserData();
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "Users", user.uid), formData);
        setUserDetails({ ...userDetails, ...formData });
        setIsEditing(false);
        toast.success("Profile updated successfully!", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Error updating profile", { position: "top-center" });
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {userDetails ? (
          <>
            <div className="text-center mb-4">
              <img
                src={userDetails.photo || 'https://via.placeholder.com/150'}
                width="150"
                height="150"
                className="rounded-circle"
                alt="Profile"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
            
            <h2 className="text-center mb-4">
              Welcome, {userDetails.firstName}!
            </h2>
            
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Personal Information</h5>
                {!isEditing ? (
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div>
                    <button 
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <hr />
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{userDetails.firstName}</p>
                  )}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{userDetails.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Email</label>
                <p>{userDetails.email}</p>
              </div>
              
              </div>
              <div className="mb-4">
              <button 
                  className="btn btn-sm btn-outline-success"
                  onClick={() => navigate("/DoctorDashboard")}
                >
                  Dashboard
              </button>
              </div>
        
            
            <div className="d-grid">
              <button 
                className="btn btn-danger" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>No user data available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;