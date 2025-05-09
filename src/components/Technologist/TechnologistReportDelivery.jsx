import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const TechnologistReportDelivery = () => {
  // State for report data
  const [reports, setReports] = useState([
    { id: 1, reportNo: '001', patientName: 'John Doe', phone: '+1-987-654-3210', deliveryDateTime: '10-Aug-2024 10:00 AM', payment: 'Pending', delivered: false },
    { id: 2, reportNo: '002', patientName: 'Jane Smith', phone: '+1-987-654-3211', deliveryDateTime: '10-Aug-2024 11:00 AM', payment: 'Completed', delivered: true },
    { id: 3, reportNo: '003', patientName: 'Alice Johnson', phone: '+1-987-654-3212', deliveryDateTime: '10-Aug-2024 12:00 PM', payment: 'Pending', delivered: false },
  ]);

  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editData, setEditData] = useState({});

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter reports based on search term
  const filteredReports = reports.filter(report =>
    report.reportNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Edit button click
  const handleEditClick = (report) => {
    setSelectedReport(report);
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
    if (selectedReport) {
      const updatedReports = reports.map((report) =>
        report.id === selectedReport.id ? { ...report, ...editData } : report
      );
      setReports(updatedReports);
      setShowEditModal(false);
      setSelectedReport(null);
      setEditData({});
    }
  };

  // Handle Delete button click
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== id));
    }
  };

  // Handle Delivery toggle with confirmation
  const handleDeliveryToggle = (id) => {
    if (window.confirm(`Are you sure you want to mark this report as ${reports.find(report => report.id === id).delivered ? 'Pending' : 'Delivered'}?`)) {
      setReports(reports.map(report =>
        report.id === id ? { ...report, delivered: !report.delivered } : report
      ));
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
    maxWidth: '300px',
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
    <div style={{ fontFamily: "'Roboto', sans-serif", minHeight: '100vh', backgroundColor: '#f1f4f8' }}>
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
        <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '20px' }}>Report List</h1>
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center` }}
            onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Report No</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Patient Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Delivery Date & Time</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Payment</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.reportNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.patientName}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.phone}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.deliveryDateTime}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.payment}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleEditClick(report)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#6f42c1',
                        color: '#fff',
                        marginRight: '5px'
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a32a3')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#6f42c1')}
                      onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                      onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(report.id)}
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
                      Delete
                    </button>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleDeliveryToggle(report.id)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: report.delivered ? '#28a745' : '#17a2b8',
                        color: '#fff'
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = report.delivered ? '#218838' : '#138496')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = report.delivered ? '#28a745' : '#17a2b8')}
                      onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                      onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                      {report.delivered ? 'Delivered' : 'Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              Edit Report
            </h3>
            <div style={{ marginBottom: '20px' }}>
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
            <div style={{ marginBottom: '20px' }}>
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
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={editData.phone || ''}
                onChange={handleEditInputChange}
                placeholder="Enter Phone Number"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Delivery Date & Time:</label>
              <input
                type="text"
                name="deliveryDateTime"
                value={editData.deliveryDateTime || ''}
                onChange={handleEditInputChange}
                placeholder="Enter Date & Time (e.g., 10-Aug-2024 10:00 AM)"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Payment:</label>
              <input
                type="text"
                name="payment"
                value={editData.payment || ''}
                onChange={handleEditInputChange}
                placeholder="Enter Payment Status (e.g., Pending, Completed)"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
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

export default TechnologistReportDelivery;