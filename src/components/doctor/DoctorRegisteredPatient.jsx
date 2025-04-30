import React, { useState } from "react";
import DoctorHeader from "./DoctorHeader";
import DoctorFooter from "./DoctorFooter";
import "../Homepage.css";
import "./Doctor.css";
import "./DoctorRegisteredPatient.css";
import { FaTrash, FaEye } from "react-icons/fa";

const DoctorRegisteredPatient = () => {
  const registeredPatients = [
    { firstName: "Jane", lastName: "Cooper", phone: "+91 9876543210", date: "13-Aug-2023", time: "10:00 AM", status: "Completed" },
    { firstName: "Wade", lastName: "Warren", phone: "+91 9876543210", date: "13-Aug-2023", time: "10:00 AM", status: "Follow-up" },
    { firstName: "Jane", lastName: "Cooper", phone: "+91 9876543210", date: "13-Aug-2023", time: "10:00 AM", status: "Completed" },
    { firstName: "Wade", lastName: "Warren", phone: "+91 9876543210", date: "13-Aug-2023", time: "10:00 AM", status: "Follow-up" },
    { firstName: "Jane", lastName: "Cooper", phone: "+91 9876543210", date: "13-Aug-2023", time: "10:00 AM", status: "Completed" },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status completed";
      case "follow-up":
        return "status followup";
      default:
        return "status";
    }
  };

  return (
    <div className="DoctorRegisteredPatient">
      <DoctorHeader />

      <div className="registered-wrapper">
        <h2 className="registered-heading">Registered Patient List</h2>
        <table className="registered-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Registered Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registeredPatients.map((r, index) => (
              <tr key={index}>
                <td>{r.firstName}</td>
                <td>{r.lastName}</td>
                <td>{r.phone}</td>
                <td>{`${r.date} at ${r.time}`}</td>
                <td>
                  <span className={getStatusClass(r.status)}>{r.status}</span>
                </td>
                <td>
                  <button className="btn-details">DETAILS</button>
                  <FaTrash className="icon-trash" />
                  <FaEye className="icon-eye" />
                </td>
              </tr>
            ))}
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

export default DoctorRegisteredPatient;
