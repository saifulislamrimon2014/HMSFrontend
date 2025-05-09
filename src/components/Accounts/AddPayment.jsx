import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const PatientBilling = () => {
  // State for patient data and selected patient
  const [patients, setPatients] = useState([
    { id: 'ID 0323', name: 'Mr. Akib', totalBill: 6500, totalPaid: 5700, balanceDue: 800, amountToPay: 700, billDetails: [
      { slNo: 1, feeType: 'X-Ray', amount: 1500, payment: 1500, discount: 0, date: '04/24', remarks: '' },
      { slNo: 2, feeType: 'Blood Test', amount: 1000, payment: 1000, discount: 0, date: '04/24', remarks: '' },
      { slNo: 3, feeType: 'Patients Payment', amount: 4000, payment: 3200, discount: 0, date: '5/2/24', remarks: '' },
    ] },
    { id: 'ID 0456', name: 'Ms. Sarah', totalBill: 4500, totalPaid: 3000, balanceDue: 1500, amountToPay: 1500, billDetails: [
      { slNo: 1, feeType: 'MRI', amount: 2500, payment: 2000, discount: 0, date: '05/24', remarks: '' },
      { slNo: 2, feeType: 'Consultation', amount: 2000, payment: 1000, discount: 0, date: '05/24', remarks: '' },
    ] },
    { id: 'ID 0678', name: 'Mr. John', totalBill: 3200, totalPaid: 3200, balanceDue: 0, amountToPay: 0, billDetails: [
      { slNo: 1, feeType: 'ECG', amount: 1200, payment: 1200, discount: 0, date: '06/24', remarks: '' },
      { slNo: 2, feeType: 'Blood Test', amount: 2000, payment: 2000, discount: 0, date: '06/24', remarks: '' },
    ] },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for payment modal and amount
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  // Handle Pay Now button click to show modal
  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  // Handle payment confirmation
  const handlePaymentConfirm = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    // Update selected patient data
    setSelectedPatient((prevPatient) => {
      const newTotalPaid = prevPatient.totalPaid + amount;
      const newBalanceDue = prevPatient.totalBill - newTotalPaid;

      // Update the last bill detail's payment
      const updatedBillDetails = [...prevPatient.billDetails];
      const lastIndex = updatedBillDetails.length - 1;
      updatedBillDetails[lastIndex] = {
        ...updatedBillDetails[lastIndex],
        payment: updatedBillDetails[lastIndex].payment + amount,
        date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
        remarks: 'Updated via Pay Now'
      };

      const updatedPatient = {
        ...prevPatient,
        totalPaid: newTotalPaid,
        balanceDue: newBalanceDue,
        amountToPay: newBalanceDue > 0 ? newBalanceDue : 0,
        billDetails: updatedBillDetails
      };

      // Update the patients list
      setPatients((prevPatients) =>
        prevPatients.map((p) => (p.id === prevPatient.id ? updatedPatient : p))
      );

      return updatedPatient;
    });

    // Close modal and reset payment amount
    setShowPaymentModal(false);
    setPaymentAmount('');
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
    padding: '10px 20px',
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
        <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '20px', textAlign: 'center' }}>
          Patient Billing Search
        </h1>

        {/* Search Input */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center` }}
            onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        {/* Patient List Table */}
        <div style={{ maxWidth: '100%', overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Patient ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Total Bill</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Total Paid</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Balance Due</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.id}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.totalBill}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.totalPaid}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.balanceDue}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleSelectPatient(patient)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#007bff',
                        color: '#fff'
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                      onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                      onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Patient Billing Details (shown after selection) */}
        {selectedPatient && (
          <div style={{ maxWidth: '100%' }}>
            {/* Patient Info Card */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div>
                <p style={{ color: '#666', margin: '5px 0', fontSize: '16px' }}><strong>Name:</strong> {selectedPatient.name}</p>
                <p style={{ color: '#666', margin: '5px 0', fontSize: '16px' }}><strong>Patient ID:</strong> {selectedPatient.id}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#666', margin: '5px 0', fontSize: '16px' }}><strong>Total Bill:</strong> {selectedPatient.totalBill}</p>
                <p style={{ color: '#666', margin: '5px 0', fontSize: '16px' }}><strong>Total Paid:</strong> {selectedPatient.totalPaid}</p>
                <p style={{ color: '#666', margin: '5px 0', fontSize: '16px' }}><strong>Balance Due:</strong> {selectedPatient.balanceDue}</p>
              </div>
            </div>

            {/* Amount to Pay and Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ color: '#666', fontSize: '16px' }}>Amount to Pay:</label>
                <input
                  type="text"
                  value={selectedPatient.amountToPay}
                  readOnly
                  style={{ ...inputStyle, width: '120px' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
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
                  Print
                </button>
                <button
                  onClick={handlePayNow}
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
                  Pay Now
                </button>
              </div>
            </div>

            {/* Billing Details Table */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              overflowX: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>SL NO</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>FEE TYPE</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>AMOUNT</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>PAYMENT</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>DISCOUNT</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>DATE</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPatient.billDetails.map((detail, index) => (
                    <tr key={index} style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.slNo}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.feeType}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.amount}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.payment}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.discount}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.date}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{detail.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
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
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '20px' }}>
              Enter Payment Amount
            </h3>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Amount"
              style={{ ...inputStyle, marginBottom: '20px' }}
              onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handlePaymentConfirm}
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
                Confirm
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
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

export default PatientBilling;