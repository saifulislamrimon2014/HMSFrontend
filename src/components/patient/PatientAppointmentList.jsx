import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./PatientAppointmentList.css";
import { useNavigate } from "react-router-dom";

const PatientAppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientAppointments = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/PatientLogin");
          return;
        }

        // Fetch appointments for the current patient
        const response = await axios.get(`http://localhost:8000/api/patient-appointments/${user.uid}/`);
        console.log("Fetched patient appointments:", response.data);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patient appointments:", err);
        toast.error("Failed to load appointments");
        setLoading(false);
      }
    };

    fetchPatientAppointments();
  }, [navigate]);

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

  const handleNewAppointment = () => {
    navigate("/PatientAppointment");
  };

  return (
    <div className="PatientAppointmentList">
      <PatientHeader />

      <div className="appointments-wrapper">
        <h2 className="appointments-heading">My Appointments</h2>
        
        <div className="new-appointment-btn-container">
          <button className="btn-new-appointment" onClick={handleNewAppointment}>
            Schedule New Appointment
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="no-appointments">
            <p>You don't have any appointments yet.</p>
            <button className="btn-schedule" onClick={handleNewAppointment}>
              Schedule your first appointment
            </button>
          </div>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id || appointment.AppointmentID}>
                  <td>{appointment.SelectDoctor || "N/A"}</td>
                  <td>{appointment.SelectSpeciality || "N/A"}</td>
                  <td>
                    {appointment.AppointmentDate 
                      ? new Date(appointment.AppointmentDate).toLocaleDateString() + " " + 
                        (appointment.Time_Slot || "")
                      : "N/A"}
                  </td>
                  <td>
                    <span className={getStatusClass(appointment.AppointmentStatus)}>
                      {appointment.AppointmentStatus || "Pending"}
                    </span>
                  </td>
                  <td>
                    {appointment.AppointmentStatus?.toLowerCase() === "unpaid" && (
                      <button 
                        className="btn-pay"
                        onClick={() => navigate("/PaymentSelection")}
                      >
                        Pay Now
                      </button>
                    )}
                    {appointment.AppointmentStatus?.toLowerCase() === "paid" && (
                      <button className="btn-view-details">
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DoctorFooter />
    </div>
  );
};

export default PatientAppointmentList;
