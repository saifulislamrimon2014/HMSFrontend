import React, { useEffect, useState } from "react";
import { auth } from "../firebase"; // Keep Firebase auth for user authentication
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    dateOfBirth: "",
    address: "",
    bloodGroup: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const navigate = useNavigate();

  const fetchUserData = () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          console.log("Fetching data for UID:", user.uid);
          const response = await fetch(
            `http://127.0.0.1:8000/api/user/${user.uid}/`
          );
          const data = await response.json();

          if (response.ok) {
            console.log("Django data:", data);
            setUserDetails(data);
            setFormData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              contactNumber: data.contactNumber || "",
              dateOfBirth: data.dateOfBirth || "",
              address: data.address || "",
              bloodGroup: data.bloodGroup || "",
            });
          } else {
            console.log("No user data found for UID:", user.uid);
            toast.error("No user data found", { position: "top-center" });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data", { position: "top-center" });
        }
      } else {
        console.log("No user is logged in");
        toast.error("Please log in to view your profile", {
          position: "top-center",
        });
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
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
  
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/${user.uid}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUserDetails({ ...userDetails, ...formData });
          setIsEditing(false);
          toast.success("Profile updated successfully!", {
            position: "top-center",
          });
        } else {
          throw new Error(data.error || "Failed to update profile");
        }
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
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
      <div className="card p-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {userDetails ? (
          <>
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

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                      maxLength={11}
                    />
                  ) : (
                    <p>{userDetails.contactNumber}</p>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  ) : (
                    <p>{userDetails.dateOfBirth}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                {isEditing ? (
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                  />
                ) : (
                  <p>{userDetails.address}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Blood Group</label>
                {isEditing ? (
                  <select
                    className="form-control"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{userDetails.bloodGroup}</p>
                )}
              </div>
            </div>

            <div className="d-grid">
              <button className="btn btn-danger" onClick={handleLogout}>
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

export default Profile;