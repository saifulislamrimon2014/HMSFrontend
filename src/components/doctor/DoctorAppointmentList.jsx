import React, { useState } from "react";
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
  const [acceptedAppointments, setAcceptedAppointments] = useState({});

  const handleAcceptClick = (index, status) => {
    if (status.toLowerCase() === "unpaid") return;

    setAcceptedAppointments((prev) => ({
      ...prev,
      [index]: true,
    }));
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

  const appointments = [
    {
      firstName: "Jane",
      lastName: "Cooper",
      phone: "+91 9876543210",
      date: "13-Aug-2023",
      time: "10:00 AM",
      status: "Paid"
    },
    {
      firstName: "Wade",
      lastName: "Warren",
      phone: "+91 9876543210",
      date: "13-Aug-2023",
      time: "10:00 AM",
      status: "Unpaid"
    },
    {
      firstName: "Jane",
      lastName: "Cooper",
      phone: "+91 9876543210",
      date: "13-Aug-2023",
      time: "10:00 AM",
      status: "Follow-up"
    },
    {
      firstName: "Wade",
      lastName: "Warren",
      phone: "+91 9876543210",
      date: "13-Aug-2023",
      time: "10:00 AM",
      status: "Booked"
    },
    {
      firstName: "Jane",
      lastName: "Cooper",
      phone: "+91 9876543210",
      date: "13-Aug-2023",
      time: "10:00 AM",
      status: "Report Showing"
    },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "status paid";
      case "unpaid":
        return "status unpaid";
      case "follow-up":
        return "status followup";
      case "booked":
        return "status booked";
      case "report showing":
        return "status report";
      default:
        return "status";
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Appointment Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => {
              const isAccepted = acceptedAppointments[index];
              const isUnpaid = a.status.toLowerCase() === "unpaid";

              return (
                <tr key={index}>
                  <td>{a.firstName}</td>
                  <td>{a.lastName}</td>
                  <td>{a.phone}</td>
                  <td>{`${a.date} at ${a.time}`}</td>
                  <td><span className={getStatusClass(a.status)}>{a.status}</span></td>
                  <td>
                    <button
                      className={`btn-accept ${isAccepted ? "accepted" : ""}`}
                      onClick={() => handleAcceptClick(index, a.status)}
                      disabled={isAccepted || isUnpaid}
                    >
                      {isAccepted ? "ACCEPTED" : "ACCEPT"}
                    </button>

                    <button
                      className="btn-details"
                      onClick={() => handleDetailsClick(index, a.status)}
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
