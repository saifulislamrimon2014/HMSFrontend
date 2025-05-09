import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./MakeAppointment.css";

const PaymentSelection = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (paymentMethod === "cash") {
      navigate("/AppointmentConfirmation");
    } else if (paymentMethod === "bkash") {
      navigate("/BkashPayment");
    }
  };

  return (
    <div className="MakeAppointment">
      <PatientHeader />
      <div className="make-appointment-container">
        <h3>Select Payment Method</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="cash"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash in Hospital
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="bkash"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Online Payment (bKash)
        </label>

        <button
          className="btn-payment"
          onClick={handleProceed}
          disabled={!paymentMethod}
        >
          Proceed
        </button>
      </div>
      <DoctorFooter />
    </div>
  );
};

export default PaymentSelection;
