import React, { useEffect, useState } from "react";
import DoctorHeader from "./DoctorHeader";
import DoctorFooter from "./DoctorFooter";
import "../Homepage.css";
import "./Doctor.css";
import "./DoctorAppointmentList.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const DoctorAppointmentList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/api/appointments/')
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Failed to fetch appointments:", err));
  }, []);

  const handleAcceptClick = (index, status) => {
    if (status.toLowerCase() === "unpaid") return;
    setAcceptedAppointments(prev => ({ ...prev, [index]: true }));
    toast.success("Appointment Accepted");
  };

  const handleDetailsClick = (index, status) => {
    if (status.toLowerCase() === "unpaid") return;
    if (!acceptedAppointments[index]) {
      toast.warning("Please accept the appointment first!");
      return;
    }
    navigate("/DoctorPatientDetails");
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return "status paid";
      case "unpaid": return "status unpaid";
      case "follow-up": return "status followup";
      case "booked": return "status booked";
      case "report showing": return "status report";
      default: return "status";
    }
  };

  return (
    <div>
      <DoctorHeader />
      <div className="appointments-wrapper">
        <h2 className="appointments-heading">Manage Appointments</h2>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Appointment Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => {
              const isAccepted = acceptedAppointments[index];
              const isUnpaid = a.AppointmentStatus?.toLowerCase() === "unpaid";
              const fullName = a.SelectDoctor;

              return (
                <tr key={a._id}>
                  <td>{fullName || "N/A"}</td>
                  <td>{a.Phone}</td>
                  <td>{new Date(a.AppointmentDate).toLocaleString()}</td>
                  <td><span className={getStatusClass(a.AppointmentStatus)}>{a.AppointmentStatus}</span></td>
                  <td>
                    <button
                      className={`btn-accept ${isAccepted ? "accepted" : ""}`}
                      onClick={() => handleAcceptClick(index, a.AppointmentStatus)}
                      disabled={isAccepted || isUnpaid}
                    >
                      {isAccepted ? "ACCEPTED" : "ACCEPT"}
                    </button>

                    <button
                      className="btn-details"
                      onClick={() => handleDetailsClick(index, a.AppointmentStatus)}
                      disabled={!isAccepted || isUnpaid}
                    >
                      DETAILS
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button>Previous</button>
          <button className={currentPage === 1 ? "active" : ""} onClick={() => setCurrentPage(1)}>1</button>
          <button className={currentPage === 2 ? "active" : ""} onClick={() => setCurrentPage(2)}>2</button>
          <button className={currentPage === 3 ? "active" : ""} onClick={() => setCurrentPage(3)}>3</button>
          <button>Next</button>
        </div>
      </div>
      <DoctorFooter />
    </div>
  );
};

export default DoctorAppointmentList;
