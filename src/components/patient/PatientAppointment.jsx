import React, { useEffect, useState } from "react";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "./PatientAppointment.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/api/doctor-cards/");
        console.log("Fetched doctors:", res.data);
        setDoctors(res.data);
        if (res.data.length > 0) {
          setSelectedDept(res.data[0].DocDepartment);
        }
      } catch (err) {
        console.error("Error fetching doctor data:", err);
      }
    };
    fetchDoctors();
  }, []);
  

  const departments = [...new Set(doctors.map((doc) => doc.DocDepartment).filter(Boolean))];
  const filteredDoctors = doctors.filter((doc) => doc.DocDepartment === selectedDept);
  console.log("Departments available:", departments);
  console.log("Doctors:", doctors);

  
  const handleAppointmentClick = (doctor) => {
    navigate("/AppointmentSchedule", { state: { doctor } });
  };

  return (
    <div className="PatientAppointment">
      <PatientHeader />

      <div className="appointment-wrapper">
        <div className="department-select">
          <label>Select Department:</label>
          <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="doctor-cards-grid">
          {filteredDoctors.map((doc, idx) => (
            <div className="doctor-card" key={idx}>
              <img src="/HMSdoctor.jpg" alt={doc.DocName} />
              <div className="doctor-info">
                <h4>{doc.DocName}</h4>
                <p><strong>{doc.DocDegree}</strong></p>
                <p>{doc.DocDepartment}</p>
                <p><strong>Time:</strong> 10:00 AM - 2:00 PM</p>
                <div className="button-group">
                  <button className="btn-ghost">More Info</button>
                  <button className="btn-primary" onClick={() => navigate("/AppointmentSchedule", { state: { doctor: doc } })}>Get Appointment</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="show-more-container">
          <button className="btn-show-more">Show More</button>
        </div>
      </div>

      <DoctorFooter />
    </div>
  );
};

export default PatientAppointment;
