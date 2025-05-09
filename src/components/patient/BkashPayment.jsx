import React from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./MakeAppointment.css";

const BkashPayment = () => {
  const navigate = useNavigate();

  const handleCompletePayment = () => {
    // simulate successful payment
    navigate("/confirmation");
  };

  return (
    <div className="MakeAppointment">
      <PatientHeader />
      <div className="make-appointment-container">
        <h3>Pay with bKash</h3>
        <p>Merchant: HMS Healthcare</p>
        <p>Amount: 500 BDT</p>
        <p>bKash Number: 01XXXXXXXXX</p>
        <p>Transaction ID: _____________</p>
        <button className="btn-payment" onClick={handleCompletePayment}>
          Complete Payment
        </button>
      </div>
      <DoctorFooter />
    </div>
  );
};

export default BkashPayment;
// import React, { useState } from "react";