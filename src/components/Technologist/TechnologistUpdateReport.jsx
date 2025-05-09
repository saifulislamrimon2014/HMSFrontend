import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const TechnologistUpdateReport = () => {
  // State for report data
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // State for details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/reports/');
        setReports(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports. Please try again.');
        toast.error('Failed to load reports. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter reports based on search term
  const filteredReports = reports.filter(report => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (report.reportNo && report.reportNo.toString().toLowerCase().includes(searchTermLower)) ||
      (report.patientName && report.patientName.toLowerCase().includes(searchTermLower)) ||
      (report.patientId && report.patientId.toLowerCase().includes(searchTermLower)) ||
      (report.doctorName && report.doctorName.toLowerCase().includes(searchTermLower)) ||
      (report.dateOfIssue && report.dateOfIssue.toLowerCase().includes(searchTermLower))
    );
  });

  // Handle Details button click
  const handleDetailsClick = (report) => {
    setSelectedReport(report);
    setEditData({
      id: report.id,
      reportNo: report.reportNo,
      dateOfIssue: report.dateOfIssue || '',
      sampleCollection: report.sampleCollection || '',
      reportedBy: report.reportedBy || '',
      patientName: report.patientName || '',
      patientId: report.patientId || '',
      doctorId: report.doctorId || '',
      doctorName: report.doctorName || '',
      weight: report.weight || '',
      bloodPressure: report.bloodPressure || '',
      sugarLevel: report.sugarLevel || '',
      heartRate: report.heartRate || '',
      totalCholesterol: report.totalCholesterol || '',
      hdl: report.hdl || '',
      ldl: report.ldl || '',
      tg: report.tg || '',
      hdlRatio: report.hdlRatio || '',
      ecg: report.ecg || '',
      xRay: report.xRay || '',
      ent: report.ent || '',
      tb: report.tb || '',
      summary: report.summary || '',
    });
    setShowDetailsModal(true);
  };

  // Handle input changes in the modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the data
  const handleUpdateSubmit = async () => {
    if (selectedReport) {
      try {
        setSubmitting(true);

        // Validate required fields
        if (!editData.reportedBy) {
          toast.error('Please enter the reporter name');
          return;
        }

        if (!editData.patientName) {
          toast.error('Please enter the patient name');
          return;
        }

        if (!editData.patientId) {
          toast.error('Please enter the patient ID');
          return;
        }

        // Prepare data for API
        const reportData = {
          reportedBy: editData.reportedBy,
          patientName: editData.patientName,
          patientId: editData.patientId,
          doctorId: editData.doctorId,
          doctorName: editData.doctorName,
          dateOfIssue: editData.dateOfIssue,
          sampleCollection: editData.sampleCollection,
          weight: editData.weight,
          bloodPressure: editData.bloodPressure,
          sugarLevel: editData.sugarLevel,
          heartRate: editData.heartRate,
          totalCholesterol: editData.totalCholesterol,
          hdl: editData.hdl,
          ldl: editData.ldl,
          tg: editData.tg,
          hdlRatio: editData.hdlRatio,
          ecg: editData.ecg,
          xRay: editData.xRay,
          ent: editData.ent,
          tb: editData.tb,
          summary: editData.summary
        };

        // Send data to API
        await axios.put(`http://localhost:8000/api/reports/update/${selectedReport.id}/`, reportData);

        // Refresh the reports list
        const response = await axios.get('http://localhost:8000/api/reports/');
        setReports(response.data);

        // Show success message
        toast.success('Report updated successfully!');

        // Close modal and reset state
        setShowDetailsModal(false);
        setSelectedReport(null);
        setEditData({});
      } catch (error) {
        console.error('Error updating report:', error);
        toast.error('Failed to update report. Please try again.');
      } finally {
        setSubmitting(false);
      }
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
                      placeholder="Search by Report No, Patient Name, Doctor..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center` }}
                      onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyle)} />
              </div>
              <div style={{ overflowX: 'auto' }}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '30px' }}>
                    <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #28a745', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ marginTop: '15px', color: '#666' }}>Loading reports...</p>
                  </div>
                ) : error ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#dc3545' }}>
                    <p>{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#28a745',
                        color: '#fff',
                        marginTop: '10px'
                      }}
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                    <p>No reports found matching your search criteria.</p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
                      <thead>
                          <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Report No</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Patient Name</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Patient ID</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Doctor</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Date of Issue</th>
                              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filteredReports.map((report) => (
                              <tr key={report.id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.reportNo}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.patientName}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.patientId}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.doctorName}</td>
                                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.dateOfIssue}</td>
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
                )}
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
                              disabled={submitting}
                              style={{
                                  ...buttonStyle,
                                  backgroundColor: submitting ? '#6c757d' : '#28a745',
                                  color: '#fff',
                                  padding: '10px 20px'
                              }}
                              onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#218838')}
                              onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#28a745')}
                              onMouseDown={(e) => !submitting && (e.target.style.transform = 'scale(0.95)')}
                              onMouseUp={(e) => !submitting && (e.target.style.transform = 'scale(1)')}
                          >
                              {submitting ? 'Updating...' : 'Update'}
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