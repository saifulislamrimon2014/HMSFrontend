import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const AdminTechnologist = () => {
  // State for technologist data, search, and modals
  const [technologists, setTechnologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTechnologist, setSelectedTechnologist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editedTechnologist, setEditedTechnologist] = useState({
    techId: '',
    name: '',
    phoneNumber: '',
    email: '',
    joinDate: '',
    address: '',
    password: '',
  });
  const [newTechnologist, setNewTechnologist] = useState({
    techId: '',
    name: '',
    phoneNumber: '',
    email: '',
    joinDate: '',
    address: '',
    password: '',
  });

  // Fetch technologist data from MongoDB API
  useEffect(() => {
    const fetchTechnologists = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/technologists/');

        // Map the response data to our format
        const techList = response.data.map((tech, index) => ({
          id: tech._id, // MongoDB document ID
          slNo: index + 1,
          techId: tech.techId || '',
          name: tech.name || '',
          phoneNumber: tech.phoneNumber || '',
          email: tech.email || '',
          joinDate: tech.joinDate || '',
          address: tech.address || '',
          password: tech.password || '',
        }));

        setTechnologists(techList);
        setError(null);
      } catch (err) {
        console.error("Error fetching technologists:", err);
        setError("Failed to load technologists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologists();
  }, []);

  // The technologist ID will be generated by the backend API

  // Filter technologists based on search term
  const filteredTechnologists = technologists.filter(technologist =>
    technologist.techId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technologist.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technologist.joinDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Modify button click
  const handleModifyClick = (technologist) => {
    setSelectedTechnologist(technologist);
    setEditedTechnologist({
      techId: technologist.techId,
      name: technologist.name,
      phoneNumber: technologist.phoneNumber,
      email: technologist.email || '',
      joinDate: technologist.joinDate,
      address: technologist.address || '',
      password: technologist.password,
    });
    setShowModifyModal(true);
  };

  // Handle input changes in the modals
  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save changes in Modify modal
  const handleSaveChanges = async () => {
    if (selectedTechnologist) {
      try {
        setLoading(true);

        // Create data object to update in MongoDB
        const techData = {
          techId: editedTechnologist.techId,
          name: editedTechnologist.name,
          phoneNumber: editedTechnologist.phoneNumber,
          email: editedTechnologist.email,
          joinDate: editedTechnologist.joinDate,
          address: editedTechnologist.address,
          password: editedTechnologist.password
        };

        // Update document in MongoDB via API
        await axios.put(`http://localhost:8000/api/technologists/update/${selectedTechnologist.id}/`, techData);

        // Update local state
        const updatedTechnologists = technologists.map((tech) =>
          tech.id === selectedTechnologist.id
            ? { ...tech, ...techData, updatedAt: new Date().toISOString() }
            : tech
        );

        setTechnologists(updatedTechnologists);
        setShowModifyModal(false);
        setSelectedTechnologist(null);
        setEditedTechnologist({ techId: '', name: '', phoneNumber: '', email: '', joinDate: '', address: '', password: '' });
        alert('Technologist updated successfully!');
      } catch (err) {
        console.error("Error updating technologist:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to update technologist. Please try again: ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Delete Technologist
  const handleDeleteTechnologist = async (techId) => {
    try {
      setLoading(true);

      // Delete technologist from MongoDB via API
      await axios.delete(`http://localhost:8000/api/technologists/delete/${techId}/`);

      // Update local state by removing the deleted technologist
      const updatedTechnologists = technologists.filter(tech => tech.id !== techId);

      // Update the serial numbers
      const reindexedTechnologists = updatedTechnologists.map((tech, index) => ({
        ...tech,
        slNo: index + 1
      }));

      setTechnologists(reindexedTechnologists);
      setShowModifyModal(false);
      setSelectedTechnologist(null);
      alert('Technologist deleted successfully!');
    } catch (err) {
      console.error("Error deleting technologist:", err);
      const errorMessage = err.response?.data?.error || err.message;
      alert('Failed to delete technologist. Please try again: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Technologist submission
  const handleAddTechnologist = async () => {
    if (
      newTechnologist.name &&
      newTechnologist.phoneNumber &&
      newTechnologist.email &&
      newTechnologist.joinDate &&
      newTechnologist.address &&
      newTechnologist.password
    ) {
      try {
        setLoading(true);

        // Create data object to send to API
        const techData = {
          name: newTechnologist.name,
          phoneNumber: newTechnologist.phoneNumber,
          email: newTechnologist.email,
          joinDate: newTechnologist.joinDate, // This is now a date string from the date input
          address: newTechnologist.address,
          password: newTechnologist.password
        };

        // Add technologist via API
        const response = await axios.post('http://localhost:8000/api/technologists/add/', techData);

        // Add to local state with the new document ID
        const newTechEntry = {
          id: response.data.id,
          slNo: technologists.length + 1,
          techId: response.data.techId,
          ...techData,
          createdAt: new Date().toISOString() // Use current date for display until refresh
        };

        setTechnologists([...technologists, newTechEntry]);
        setShowAddModal(false);
        setNewTechnologist({ techId: '', name: '', phoneNumber: '', email: '', joinDate: '', address: '', password: '' });
        alert('Technologist added successfully!');
      } catch (err) {
        console.error("Error adding technologist:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to add technologist. Please try again: ' + errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill all required fields.');
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
        <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '20px', textAlign: 'center' }}>
          Technologist List
        </h1>

        {/* Display error message if there's an error */}
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Search Input and Add Technologist Button */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by ID, Name, Phone, or Join Date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center`, width: '300px' }}
            onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <button
            onClick={() => setShowAddModal(true)}
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
            Add Technologist
          </button>
        </div>

        {/* Technologist List Table */}
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Sl No</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Tech ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Join Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #28a745',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <span>Loading technologists...</span>
                    </div>
                    <style>
                      {`
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      `}
                    </style>
                  </td>
                </tr>
              ) : filteredTechnologists.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '20px', textAlign: 'center' }}>
                    No technologists found. Add a new technologist using the button above.
                  </td>
                </tr>
              ) : (
                filteredTechnologists.map((technologist) => (
                  <tr key={technologist.id || technologist.slNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.slNo}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.techId}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.phoneNumber}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                      {/* Format the date for display if it's in ISO format */}
                      {technologist.joinDate ? new Date(technologist.joinDate).toLocaleDateString() : ''}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                      <button
                        onClick={() => handleModifyClick(technologist)}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify Modal */}
      {showModifyModal && selectedTechnologist && (
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
          overflow: 'auto' // Allow scrolling if content is too tall
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            width: '90vw',
            maxWidth: '400px',
            textAlign: 'center',
            position: 'relative',
            maxHeight: '90vh', // Limit height to 90% of viewport
            overflowY: 'auto', // Add scrollbar if content is too tall
            margin: '20px 0' // Add margin to ensure it doesn't touch the edges
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>{selectedTechnologist.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  name="techId"
                  value={editedTechnologist.techId}
                  readOnly
                  placeholder="Technologist ID"
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f0f0f0',
                    cursor: 'not-allowed'
                  }}
                />
                <div style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                  ID cannot be changed
                </div>
              </div>
              <input
                type="text"
                name="name"
                value={editedTechnologist.name}
                onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                placeholder="Technologist Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="phoneNumber"
                value={editedTechnologist.phoneNumber}
                onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                placeholder="Phone Number"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="email"
                name="email"
                value={editedTechnologist.email}
                onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                placeholder="Email"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Join Date
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={editedTechnologist.joinDate}
                  onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <input
                type="text"
                name="address"
                value={editedTechnologist.address}
                onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                placeholder="Address"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={editedTechnologist.password}
                  onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                  placeholder="Password"
                  style={{ ...inputStyle, paddingRight: '40px' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6f42c1'
                  }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleSaveChanges}
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
                Save
              </button>
              <button
                onClick={() => setShowModifyModal(false)}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  padding: '10px 20px'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a6268')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#6c757d')}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete technologist ${selectedTechnologist.name}?`)) {
                    // Call API to delete technologist
                    handleDeleteTechnologist(selectedTechnologist.id);
                  }
                }}
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

      {/* Add Technologist Modal */}
      {showAddModal && (
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
          overflow: 'auto' // Allow scrolling if content is too tall
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            width: '90vw',
            maxWidth: '400px',
            textAlign: 'center',
            position: 'relative',
            maxHeight: '90vh', // Limit height to 90% of viewport
            overflowY: 'auto', // Add scrollbar if content is too tall
            margin: '20px 0' // Add margin to ensure it doesn't touch the edges
          }}>
            <button
              onClick={() => setShowAddModal(false)}
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '15px' }}>
                Add New Technologist
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  name="techId"
                  value="Auto-generated (starting from 401)"
                  readOnly
                  placeholder="Technologist ID (Auto-generated)"
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f0f0f0',
                    cursor: 'not-allowed'
                  }}
                />
                <div style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                  Auto-generated
                </div>
              </div>
              <input
                type="text"
                name="name"
                value={newTechnologist.name}
                onChange={(e) => handleInputChange(e, setNewTechnologist)}
                placeholder="Technologist Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="phoneNumber"
                value={newTechnologist.phoneNumber}
                onChange={(e) => handleInputChange(e, setNewTechnologist)}
                placeholder="Phone Number"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="email"
                name="email"
                value={newTechnologist.email}
                onChange={(e) => handleInputChange(e, setNewTechnologist)}
                placeholder="Email"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Join Date
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={newTechnologist.joinDate}
                  onChange={(e) => handleInputChange(e, setNewTechnologist)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
              <input
                type="text"
                name="address"
                value={newTechnologist.address}
                onChange={(e) => handleInputChange(e, setNewTechnologist)}
                placeholder="Address"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="password"
                name="password"
                value={newTechnologist.password}
                onChange={(e) => handleInputChange(e, setNewTechnologist)}
                placeholder="Password"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleAddTechnologist}
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
                Add
              </button>
              <button
                onClick={() => setShowAddModal(false)}
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

export default AdminTechnologist;