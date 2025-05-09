// DoctorProfile.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctor");
    if (!storedDoctor) {
      toast.error("Please login first", { position: "top-center" });
      navigate("/DoctorLogin");
    } else {
      setDoctor(JSON.parse(storedDoctor));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    toast.success("Logged out", { position: "top-center" });
    navigate("/DoctorLogin");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {doctor ? (
          <>
            <div className="text-center mb-4">
              <img
                src={doctor.DocImage || 'https://via.placeholder.com/150'}
                width="150"
                height="150"
                className="rounded-circle"
                alt="Profile"
              />
            </div>
            <h2 className="text-center mb-4">Welcome, {doctor.DocName}!</h2>
            <p><strong>Email:</strong> {doctor.DocEmail}</p>
            <p><strong>Phone:</strong> {doctor.DocPhone}</p>
            <p><strong>Department:</strong> {doctor.DocDepartment}</p>
            <p><strong>Degree:</strong> {doctor.DocDegree}</p>

            <div className="d-grid gap-2 mt-3">
              <button onClick={() => navigate("/DoctorDashboard")} className="btn btn-success">
                Go to Dashboard
              </button>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </>
        ) : <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
}

export default DoctorProfile;
