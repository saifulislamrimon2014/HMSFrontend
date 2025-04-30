import React from "react";
import DoctorHeader from "./DoctorHeader";
import "./Doctor.css";
import "../Homepage.css";
import "./DoctorPatientDetails.css";
import DoctorFooter from "./DoctorFooter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorPatientDetails = () => {
  const handleOpenClick = (type, id) => {
    console.log(`Opening ${type} with ID: ${id}`);
    // Navi
    // gate or open modal logic here
  };
  const navigate = useNavigate();


  return (
    <div className="DoctorPatientDetails">
      <DoctorHeader />

      <div className="details-container">
        <div className="patient-info">
          <h4>Patient Name: <span>Karim Hawlader</span></h4>
          <h4>Patient ID: <span>20204601101</span></h4>
          <p><strong>Weight:</strong> 78 KG</p>
          <p><strong>Blood Pressure:</strong> XXX/XXX</p>
          <p><strong>Sugar Level:</strong> XXX</p>
          <p><strong>Heart Rate:</strong> XXX</p>

          <div className="patient-buttons">
            <button className="btn-secondary">Problem History</button>
            <button className="btn-primary">Add/Update Basic Info</button>
          </div>
        </div>

        <div className="history-section">
          <h5 className="section-title">Prescription History</h5>
          <table className="details-table unified-columns">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>No</th>
                <th style={{ width: "20%" }}>Pres. ID</th>
                <th style={{ width: "25%" }}>Issued By</th>
                <th style={{ width: "20%" }}>Issue Date</th>
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>12344</td>
                <td>MD KARIM</td>
                <td>04/04/24</td>
                <td>
                  <button className="btn-open" onClick={() => handleOpenClick("prescription", 12344)}>OPEN</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>23332</td>
                <td>MD RAHIM</td>
                <td>02/04/24</td>
                <td>
                  <button className="btn-open" onClick={() => handleOpenClick("prescription", 23332)}>OPEN</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>13322</td>
                <td>MD RABBI</td>
                <td>01/03/24</td>
                <td>
                  <button className="btn-open" onClick={() => handleOpenClick("prescription", 13322)}>OPEN</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="history-section">
          <h5 className="section-title">Medical Report History</h5>
          <table className="details-table unified-columns">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>No</th>
                <th style={{ width: "20%" }}>Slip No</th>
                <th style={{ width: "25%" }}>Report Type</th>
                <th style={{ width: "20%" }}>Issue Date</th>
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>12344</td>
                <td>Blood Test</td>
                <td>04/04/24</td>
                <td>
                  <button className="btn-open" onClick={() => handleOpenClick("report", 12344)}>OPEN</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>23332</td>
                <td>X-Ray</td>
                <td>02/04/24</td>
                <td>
                  <button className="btn-open" onClick={() => handleOpenClick("report", 23332)}>OPEN</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>13322</td>
                <td>CT Scan</td>
                <td>01/03/24</td>
                <td>
                  <button className="btn-open" onClick={() => handleOpenClick("report", 13322)}>OPEN</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate("/DoctorIssuePrescription")}>
              Issue Prescription
          </button>

          <button className="btn-secondary">Schedule Online</button>
        </div>
      </div>

      <DoctorFooter />
    </div>
  );
};

export default DoctorPatientDetails;
