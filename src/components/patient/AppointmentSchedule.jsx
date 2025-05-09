import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./AppointmentSchedule.css";
import { useNavigate } from "react-router-dom";

const AppointmentSchedule = () => {
  const location = useLocation();
  const doctor = location.state?.doctor || {};

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [approxTime, setApproxTime] = useState("");
  const [showMakeAppointmentButton, setshowMakeAppointmentButton] = useState(false);

  // Get weekday from selected date
  const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Fetch availability from backend
  const fetchAvailability = async (dateStr) => {
    if (!doctor.DocID || !dateStr) return;

    const weekday = getWeekday(dateStr);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/availability/${doctor.DocID}/${weekday}/`
      );
      const slots = [];
      if (res.data.Timeslot1 && res.data.Timeslot1 !== "No") slots.push(res.data.Timeslot1);
      if (res.data.Timeslot2 && res.data.Timeslot2 !== "No") slots.push(res.data.Timeslot2);
      if (res.data.Timeslot3 && res.data.Timeslot3 !== "No") slots.push(res.data.Timeslot3);
      setAvailableSlots(slots);
    } catch (err) {
      console.error("Availability fetch error:", err);
      setAvailableSlots([]);
    }
  };

  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    setSelectedDate(dateVal);
    setSelectedSlot("");
    fetchAvailability(dateVal);
  };
  const handleMakeAppointment = () => {
    navigate("/MakeAppointment");
  };
  
  const navigate = useNavigate();

  const handleConfirm = () => {
    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString("en-GB").split("/").join("");
    const serialCount = 1; // Replace with actual DB count if needed
    const nextSerial = `${formattedDate}${doctor.DocID}${"-"}${String(serialCount).padStart(3, "0")}`;
    setSerialNumber(nextSerial);

    const startTime = selectedSlot.split("-")[0].trim(); // "11 AM"
    const time24 = convertTo24Hr(startTime);             // "11:00"
    const baseTime = new Date(`1970-01-01T${time24}:00`);
    const approx = new Date(baseTime.getTime() + serialCount * 7 * 60000);
    const approxFormatted = approx.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setApproxTime(approxFormatted); // ✅ This line was missing
    setshowMakeAppointmentButton(true);
  };

  // Helper: Convert 12hr slot to 24hr time
  const convertTo24Hr = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (!minutes) minutes = "00";

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  return (
    <div className="AppointmentSchedule">
      <PatientHeader />

      <div className="appointment-wrapper">
        <div className="doctor-card">
          <img src={doctor.DocImage || "/doctor.png"} alt="Doctor" />
          <div>
            <h4>Dr. {doctor.DocName || "Doctor Name"}</h4>
            <p><strong>Specialist:</strong> {doctor.DocDepartment || "Specialist"}</p>
            <p><strong>Chamber:</strong> Green HealthCare</p>
          </div>
        </div>

        <div className="form-section">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
          />

          {availableSlots.length > 0 && (
            <>
              <label>Select Time Slot:</label>
              <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                <option value="">-- Choose a Slot --</option>
                {availableSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>{slot}</option>
                ))}
              </select>
            </>
          )}

          {selectedDate && selectedSlot && (
            <button className="btn-confirm" onClick={handleConfirm}>Confirm?</button>
          )}

          {serialNumber && (
            <div className="serial-box">
              <p><strong>Serial:</strong> {serialNumber}</p>
              <p><strong>Approx. Time:</strong> {approxTime}</p>
            </div>
          )}

          {/* {showPaymentButton && (
            <button className="btn-payment">Make Appointment</button>
          )} */}

          {showMakeAppointmentButton && (
            <button className="btn-MakeAppointment" onClick={handleMakeAppointment}>Make Appointment</button>
          )}
          
        </div>
      </div>

      <DoctorFooter />
    </div>
  );
};

export default AppointmentSchedule;
