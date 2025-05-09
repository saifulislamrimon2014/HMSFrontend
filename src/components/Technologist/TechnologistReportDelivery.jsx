import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const TechnologistReportDelivery = () => {
  // State for report data
  const [reports, setReports] = useState([]);
  const [confirmedReports, setConfirmedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Fetch pending reports
        const reportsResponse = await axios.get('http://localhost:8000/api/reports/');
        setReports(reportsResponse.data);

        // Fetch confirmed reports
        const confirmedResponse = await axios.get('http://localhost:8000/api/confirmed-reports/');
        setConfirmedReports(confirmedResponse.data);

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
      (report.doctorName && report.doctorName.toLowerCase().includes(searchTermLower))
    );
  });

  // Filter confirmed reports based on search term
  const filteredConfirmedReports = confirmedReports.filter(report => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (report.reportNo && report.reportNo.toString().toLowerCase().includes(searchTermLower)) ||
      (report.patientName && report.patientName.toLowerCase().includes(searchTermLower)) ||
      (report.patientId && report.patientId.toLowerCase().includes(searchTermLower)) ||
      (report.doctorName && report.doctorName.toLowerCase().includes(searchTermLower)) ||
      (report.phone && report.phone.toLowerCase().includes(searchTermLower))
    );
  });

  // Handle Edit button click
  const handleEditClick = (report) => {
    setSelectedReport(report);
    setEditData({
      id: report.id,
      reportNo: report.reportNo,
      patientName: report.patientName,
      patientId: report.patientId,
      doctorName: report.doctorName,
      phone: report.phone || '',
      deliveryDateTime: report.deliveryDateTime || new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      payment: report.payment || 'Pending'
    });
    setShowEditModal(true);
  };

  // Handle input changes in the modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the data
  const handleEditSubmit = async () => {
    if (selectedReport) {
      try {
        setSubmitting(true);

        // Validate required fields
        if (!editData.phone) {
          toast.error('Please enter a phone number');
          return;
        }

        // Prepare delivery data
        const deliveryData = {
          reportId: selectedReport.id,
          deliveryDateTime: editData.deliveryDateTime,
          payment: editData.payment,
          phone: editData.phone
        };

        // Send to API
        await axios.post('http://localhost:8000/api/reports/deliver/', deliveryData);

        // Refresh both report lists
        const reportsResponse = await axios.get('http://localhost:8000/api/reports/');
        setReports(reportsResponse.data);

        const confirmedResponse = await axios.get('http://localhost:8000/api/confirmed-reports/');
        setConfirmedReports(confirmedResponse.data);

        toast.success('Report delivered successfully!');

        // Close modal and reset state
        setShowEditModal(false);
        setSelectedReport(null);
        setEditData({});
      } catch (error) {
        console.error('Error delivering report:', error);
        toast.error('Failed to deliver report. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Handle payment status change
  const handlePaymentChange = async (reportId, paymentStatus) => {
    try {
      // Update the report in the local state first for immediate UI feedback
      setReports(reports.map(report =>
        report.id === reportId ? { ...report, payment: paymentStatus } : report
      ));

      // Update the report in the database
      await axios.put(`http://localhost:8000/api/reports/update/${reportId}/`, {
        payment: paymentStatus
      });

      toast.success('Payment status updated successfully!');
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status. Please try again.');

      // Revert the change in the local state if the API call fails
      const reportsResponse = await axios.get('http://localhost:8000/api/reports/');
      setReports(reportsResponse.data);
    }
  };

  // Handle Delivery toggle with confirmation
  const handleDeliveryToggle = async (report) => {
    try {
      if (window.confirm(`Are you sure you want to deliver this report?`)) {
        setSubmitting(true);

        // Prepare delivery data
        const deliveryData = {
          reportId: report.id,
          deliveryDateTime: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          payment: report.payment || 'Pending',
          phone: report.phone || ''
        };

        // Send to API
        await axios.post('http://localhost:8000/api/reports/deliver/', deliveryData);

        // Refresh both report lists
        const reportsResponse = await axios.get('http://localhost:8000/api/reports/');
        setReports(reportsResponse.data);

        const confirmedResponse = await axios.get('http://localhost:8000/api/confirmed-reports/');
        setConfirmedReports(confirmedResponse.data);

        toast.success('Report delivered successfully!');
      }
    } catch (error) {
      console.error('Error delivering report:', error);
      toast.error('Failed to deliver report. Please try again.');
    } finally {
      setSubmitting(false);
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
          ) : (
            <>
              <h2 style={{ color: '#17a2b8', fontSize: '22px', fontWeight: '500', marginBottom: '15px', marginTop: '30px' }}>Pending Reports</h2>
              {filteredReports.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <p>No pending reports found.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#17a2b8', color: '#fff' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Report No</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Patient Name</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Patient ID</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Doctor</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Date of Issue</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Payment Status</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Delivery</th>
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
                          <select
                            value={report.payment || 'Pending'}
                            onChange={(e) => handlePaymentChange(report.id, e.target.value)}
                            style={{
                              padding: '8px',
                              borderRadius: '5px',
                              border: '1px solid #ddd',
                              backgroundColor: '#fff',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                          <button
                            onClick={() => handleDeliveryToggle(report)}
                            disabled={submitting}
                            style={{
                              ...buttonStyle,
                              backgroundColor: submitting ? '#6c757d' : '#17a2b8',
                              color: '#fff'
                            }}
                            onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#138496')}
                            onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#17a2b8')}
                            onMouseDown={(e) => !submitting && (e.target.style.transform = 'scale(0.95)')}
                            onMouseUp={(e) => !submitting && (e.target.style.transform = 'scale(1)')}
                          >
                            {submitting ? 'Processing...' : 'Deliver'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <h2 style={{ color: '#28a745', fontSize: '22px', fontWeight: '500', marginBottom: '15px', marginTop: '40px' }}>Delivered Reports</h2>
              {filteredConfirmedReports.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <p>No delivered reports found.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Report No</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Patient Name</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Doctor</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Delivery Date & Time</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConfirmedReports.map((report) => (
                      <tr key={report.id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.reportNo}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.patientName}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.phone}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.doctorName}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.deliveryDateTime}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{report.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
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
              Deliver Report
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Report No:</label>
              <input
                type="text"
                name="reportNo"
                value={editData.reportNo || ''}
                readOnly
                style={{ ...inputStyle, backgroundColor: '#f8f9fa' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Patient Name:</label>
              <input
                type="text"
                name="patientName"
                value={editData.patientName || ''}
                readOnly
                style={{ ...inputStyle, backgroundColor: '#f8f9fa' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Doctor:</label>
              <input
                type="text"
                name="doctorName"
                value={editData.doctorName || ''}
                readOnly
                style={{ ...inputStyle, backgroundColor: '#f8f9fa' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Phone Number: <span style={{ color: '#dc3545' }}>*</span></label>
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
              <label style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '5px' }}>Payment Status:</label>
              <select
                name="payment"
                value={editData.payment || 'Pending'}
                onChange={handleEditInputChange}
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={handleEditSubmit}
                disabled={submitting}
                style={{
                  ...buttonStyle,
                  backgroundColor: submitting ? '#6c757d' : '#28a745',
                  color: '#fff'
                }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#218838')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#28a745')}
                onMouseDown={(e) => !submitting && (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => !submitting && (e.target.style.transform = 'scale(1)')}
              >
                {submitting ? 'Processing...' : 'Deliver'}
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