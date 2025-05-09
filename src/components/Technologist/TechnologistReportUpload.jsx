import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const TechnologistReportUpload = () => {
  // State for report data
  const [report, setReport] = useState({
    reportNo: '##',
    dateOfIssue: '',
    sampleCollection: '12-06-2024 03:43 PM',
    reportedBy: '',
    patientName: 'Karim Hawlader',
    patientId: '2024061101',
    weight: '78 kg',
    bloodPressure: 'XX/XX mmHg',
    sugarLevel: 'XXX',
    heartRate: 'XXX bpm',
    totalCholesterol: '255',
    hdl: '60',
    ldl: '168',
    tg: '284',
    hdlRatio: '4.28',
    ecg: 'Normal',
    xRay: 'Normal',
    ent: 'NAD',
    tb: 'Normal',
    summary: '',
  });

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit button click
  const handleEditClick = () => {
    setEditData({ ...report });
    setShowEditModal(true);
  };

  // Handle input changes in the modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the data
  const handleEditSubmit = () => {
    setReport({ ...editData });
    setShowEditModal(false);
    setEditData({});
  };

  // Handle Upload (mocked for now)
  const handleUpload = () => {
    alert('Report uploaded successfully!');
  };

  // Modern input style with hover effect
  const inputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    boxSizing: 'border-box'
  };

  const inputHoverFocusStyle = {
    borderColor: '#28a745',
    boxShadow: '0 0 5px rgba(40, 167, 69, 0.3)'
  };

  // Modern button style with hover effect
  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease'
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", minHeight: '100vh', backgroundColor: '#f1f4f8' }}>
      <Header />
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(145deg, #ffffff, #e6e9ed)',
        margin: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        margin: '30px auto'
      }}>
        <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '30px' }}>
          Medical Examination Report
        </h1>

        {/* Report Details */}
        <div style={{ textAlign: 'left', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>REPORT NO: </span>
              <input
                type="text"
                name="reportNo"
                value={report.reportNo}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '60px', textAlign: 'right' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>DATE OF ISSUE: </span>
              <input
                type="text"
                name="dateOfIssue"
                value={report.dateOfIssue}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '120px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>SAMPLE COLLECTION: </span>
              <span style={{ color: '#666' }}>{report.sampleCollection}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>REPORTED BY: </span>
              <input
                type="text"
                name="reportedBy"
                value={report.reportedBy}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '180px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>PATIENT NAME: </span>
              <input
                type="text"
                name="patientName"
                value={report.patientName}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '180px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>PATIENT ID: </span>
              <input
                type="text"
                name="patientId"
                value={report.patientId}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '120px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>WEIGHT: </span>
              <input
                type="text"
                name="weight"
                value={report.weight}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '80px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>BLOOD PRESSURE: </span>
              <input
                type="text"
                name="bloodPressure"
                value={report.bloodPressure}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '100px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>SUGAR LEVEL: </span>
              <input
                type="text"
                name="sugarLevel"
                value={report.sugarLevel}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '60px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>HEART RATE: </span>
              <input
                type="text"
                name="heartRate"
                value={report.heartRate}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '80px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#28a745', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Laboratory Examination</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>Total Cholesterol:</span>
                <input
                  type="text"
                  name="totalCholesterol"
                  value={report.totalCholesterol}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '60px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>HDL:</span>
                <input
                  type="text"
                  name="hdl"
                  value={report.hdl}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '60px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>LDL:</span>
                <input
                  type="text"
                  name="ldl"
                  value={report.ldl}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '60px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>TG:</span>
                <input
                  type="text"
                  name="tg"
                  value={report.tg}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '60px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#555' }}>HDL Ratio:</span>
                <input
                  type="text"
                  name="hdlRatio"
                  value={report.hdlRatio}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '60px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#28a745', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Physical Examination</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>ECG:</span>
                <input
                  type="text"
                  name="ecg"
                  value={report.ecg}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>X-Ray:</span>
                <input
                  type="text"
                  name="xRay"
                  value={report.xRay}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>ENT:</span>
                <input
                  type="text"
                  name="ent"
                  value={report.ent}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#555' }}>TB:</span>
                <input
                  type="text"
                  name="tb"
                  value={report.tb}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>Summary: </span>
              <input
                type="text"
                name="summary"
                value={report.summary}
                onChange={handleInputChange}
                style={{ ...inputStyle, width: '100%' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={handleEditClick}
              style={{
                ...buttonStyle,
                backgroundColor: '#6f42c1',
                color: '#fff'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a32a3')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#6f42c1')}
              onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Edit Report
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleUpload}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#28a745',
                  color: '#fff'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Upload
              </button>
              <input
                type="text"
                placeholder="Signature"
                style={{ ...inputStyle, width: '180px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            width: '90vw',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#28a745', fontSize: '22px', fontWeight: '500', marginBottom: '20px', textAlign: 'center' }}>
              Edit Medical Report
            </h3>

            {/* General Info Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>General Information</h4>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Report No:</label>
                <input
                  type="text"
                  name="reportNo"
                  value={editData.reportNo || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Report No"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Date of Issue:</label>
                <input
                  type="text"
                  name="dateOfIssue"
                  value={editData.dateOfIssue || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Date (e.g., YYYY-MM-DD)"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Reported By:</label>
                <input
                  type="text"
                  name="reportedBy"
                  value={editData.reportedBy || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Reporter's Name"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Patient Name:</label>
                <input
                  type="text"
                  name="patientName"
                  value={editData.patientName || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Patient Name"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Patient ID:</label>
                <input
                  type="text"
                  name="patientId"
                  value={editData.patientId || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Patient ID"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>

            {/* Vital Signs Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>Vital Signs</h4>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Weight:</label>
                <input
                  type="text"
                  name="weight"
                  value={editData.weight || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Weight (e.g., 78 kg)"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Blood Pressure:</label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={editData.bloodPressure || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Blood Pressure (e.g., 120/80 mmHg)"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Sugar Level:</label>
                <input
                  type="text"
                  name="sugarLevel"
                  value={editData.sugarLevel || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Sugar Level"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Heart Rate:</label>
                <input
                  type="text"
                  name="heartRate"
                  value={editData.heartRate || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Heart Rate (e.g., 70 bpm)"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>

            {/* Laboratory Examination Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>Laboratory Examination</h4>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Total Cholesterol:</label>
                <input
                  type="text"
                  name="totalCholesterol"
                  value={editData.totalCholesterol || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Total Cholesterol"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>HDL:</label>
                <input
                  type="text"
                  name="hdl"
                  value={editData.hdl || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter HDL"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>LDL:</label>
                <input
                  type="text"
                  name="ldl"
                  value={editData.ldl || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter LDL"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>TG:</label>
                <input
                  type="text"
                  name="tg"
                  value={editData.tg || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter TG"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>HDL Ratio:</label>
                <input
                  type="text"
                  name="hdlRatio"
                  value={editData.hdlRatio || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter HDL Ratio"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>

            {/* Physical Examination Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>Physical Examination</h4>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>ECG:</label>
                <input
                  type="text"
                  name="ecg"
                  value={editData.ecg || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter ECG Result"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>X-Ray:</label>
                <input
                  type="text"
                  name="xRay"
                  value={editData.xRay || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter X-Ray Result"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>ENT:</label>
                <input
                  type="text"
                  name="ent"
                  value={editData.ent || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter ENT Result"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>TB:</label>
                <input
                  type="text"
                  name="tb"
                  value={editData.tb || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter TB Result"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>

            {/* Summary Section */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>Summary</h4>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Summary:</label>
                <input
                  type="text"
                  name="summary"
                  value={editData.summary || ''}
                  onChange={handleEditInputChange}
                  placeholder="Enter Report Summary"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={handleEditSubmit}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#28a745',
                  color: '#fff'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#dc3545',
                  color: '#fff'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TechnologistReportUpload;