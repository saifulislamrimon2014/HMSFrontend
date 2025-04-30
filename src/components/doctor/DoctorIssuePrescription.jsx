import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import DoctorFooter from "./DoctorFooter";
import "./DoctorIssuePrescription.css";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DoctorIssuePrescription = () => {
  const [advices, setAdvices] = useState([""]);
  const [medicines, setMedicines] = useState([
    { name: "", dose: { morning: false, noon: false, night: false }, duration: "" }
  ]);
  const [doctorName, setDoctorName] = useState("");
  const [serial, setSerial] = useState("");

  const patientSerial = "100"; // Replace dynamically

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-GB").split("/").join(""); // ddmmyyyy
    setSerial(`${formatted}${patientSerial}`);

    const user = auth.currentUser;
    if (user) {
      const fetchDoctorName = async () => {
        const ref = doc(db, "Users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setDoctorName(snap.data().firstName || "Doctor");
        }
      };
      fetchDoctorName();
    }
  }, []);

  const handleAdviceChange = (index, value) => {
    const updated = [...advices];
    updated[index] = value;
    setAdvices(updated);
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    if (field === "dose") {
      updated[index].dose[value] = !updated[index].dose[value];
    } else if (field === "duration") {
      const numericValue = value.replace(/\D/g, "");
      updated[index][field] = numericValue;
    } else {
      updated[index][field] = value;
    }
    setMedicines(updated);
  };

  const addAdvice = () => setAdvices([...advices, ""]);

  const addMedicine = () =>
    setMedicines([
      ...medicines,
      { name: "", dose: { morning: false, noon: false, night: false }, duration: "" }
    ]);

  const handleSaveAndPrint = async () => {
    const data = {
      prescriptionId: serial,
      doctorName,
      patientSerial,
      medicines,
      advices,
      createdAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, "Prescriptions", serial), data);
      window.print();
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  return (
    <div className="DoctorIssuePrescription">
      <DoctorHeader />

      <div className="prescription-body">
        <div className="prescription-header-green">
          <div className="logo-section">LOGO</div>
          <div className="doctor-details">
            <h2>DR. {doctorName.toUpperCase()}</h2>
            <p>MBBS, FCPS (MEDICINE), DTCD</p>
            <p>PROFESSOR, UNITED MEDICAL COLLEGE</p>
          </div>
        </div>

        <div className="patient-info-bar">
          <div>
            <p><strong>Name:</strong> LOREM</p>
            <p><strong>Age:</strong> XX</p>
            <p><strong>Gender:</strong> Female</p>
          </div>
          <div>
            <p><strong>ID:</strong> XX-XXX-XXXX</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString("en-GB")}</p>
            <p><strong>Serial:</strong> {serial}</p>
          </div>
        </div>

        <div className="main-content">
          <div className="advice-area">
            <h5>ADVICES</h5>
            {advices.map((text, index) => (
              <textarea
                key={index}
                placeholder="Write advices here"
                value={text}
                onChange={(e) => handleAdviceChange(index, e.target.value)}
              />
            ))}
            <button onClick={addAdvice} className="btn-add">Add More Advice</button>
          </div>

          <div className="medicine-area">
            <h5>MEDICINES</h5>
            {medicines.map((med, index) => (
              <div key={index} className="med-row">
                <input
                  type="text"
                  placeholder="Medicine name"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                />
                <div className="checkbox-group">
                  <label><input type="checkbox" checked={med.dose.morning} onChange={() => handleMedicineChange(index, "dose", "morning")} /> M</label>
                  <label><input type="checkbox" checked={med.dose.noon} onChange={() => handleMedicineChange(index, "dose", "noon")} /> N</label>
                  <label><input type="checkbox" checked={med.dose.night} onChange={() => handleMedicineChange(index, "dose", "night")} /> Nt</label>
                </div>
                <div className="duration-box">
                  <input
                    type="text"
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                  />
                  <span className="days-label">days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="center-button">
          <button onClick={addMedicine} className="btn-primary">ADD MORE MEDICINES</button>
        </div>

        <div className="prescription-footer-bar">
          <div><strong>CONTACT:</strong><br />017XX-XXX-XXX</div>
          <div><strong>CHAMBER:</strong><br />#40, GULSHAN, DHAKA</div>
          <div><strong>TIME:</strong><br />6:30 PM – 9:30 PM</div>
        </div>

        <div className="prescription-actions">
          <button className="btn-secondary">SAVE PRESCRIPTION</button>
          <button className="btn-primary" onClick={handleSaveAndPrint}>SAVE & PRINT PRESCRIPTION</button>
        </div>
      </div>

      <DoctorFooter />
    </div>
  );
};

export default DoctorIssuePrescription;
