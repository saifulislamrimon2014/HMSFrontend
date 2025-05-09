import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

// Define keyframes for modal animation
const modalAnimation = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
body.modal-open {
  overflow: hidden;
}
.modal-scrollable {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}
.modal-scrollable::-webkit-scrollbar {
  width: 6px;
}
.modal-scrollable::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 3px;
}
`;

const AdminPatient = () => {
  // Add the animation styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = modalAnimation;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  // State for patient data, search, and modal
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
    address: '',
    email: '',
    bloodGroup: '',
    gender: '',
    age: '',
    password: ''
  });

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/patients/');
        setPatients(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patients. Please try again.");
        toast.error("Failed to load patients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (patient.patientId && patient.patientId.toString().toLowerCase().includes(searchTermLower)) ||
      (patient.patientName && patient.patientName.toLowerCase().includes(searchTermLower)) ||
      (patient.firstName && patient.firstName.toLowerCase().includes(searchTermLower)) ||
      (patient.lastName && patient.lastName.toLowerCase().includes(searchTermLower)) ||
      (patient.phoneNumber && patient.phoneNumber.toLowerCase().includes(searchTermLower)) ||
      (patient.email && patient.email.toLowerCase().includes(searchTermLower)) ||
      (patient.joinDate && patient.joinDate.toLowerCase().includes(searchTermLower))
    );
  });

  // Handle Modify button click
  const handleModifyClick = (patient) => {
    setSelectedPatient(patient);
    setEditedPatient({
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      phoneNumber: patient.phoneNumber || '',
      dob: patient.dob || '',
      address: patient.address || '',
      email: patient.email || '',
      bloodGroup: patient.bloodGroup || '',
      gender: patient.gender || '',
      age: patient.age || '',
      password: patient.password || ''
    });
    setShowModifyModal(true);
    // Add class to body to prevent background scrolling
    document.body.classList.add('modal-open');
  };

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save changes
  const handleSaveChanges = async () => {
    if (selectedPatient) {
      try {
        setLoading(true);

        // Create data object to update in MongoDB
        const patientData = {
          firstName: editedPatient.firstName,
          lastName: editedPatient.lastName,
          phoneNumber: editedPatient.phoneNumber,
          email: editedPatient.email,
          dob: editedPatient.dob,
          address: editedPatient.address,
          bloodGroup: editedPatient.bloodGroup,
          gender: editedPatient.gender,
          age: editedPatient.age,
          password: editedPatient.password
        };

        // Update document in MongoDB via API
        await axios.put(`http://localhost:8000/api/patients/update/${selectedPatient.id}/`, patientData);

        // Refresh the patient list
        const response = await axios.get('http://localhost:8000/api/patients/');
        setPatients(response.data);

        toast.success("Patient updated successfully!");
        setShowModifyModal(false);
        setSelectedPatient(null);
        document.body.classList.remove('modal-open');
        setEditedPatient({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          dob: '',
          address: '',
          email: '',
          bloodGroup: '',
          gender: '',
          age: '',
          password: ''
        });
      } catch (err) {
        console.error("Error updating patient:", err);
        toast.error("Failed to update patient. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Delete patient
  const handleDeletePatient = async () => {
    if (selectedPatient && window.confirm(`Are you sure you want to delete ${selectedPatient.patientName}?`)) {
      try {
        setLoading(true);

        // Delete from MongoDB via API
        await axios.delete(`http://localhost:8000/api/patients/delete/${selectedPatient.id}/`);

        // Refresh the patient list
        const response = await axios.get('http://localhost:8000/api/patients/');
        setPatients(response.data);

        toast.success("Patient deleted successfully!");
        setShowModifyModal(false);
        setSelectedPatient(null);
        document.body.classList.remove('modal-open');
      } catch (err) {
        console.error("Error deleting patient:", err);
        toast.error("Failed to delete patient. Please try again.");
      } finally {
        setLoading(false);
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
            placeholder="Search by ID, Name, Phone, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center`, width: '300px' }}
            onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        {/* Patient List Table */}
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #28a745', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ marginTop: '15px', color: '#666' }}>Loading patients...</p>
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
          ) : filteredPatients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
              <p>No patients found matching your search criteria.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
              <thead>
                <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Sl No</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Patient ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Patient Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.slNo}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.patientId}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.patientName}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.phoneNumber}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{patient.email}</td>
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
          )}
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
          alignItems: 'center',
          zIndex: 1000, // Higher z-index to ensure it's above everything
          overflow: 'auto', // Enable scrolling
          padding: '20px 0', // Add padding to ensure modal doesn't touch edges
          animation: 'fadeIn 0.3s ease-out' // Apply fade in animation
        }}>
          <div className="modal-scrollable" style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            width: '90vw',
            maxWidth: '400px',
            maxHeight: '80vh', // Limit height
            overflowY: 'auto', // Enable vertical scrolling
            textAlign: 'center',
            position: 'relative',
            margin: 'auto', // Center the modal
            animation: 'slideIn 0.3s ease-out' // Apply slide in animation
          }}>
            <button
              onClick={() => {
                setShowModifyModal(false);
                document.body.classList.remove('modal-open');
              }}
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

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedPatient.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    style={{ ...inputStyle }}
                    onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedPatient.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    style={{ ...inputStyle }}
                    onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                  Phone Number
                </label>
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
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedPatient.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="dob"
                  value={editedPatient.dob}
                  onChange={handleInputChange}
                  placeholder="Date of Birth (YYYY-MM-DD)"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                  Address
                </label>
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
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                    Blood Group
                  </label>
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
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={editedPatient.gender}
                    onChange={handleInputChange}
                    placeholder="Gender"
                    style={{ ...inputStyle }}
                    onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={editedPatient.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    style={{ ...inputStyle }}
                    onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={editedPatient.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    style={{ ...inputStyle }}
                    onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
              </div>
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
                onClick={handleDeletePatient}
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