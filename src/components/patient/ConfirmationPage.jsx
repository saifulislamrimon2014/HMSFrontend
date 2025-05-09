import React, { useRef } from "react";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./MakeAppointment.css";
import "./PrintInvoice.css";  // for print styles

const ConfirmationPage = () => {
  const ref = useRef();

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className="MakeAppointment">
      <PatientHeader id="navbar"/>

      <div className="make-appointment-container print-area" ref={ref}>
        <div className="invoice-header">
          <h2>Green HealthCare Hospital</h2>
          <p><strong>Appointment Confirmation Invoice</strong></p>
          <p>Date Issued: {today}</p>
          <hr />
        </div>

        <div className="confirmation-box">
          <h4>Doctor Information</h4>
          <p><strong>Name:</strong> Dr. Saiful Islam</p>
          <p><strong>Department:</strong> Dermatology</p>
          <p><strong>Chamber:</strong> Green HealthCare</p>

          <h4>Patient Information</h4>
          <p><strong>Name:</strong> Rafiul Islam</p>
          <p><strong>Age:</strong> 27</p>
          <p><strong>Gender:</strong> Male</p>
          <p><strong>Phone:</strong> 01712345678</p>
          <p><strong>Problem:</strong> Skin allergy</p>

          <h4>Appointment Information</h4>
          <p><strong>Date:</strong> 08-05-2025</p>
          <p><strong>Time:</strong> 11:05 AM</p>
          <p><strong>Serial No:</strong> 08052025005</p>
          <p><strong>Payment:</strong> Cash in Hospital</p>
        </div>

        <button className="btn-print no-print" onClick={handlePrint}>
          🖨️ Print Confirmation
        </button>
      </div>

      <DoctorFooter id="footer" />
    </div>
  );
};

export default ConfirmationPage;
