import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const AdminPatient = () => {
  // State for patient data, search, and modal
  const [patients, setPatients] = useState([
    { slNo: 1, patientId: 'P001', patientName: 'Md Rahim', phoneNumber: '018647566', joinDate: '6/4/24' },
    { slNo: 2, patientId: 'P002', patientName: 'Fatima Khan', phoneNumber: '017552344', joinDate: '7/15/24' },
    { slNo: 3, patientId: 'P003', patientName: 'Ali Hassan', phoneNumber: '019833456', joinDate: '6/10/24' },
    { slNo: 4, patientId: 'P004', patientName: 'Sara Ahmed', phoneNumber: '016744567', joinDate: '8/1/24' },
    { slNo: 5, patientId: 'P005', patientName: 'Zubair Malik', phoneNumber: '018923789', joinDate: '5/20/24' },
    { slNo: 6, patientId: 'P006', patientName: 'Ayesha Begum', phoneNumber: '017123456', joinDate: '7/5/24' },
    { slNo: 7, patientId: 'P007', patientName: 'Omar Farooq', phoneNumber: '019654321', joinDate: '6/25/24' },
    { slNo: 8, patientId: 'P008', patientName: 'Nadia Islam', phoneNumber: '016789123', joinDate: '8/10/24' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState({
    patientName: '',
    phoneNumber: '',
    joinDate: '',
    dob: '',
    address: '',
    email: '',
    bloodGroup: '',
  });

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.joinDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Modify button click
  const handleModifyClick = (patient) => {
    setSelectedPatient(patient);
    setEditedPatient({
      patientName: patient.patientName,
      phoneNumber: patient.phoneNumber,
      joinDate: patient.joinDate,
      dob: '7/9/2000', // Default DOB as per image
      address: 'Malibagh, Dhaka',
      email: 'example@email.com',
      bloodGroup: 'B+',
    });
    setShowModifyModal(true);
  };

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save changes
  const handleSaveChanges = () => {
    if (selectedPatient) {
      const updatedPatients = patients.map((patient) =>
        patient.slNo === selectedPatient.slNo
          ? { ...patient, patientName: editedPatient.patientName, phoneNumber: editedPatient.phoneNumber, joinDate: editedPatient.joinDate }
          : patient
      );
      setPatients(updatedPatients);
      setShowModifyModal(false);
      setSelectedPatient(null);
      setEditedPatient({ patientName: '', phoneNumber: '', joinDate: '', dob: '', address: '', email: '', bloodGroup: '' });
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
    boxSizing: 'border-box',
    marginBottom: '10px'
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
        <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '30px', textAlign: 'center' }}>
          Patient List
        </h1>

        {/* Search Input */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Search by ID, Name, Phone, or Join Date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center`, width: '300px' }}
            onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        {/* Patient List Table */}
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Sl No</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Patient ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Patient Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Join Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.slNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.slNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.patientId}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.patientName}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.phoneNumber}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.joinDate}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleModifyClick(patient)}
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
                      Modify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify Modal */}
      {showModifyModal && selectedPatient && (
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
            textAlign: 'center',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowModifyModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
              onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
              ×
            </button>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#e9ecef', width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#007bff" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>{selectedPatient.patientName}</h3>
              <input
                type="text"
                name="patientName"
                value={editedPatient.patientName}
                onChange={handleInputChange}
                placeholder="Patient Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="phoneNumber"
                value={editedPatient.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="joinDate"
                value={editedPatient.joinDate}
                onChange={handleInputChange}
                placeholder="Join Date"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="dob"
                value={editedPatient.dob}
                onChange={handleInputChange}
                placeholder="Date of Birth"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="address"
                value={editedPatient.address}
                onChange={handleInputChange}
                placeholder="Address"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="email"
                value={editedPatient.email}
                onChange={handleInputChange}
                placeholder="Email"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="bloodGroup"
                value={editedPatient.bloodGroup}
                onChange={handleInputChange}
                placeholder="Blood Group"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleSaveChanges}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#6f42c1',
                  color: '#fff',
                  padding: '10px 20px'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a32a3')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#6f42c1')}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Save
              </button>
              <button
                onClick={() => setShowModifyModal(false)}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  padding: '10px 20px'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminPatient;