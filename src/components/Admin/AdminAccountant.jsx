import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const AdminAccountant = () => {
  // State for technologist data, search, and modals
  const [technologists, setTechnologists] = useState([
    { slNo: 1, techId: 'T001', name: 'Aminul Islam', phoneNumber: '0171234567', joinDate: '5/10/23' },
    { slNo: 2, techId: 'T002', name: 'Rina Akter', phoneNumber: '0198765432', joinDate: '6/15/23' },
    { slNo: 3, techId: 'T003', name: 'Kamal Hossain', phoneNumber: '0167891234', joinDate: '7/1/23' },
    { slNo: 4, techId: 'T004', name: 'Shirin Begum', phoneNumber: '0182345678', joinDate: '8/5/23' },
    { slNo: 5, techId: 'T005', name: 'Tarek Rahman', phoneNumber: '0176543210', joinDate: '9/10/23' },
    { slNo: 6, techId: 'T006', name: 'Nusrat Jahan', phoneNumber: '0193456789', joinDate: '10/15/23' },
    { slNo: 7, techId: 'T007', name: 'Sajid Ahmed', phoneNumber: '0161234567', joinDate: '11/20/23' },
    { slNo: 8, techId: 'T008', name: 'Farhana Akter', phoneNumber: '0189876543', joinDate: '12/25/23' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTechnologist, setSelectedTechnologist] = useState(null);
  const [editedTechnologist, setEditedTechnologist] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    joinDate: '',
    address: '',
  });
  const [newTechnologist, setNewTechnologist] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    joinDate: '',
    address: '',
  });

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
      name: technologist.name,
      phoneNumber: technologist.phoneNumber,
      email: 'example@email.com',
      joinDate: technologist.joinDate,
      address: 'Dhaka, Bangladesh',
    });
    setShowModifyModal(true);
  };

  // Handle input changes in the modals
  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save changes in Modify modal
  const handleSaveChanges = () => {
    if (selectedTechnologist) {
      const updatedTechnologists = technologists.map((tech) =>
        tech.slNo === selectedTechnologist.slNo
          ? { ...tech, ...editedTechnologist }
          : tech
      );
      setTechnologists(updatedTechnologists);
      setShowModifyModal(false);
      setSelectedTechnologist(null);
      setEditedTechnologist({ name: '', phoneNumber: '', email: '', joinDate: '', address: '' });
    }
  };

  // Handle Add Technologist submission
  const handleAddTechnologist = () => {
    if (newTechnologist.name && newTechnologist.phoneNumber && newTechnologist.email && newTechnologist.joinDate && newTechnologist.address) {
      const newTechEntry = {
        slNo: technologists.length + 1,
        techId: `T${String(technologists.length + 1).padStart(3, '0')}`,
        name: newTechnologist.name,
        phoneNumber: newTechnologist.phoneNumber,
        joinDate: newTechnologist.joinDate,
      };
      setTechnologists([...technologists, newTechEntry]);
      setShowAddModal(false);
      setNewTechnologist({ name: '', phoneNumber: '', email: '', joinDate: '', address: '' });
    } else {
      alert('Please fill all fields.');
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
          Accountant List
        </h1>

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
              {filteredTechnologists.map((technologist) => (
                <tr key={technologist.slNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.slNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.techId}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.phoneNumber}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{technologist.joinDate}</td>
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
              ))}
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>{selectedTechnologist.name}</h3>
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
              <input
                type="text"
                name="joinDate"
                value={editedTechnologist.joinDate}
                onChange={(e) => handleInputChange(e, setEditedTechnologist)}
                placeholder="Join Date"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
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
              <input
                type="text"
                name="joinDate"
                value={newTechnologist.joinDate}
                onChange={(e) => handleInputChange(e, setNewTechnologist)}
                placeholder="Join Date"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
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

export default AdminAccountant;