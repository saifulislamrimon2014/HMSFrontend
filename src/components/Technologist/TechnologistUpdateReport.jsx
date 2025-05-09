import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const TechnologistUpdateReport = () => {
  // State for report data
  const [reports, setReports] = useState([
    { id: 1, reportNo: '002', name: 'Cooper', phone: '+91-987654320', deliveryDateTime: '10-Aug-2024 10:00 AM', payment: 'Completed' },
    { id: 2, reportNo: '003', name: 'Warren', phone: '+91-987654321', deliveryDateTime: '10-Aug-2024 11:00 AM', payment: 'Pending' },
    { id: 3, reportNo: '004', name: 'Cooper', phone: '+91-987654322', deliveryDateTime: '10-Aug-2024 12:00 PM', payment: 'Completed' },
    { id: 4, reportNo: '005', name: 'Warren', phone: '+91-987654323', deliveryDateTime: '10-Aug-2024 01:00 PM', payment: 'Pending' },
    { id: 5, reportNo: '006', name: 'Cooper', phone: '+91-987654324', deliveryDateTime: '10-Aug-2024 02:00 PM', payment: 'Completed' },
  ]);

  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // State for details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editData, setEditData] = useState({});

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter reports based on search term
  const filteredReports = reports.filter(report =>
    report.reportNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.deliveryDateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.payment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Details button click
  const handleDetailsClick = (report) => {
    setSelectedReport(report);
    setEditData({
      reportNo: report.reportNo,
      reportedBy: 'Karim Hawlader',
      patientName: report.name,
      patientId: `202405${report.id}01`,
      weight: '78 kg',
      bloodPressure: '120/80 mmHg',
      sugarLevel: '100',
      heartRate: '70 bpm',
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
    setShowDetailsModal(true);
  };

  // Handle input changes in the modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the data
  const handleUpdateSubmit = () => {
    if (selectedReport) {
      const updatedReports = reports.map((report) =>
        report.id === selectedReport.id ? { ...report, name: editData.patientName, reportNo: editData.reportNo, phone: editData.phone, deliveryDateTime: editData.deliveryDateTime, payment: editData.payment, ...editData } : report
      );
      setReports(updatedReports);
      setShowDetailsModal(false);
      setSelectedReport(null);
      setEditData({});
    }
  };

  // Modern input style with hover effect
  const inputStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
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
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <><div style={{ fontFamily: "'Roboto', sans-serif", minHeight: '100vh', backgroundColor: '#f1f4f8' }}>
          <Header />
          <div style={{
              padding: '40px 20px',
              background: 'linear-gradient(145deg, #ffffff, #e6e9ed)',
              margin: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              maxWidth: '1200px',
              margin: '30px auto'
          }}>
              <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '20px' }}>Re-update Report LIST</h1>
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                  <input
                      type="text"
                      placeholder="Search here..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center` }}
                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
              </div>
              <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
                      <thead>
                          <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Report No</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Delivery Date & Time</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Payment</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filteredReports.map((report) => (
                              <tr key={report.id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.reportNo}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.name}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.phone}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.deliveryDateTime}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.payment}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                                      <button
                                          onClick={() => handleDetailsClick(report)}
                                          style={{
                                              ...buttonStyle,
                                              backgroundColor: '#007bff',
                                              color: '#fff',
                                              marginRight: '5px'
                                          }}
                                          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                                          onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                                          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                      >
                                          Details
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          {/* Details Modal */}
          {showDetailsModal && selectedReport && (
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
                      maxWidth: '800px',
                      maxHeight: '90vh',
                      overflowY: 'auto',
                      textAlign: 'left'
                  }}>
                      <h2 style={{ color: '#28a745', fontSize: '24px', fontWeight: '500', marginBottom: '20px', textAlign: 'center' }}>
                          MEDICAL EXAMINATION REPORT (Update)
                      </h2>
                      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>REPORT NO: </span>
                                  <input
                                      type="text"
                                      name="reportNo"
                                      value={editData.reportNo}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>DATE OF ISSUE: </span>
                                  <input
                                      type="text"
                                      name="dateOfIssue"
                                      value={new Date().toLocaleDateString('en-US')}
                                      readOnly
                                      style={{ ...inputStyle, width: '150px', backgroundColor: '#e9ecef' }} />
                              </div>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>SAMPLE COLLECTION: </span>
                                  <span style={{ color: '#666' }}>12-09-2024 03:43 PM</span>
                              </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>REPORTED BY: </span>
                                  <input
                                      type="text"
                                      name="reportedBy"
                                      value={editData.reportedBy}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '200px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>PATIENT NAME: </span>
                                  <input
                                      type="text"
                                      name="patientName"
                                      value={editData.patientName}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '200px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>PATIENT ID: </span>
                                  <input
                                      type="text"
                                      name="patientId"
                                      value={editData.patientId}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '150px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>WEIGHT: </span>
                                  <input
                                      type="text"
                                      name="weight"
                                      value={editData.weight}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>BLOOD PRESSURE: </span>
                                  <input
                                      type="text"
                                      name="bloodPressure"
                                      value={editData.bloodPressure}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '120px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>SUGAR LEVEL: </span>
                                  <input
                                      type="text"
                                      name="sugarLevel"
                                      value={editData.sugarLevel}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '80px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div>
                                  <span style={{ fontWeight: '600', color: '#333' }}>HEART RATE: </span>
                                  <input
                                      type="text"
                                      name="heartRate"
                                      value={editData.heartRate}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                          </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
                              <h4 style={{ color: '#28a745', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>LABORATORY EXAMINATION</h4>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>TOTAL CHOLESTEROL:</span>
                                  <input
                                      type="text"
                                      name="totalCholesterol"
                                      value={editData.totalCholesterol}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>HDL:</span>
                                  <input
                                      type="text"
                                      name="hdl"
                                      value={editData.hdl}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>LDL:</span>
                                  <input
                                      type="text"
                                      name="ldl"
                                      value={editData.ldl}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>TG:</span>
                                  <input
                                      type="text"
                                      name="tg"
                                      value={editData.tg}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: '#555' }}>HDL RATIO:</span>
                                  <input
                                      type="text"
                                      name="hdlRatio"
                                      value={editData.hdlRatio}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '80px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                          </div>
                          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
                              <h4 style={{ color: '#28a745', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>PHYSICAL EXAMINATION</h4>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>ECG:</span>
                                  <input
                                      type="text"
                                      name="ecg"
                                      value={editData.ecg}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>X-RAY:</span>
                                  <input
                                      type="text"
                                      name="xRay"
                                      value={editData.xRay}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <span style={{ color: '#555' }}>ENT:</span>
                                  <input
                                      type="text"
                                      name="ent"
                                      value={editData.ent}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: '#555' }}>TB:</span>
                                  <input
                                      type="text"
                                      name="tb"
                                      value={editData.tb}
                                      onChange={handleEditInputChange}
                                      style={{ ...inputStyle, width: '100px', textAlign: 'right' }}
                                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                              </div>
                          </div>
                      </div>
                      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                          <div style={{ marginBottom: '10px' }}>
                              <span style={{ fontWeight: '600', color: '#333' }}>SUMMARY: </span>
                              <input
                                  type="text"
                                  name="summary"
                                  value={editData.summary}
                                  onChange={handleEditInputChange}
                                  style={{ ...inputStyle, width: '100%' }}
                                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                                  onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                          </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                          <input
                              type="text"
                              placeholder="Signature"
                              style={{ ...inputStyle, width: '200px', marginBottom: '20px' }}
                              onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                              onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
                          <button
                              onClick={handleUpdateSubmit}
                              style={{
                                  ...buttonStyle,
                                  backgroundColor: '#28a745',
                                  color: '#fff',
                                  padding: '10px 20px'
                              }}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
                              onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                              onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                          >
                              Update
                          </button>
                          <button
                              onClick={() => setShowDetailsModal(false)}
                              style={{
                                  ...buttonStyle,
                                  backgroundColor: '#dc3545',
                                  color: '#fff',
                                  padding: '10px 20px',
                                  marginLeft: '10px'
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
              </div>)}
  </div><Footer />
  </>
  );
};

export default TechnologistUpdateReport;