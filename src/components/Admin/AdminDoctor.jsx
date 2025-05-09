import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const AdminDoctor = () => {
  // State for doctor data, search, and modals
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showManageAvailabilityModal, setShowManageAvailabilityModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [doctorAvailability, setDoctorAvailability] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    docId: '',
    name: '',
    dob: '',
    department: '',
    designation: '',
    email: '',
    password: '',
    phone: '',
    degree: '',
    details: '',
    image: '',
  });
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    dob: '',
    department: '',
    designation: '',
    email: '',
    password: '',
    phone: '',
    degree: '',
    details: '',
    image: '',
  });
  const [availability, setAvailability] = useState({
    docId: '',
    weekday: 'Monday',
    timeslot1: '11 AM - 1 PM',
    timeslot2: '4 PM - 6 PM',
    timeslot3: '9 PM - 11 PM',
  });
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Monitor showAvailabilityModal state
  useEffect(() => {
    console.log("showAvailabilityModal changed:", showAvailabilityModal);
  }, [showAvailabilityModal]);

  // Fetch doctor availability when managing availability
  const fetchDoctorAvailability = async (docId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/doctor-availability/${docId}/`);
      console.log("Fetched doctor availability:", response.data);
      setDoctorAvailability(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching doctor availability:", err);
      setError("Failed to load doctor availability. Please try again.");
      setDoctorAvailability([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctor data from MongoDB API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/doctors/');

        // Map the response data to our format
        const doctorList = response.data.map((doctor, index) => ({
          id: doctor.id, // MongoDB document ID
          slNo: index + 1,
          doctorId: doctor.docId,
          name: doctor.name,
          department: doctor.department,
          designation: doctor.designation,
          email: doctor.email,
          phone: doctor.phone,
          dob: doctor.dob,
          degree: doctor.degree,
          details: doctor.details,
          image: doctor.image
        }));

        setDoctors(doctorList);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor =>
    (doctor.doctorId && doctor.doctorId.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.name && doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.department && doctor.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.phone && doctor.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle Modify button click
  const handleModifyClick = (doctor) => {
    setSelectedDoctor(doctor);
    setEditedDoctor({
      docId: doctor.doctorId,
      name: doctor.name,
      dob: doctor.dob || '',
      department: doctor.department,
      designation: doctor.designation || '',
      email: doctor.email || '',
      password: '', // Don't show the password, but allow updating it
      phone: doctor.phone || '',
      degree: doctor.degree || '',
      details: doctor.details || '',
      image: doctor.image || '',
    });
    setShowModifyModal(true);
  };

  // Handle input changes in the modals
  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change for image
  const handleImageChange = (e, setState) => {
    const file = e.target.files[0];
    setState((prev) => ({ ...prev, image: file ? file.name : '' }));
  };

  // Handle Save changes in Modify modal
  const handleSaveChanges = async () => {
    if (selectedDoctor) {
      try {
        setLoading(true);

        // Create data object to update in MongoDB
        const doctorData = {
          name: editedDoctor.name,
          dob: editedDoctor.dob,
          department: editedDoctor.department,
          designation: editedDoctor.designation,
          email: editedDoctor.email,
          phone: editedDoctor.phone,
          degree: editedDoctor.degree,
          details: editedDoctor.details,
        };

        // Add password only if provided
        if (editedDoctor.password) {
          doctorData.password = editedDoctor.password;
        }

        // Add image only if provided
        if (editedDoctor.image) {
          doctorData.image = editedDoctor.image;
        }

        // Update document in MongoDB via API
        await axios.put(`http://localhost:8000/api/doctors/update/${selectedDoctor.id}/`, doctorData);

        // Update local state
        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === selectedDoctor.id
            ? {
                ...doctor,
                name: editedDoctor.name,
                dob: editedDoctor.dob,
                department: editedDoctor.department,
                designation: editedDoctor.designation,
                email: editedDoctor.email,
                phone: editedDoctor.phone,
                degree: editedDoctor.degree,
                details: editedDoctor.details,
                image: editedDoctor.image,
                updatedAt: new Date().toISOString()
              }
            : doctor
        );

        setDoctors(updatedDoctors);
        setShowModifyModal(false);
        setSelectedDoctor(null);
        setEditedDoctor({
          docId: '',
          name: '',
          dob: '',
          department: '',
          designation: '',
          email: '',
          password: '',
          phone: '',
          degree: '',
          details: '',
          image: ''
        });
        alert('Doctor updated successfully!');
      } catch (err) {
        console.error("Error updating doctor:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to update doctor. Please try again: ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Add Doctor submission
  const handleAddDoctor = async () => {
    // Debug log to see what's in newDoctor
    console.log("New Doctor Data:", newDoctor);

    if (
      newDoctor.name &&
      newDoctor.dob &&
      newDoctor.department &&
      newDoctor.designation &&
      newDoctor.email &&
      newDoctor.password &&
      newDoctor.phone &&
      newDoctor.degree &&
      newDoctor.details
    ) {
      try {
        setLoading(true);

        // Create data object to send to API
        const doctorData = {
          name: newDoctor.name,
          dob: newDoctor.dob,
          department: newDoctor.department,
          designation: newDoctor.designation,
          email: newDoctor.email,
          password: newDoctor.password,
          phone: newDoctor.phone,
          degree: newDoctor.degree,
          details: newDoctor.details,
          image: newDoctor.image || ''
        };

        // Add doctor via API
        const response = await axios.post('http://localhost:8000/api/doctors/add/', doctorData);

        // Add to local state with the new document ID
        const newDoctorEntry = {
          id: response.data.id,
          slNo: doctors.length + 1,
          doctorId: response.data.docId,
          name: newDoctor.name,
          dob: newDoctor.dob,
          department: newDoctor.department,
          designation: newDoctor.designation,
          email: newDoctor.email,
          phone: newDoctor.phone,
          degree: newDoctor.degree,
          details: newDoctor.details,
          image: newDoctor.image || '',
          createdAt: new Date().toISOString() // Use current date for display until refresh
        };

        setDoctors([...doctors, newDoctorEntry]);

        // Set the availability docId to the new doctor's ID
        setAvailability({
          ...availability,
          docId: response.data.docId
        });

        // Reset the new doctor form
        setNewDoctor({
          name: '',
          dob: '',
          department: '',
          designation: '',
          email: '',
          password: '',
          phone: '',
          degree: '',
          details: '',
          image: ''
        });

        // Close the add modal first
        setShowAddModal(false);

        // Use setTimeout to ensure the add modal is fully closed before showing the availability modal
        setTimeout(() => {
          console.log("Setting showAvailabilityModal to true");
          setShowAvailabilityModal(true);
          console.log("After setting showAvailabilityModal:", showAvailabilityModal);
        }, 100);

        // Move the alert to after the modal is shown
        setTimeout(() => {
          alert('Doctor added successfully! Now please add availability information.');
        }, 200);
      } catch (err) {
        console.error("Error adding doctor:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to add doctor. Please try again: ' + errorMessage);
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

  // Handle Delete Doctor
  const handleDeleteDoctor = async (docId) => {
    try {
      setLoading(true);

      // Delete doctor from MongoDB via API
      await axios.delete(`http://localhost:8000/api/doctors/delete/${docId}/`);

      // Update local state by removing the deleted doctor
      const updatedDoctors = doctors.filter(doc => doc.id !== docId);

      // Update the serial numbers
      const reindexedDoctors = updatedDoctors.map((doc, index) => ({
        ...doc,
        slNo: index + 1
      }));

      setDoctors(reindexedDoctors);
      setShowModifyModal(false);
      setSelectedDoctor(null);
      alert('Doctor deleted successfully!');
    } catch (err) {
      console.error("Error deleting doctor:", err);
      const errorMessage = err.response?.data?.error || err.message;
      alert('Failed to delete doctor. Please try again: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Availability submission
  const handleAddAvailability = async () => {
    // Debug log to see if this function is being called
    console.log("handleAddAvailability called");
    console.log("Availability Data:", availability);

    try {
      setLoading(true);

      // Create data object to send to API
      const availabilityData = {
        docId: availability.docId,
        weekday: availability.weekday,
        timeslot1: availability.timeslot1,
        timeslot2: availability.timeslot2,
        timeslot3: availability.timeslot3
      };

      // Add availability via API
      await axios.post('http://localhost:8000/api/doctor-availability/add/', availabilityData);

      // If we're in the manage availability modal, refresh the availability list
      if (showManageAvailabilityModal && selectedDoctor) {
        await fetchDoctorAvailability(selectedDoctor.doctorId);
      }

      // Close the availability modal
      setShowAvailabilityModal(false);

      // Reset the availability form
      setAvailability({
        docId: '',
        weekday: 'Monday',
        timeslot1: '11 AM - 1 PM',
        timeslot2: '4 PM - 6 PM',
        timeslot3: '9 PM - 11 PM',
      });

      alert('Doctor availability added successfully!');
    } catch (err) {
      console.error("Error adding availability:", err);
      const errorMessage = err.response?.data?.error || err.message;
      alert('Failed to add availability. Please try again: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Update Availability submission
  const handleUpdateAvailability = async () => {
    if (!selectedAvailability) return;

    try {
      setLoading(true);

      // Create data object to send to API
      const availabilityData = {
        timeslot1: availability.timeslot1,
        timeslot2: availability.timeslot2,
        timeslot3: availability.timeslot3
      };

      // Update availability via API
      await axios.put(`http://localhost:8000/api/doctor-availability/update/${selectedAvailability._id}/`, availabilityData);

      // Refresh the availability list
      if (selectedDoctor) {
        await fetchDoctorAvailability(selectedDoctor.doctorId);
      }

      // Reset editing state
      setIsEditingAvailability(false);
      setSelectedAvailability(null);

      // Reset the availability form
      setAvailability({
        docId: selectedDoctor ? selectedDoctor.doctorId : '',
        weekday: 'Monday',
        timeslot1: '11 AM - 1 PM',
        timeslot2: '4 PM - 6 PM',
        timeslot3: '9 PM - 11 PM',
      });

      alert('Doctor availability updated successfully!');
    } catch (err) {
      console.error("Error updating availability:", err);
      const errorMessage = err.response?.data?.error || err.message;
      alert('Failed to update availability. Please try again: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Availability
  const handleDeleteAvailability = async (availabilityId) => {
    try {
      setLoading(true);

      // Delete availability via API
      await axios.delete(`http://localhost:8000/api/doctor-availability/delete/${availabilityId}/`);

      // Refresh the availability list
      if (selectedDoctor) {
        await fetchDoctorAvailability(selectedDoctor.doctorId);
      }

      alert('Doctor availability deleted successfully!');
    } catch (err) {
      console.error("Error deleting availability:", err);
      const errorMessage = err.response?.data?.error || err.message;
      alert('Failed to delete availability. Please try again: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Availability button click
  const handleEditAvailabilityClick = (availabilityItem) => {
    setSelectedAvailability(availabilityItem);
    setAvailability({
      docId: availabilityItem.DocID,
      weekday: availabilityItem.DocWeekday,
      timeslot1: availabilityItem.Timeslot1,
      timeslot2: availabilityItem.Timeslot2,
      timeslot3: availabilityItem.Timeslot3,
    });
    setIsEditingAvailability(true);
  };

  // Handle Manage Availability button click
  const handleManageAvailabilityClick = (doctor) => {
    setSelectedDoctor(doctor);
    setAvailability({
      ...availability,
      docId: doctor.doctorId
    });
    fetchDoctorAvailability(doctor.doctorId);
    setShowManageAvailabilityModal(true);
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
    <div style={{ fontFamily: "'Roboto', sans-serif", minHeight: '100vh', backgroundColor: '#f1f4f8', position: 'relative' }}>
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
          Doctor List
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

        {/* Search Input and Add Doctor Button */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by ID, Name, Department, or Phone..."
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
            Add Doctor
          </button>
        </div>

        {/* Doctor List Table */}
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Sl No</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Doctor ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Phone Number</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Date of Birth</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #28a745',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <span>Loading doctors...</span>
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
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>
                    No doctors found. Add a new doctor using the button above.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor.id || doctor.slNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{doctor.slNo}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{doctor.doctorId}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{doctor.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{doctor.department}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{doctor.phone}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                      {doctor.dob ? new Date(doctor.dob).toLocaleDateString() : ''}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          onClick={() => handleModifyClick(doctor)}
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
                          Modify
                        </button>
                        <button
                          onClick={() => handleManageAvailabilityClick(doctor)}
                          style={{
                            ...buttonStyle,
                            backgroundColor: '#17a2b8',
                            color: '#fff'
                          }}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = '#138496')}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = '#17a2b8')}
                          onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                          Availability
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify Modal */}
      {showModifyModal && selectedDoctor && (
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
          zIndex: 1000, // Ensure modal is above footer
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
            maxHeight: '80vh',
            overflowY: 'auto',
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>{selectedDoctor.name}</h3>
              {/* Doctor ID (non-editable) */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  name="docId"
                  value={editedDoctor.docId}
                  readOnly
                  placeholder="Doctor ID"
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
                value={editedDoctor.name}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              {/* Date of Birth */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={editedDoctor.dob}
                  onChange={(e) => handleInputChange(e, setEditedDoctor)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <input
                type="text"
                name="department"
                value={editedDoctor.department}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Department"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <input
                type="text"
                name="designation"
                value={editedDoctor.designation}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Designation"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <input
                type="email"
                name="email"
                value={editedDoctor.email}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Email"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              {/* Password with show/hide toggle */}
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={editedDoctor.password}
                  onChange={(e) => handleInputChange(e, setEditedDoctor)}
                  placeholder="Password (leave empty to keep current)"
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

              <input
                type="text"
                name="phone"
                value={editedDoctor.phone}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Phone"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <input
                type="text"
                name="degree"
                value={editedDoctor.degree}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Degree"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <textarea
                name="details"
                value={editedDoctor.details}
                onChange={(e) => handleInputChange(e, setEditedDoctor)}
                placeholder="Details"
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              ></textarea>

              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, setEditedDoctor)}
                style={{ ...inputStyle, paddingTop: '5px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
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
                  if (window.confirm(`Are you sure you want to delete doctor ${selectedDoctor.name}?`)) {
                    handleDeleteDoctor(selectedDoctor.id);
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

      {/* Add Doctor Modal */}
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
          zIndex: 1000, // Ensure modal is above footer
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
            maxHeight: '80vh',
            overflowY: 'auto',
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
                Add New Doctor
              </h3>

              {/* Auto-generated ID */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  value="Doctor ID (Auto-generated starting from 101)"
                  readOnly
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
                value={newDoctor.name}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Doctor Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              {/* Date of Birth */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={newDoctor.dob}
                  onChange={(e) => handleInputChange(e, setNewDoctor)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <input
                type="text"
                name="department"
                value={newDoctor.department}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Department"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <input
                type="text"
                name="designation"
                value={newDoctor.designation}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Designation"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <input
                type="email"
                name="email"
                value={newDoctor.email}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Email"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              {/* Password with show/hide toggle */}
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={newDoctor.password}
                  onChange={(e) => handleInputChange(e, setNewDoctor)}
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

              <input
                type="text"
                name="phone"
                value={newDoctor.phone}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Phone"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <input
                type="text"
                name="degree"
                value={newDoctor.degree}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Degree"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              <textarea
                name="details"
                value={newDoctor.details}
                onChange={(e) => handleInputChange(e, setNewDoctor)}
                placeholder="Details"
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              ></textarea>

              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, setNewDoctor)}
                style={{ ...inputStyle, paddingTop: '5px' }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleAddDoctor}
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

      {/* Doctor Availability Modal */}
      {console.log("Rendering with showAvailabilityModal:", showAvailabilityModal)}
      {showAvailabilityModal && (
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
          zIndex: 1000, // Ensure modal is above footer
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
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <button
              onClick={() => setShowAvailabilityModal(false)}
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
                Add Doctor Availability
              </h3>

              {/* Doctor ID (non-editable) */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  name="docId"
                  value={availability.docId}
                  readOnly
                  placeholder="Doctor ID"
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f0f0f0',
                    cursor: 'not-allowed'
                  }}
                />
                <div style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                  Auto-filled
                </div>
              </div>

              {/* Weekday Selection */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Weekday
                </label>
                <select
                  name="weekday"
                  value={availability.weekday}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  style={{ ...inputStyle, height: '40px' }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                >
                  {weekdays.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              {/* Time Slots */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Time Slot 1
                </label>
                <input
                  type="text"
                  name="timeslot1"
                  value={availability.timeslot1}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  placeholder="e.g. 11 AM - 1 PM"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Time Slot 2
                </label>
                <input
                  type="text"
                  name="timeslot2"
                  value={availability.timeslot2}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  placeholder="e.g. 4 PM - 6 PM"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Time Slot 3
                </label>
                <input
                  type="text"
                  name="timeslot3"
                  value={availability.timeslot3}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  placeholder="e.g. 9 PM - 11 PM"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleAddAvailability}
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
                Add Availability
              </button>
              <button
                onClick={() => setShowAvailabilityModal(false)}
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
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Availability Modal */}
      {showManageAvailabilityModal && selectedDoctor && (
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
          zIndex: 1000, // Ensure modal is above footer
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            width: '90vw',
            maxWidth: '800px',
            textAlign: 'center',
            position: 'relative',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <button
              onClick={() => {
                setShowManageAvailabilityModal(false);
                setIsEditingAvailability(false);
                setSelectedAvailability(null);
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '15px' }}>
                Manage Availability for Dr. {selectedDoctor.name}
              </h3>

              {/* Doctor ID (non-editable) */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={`Doctor ID: ${selectedDoctor.doctorId}`}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f0f0f0',
                    cursor: 'not-allowed',
                    width: '200px',
                    margin: '0 auto'
                  }}
                />
              </div>

              {/* Add New Availability Button */}
              <div style={{ marginBottom: '20px' }}>
                <button
                  onClick={() => {
                    setAvailability({
                      docId: selectedDoctor.doctorId,
                      weekday: 'Monday',
                      timeslot1: '11 AM - 1 PM',
                      timeslot2: '4 PM - 6 PM',
                      timeslot3: '9 PM - 11 PM',
                    });
                    setIsEditingAvailability(false);
                    setSelectedAvailability(null);
                    setShowAvailabilityModal(true);
                  }}
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
                  Add New Availability
                </button>
              </div>

              {/* Availability List */}
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid #f3f3f3',
                      borderTop: '3px solid #28a745',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span>Loading availability...</span>
                  </div>
                </div>
              ) : doctorAvailability.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                  <p>No availability records found for this doctor.</p>
                  <p>Click the "Add New Availability" button to add availability for different days.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#17a2b8', color: '#fff' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Day</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Time Slot 1</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Time Slot 2</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Time Slot 3</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorAvailability.map((item) => (
                        <tr key={item._id} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                          <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.DocWeekday}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.Timeslot1 || 'No'}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.Timeslot2 || 'No'}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.Timeslot3 || 'No'}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button
                                onClick={() => handleEditAvailabilityClick(item)}
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
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete availability for ${item.DocWeekday}?`)) {
                                    handleDeleteAvailability(item._id);
                                  }
                                }}
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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Availability Modal */}
      {isEditingAvailability && selectedAvailability && (
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
          zIndex: 1001, // Higher than manage availability modal
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
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <button
              onClick={() => {
                setIsEditingAvailability(false);
                setSelectedAvailability(null);
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '15px' }}>
                Edit Availability for {selectedAvailability.DocWeekday}
              </h3>

              {/* Doctor ID and Weekday (non-editable) */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  value={`Doctor ID: ${selectedAvailability.DocID}`}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f0f0f0',
                    cursor: 'not-allowed'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  value={`Day: ${selectedAvailability.DocWeekday}`}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f0f0f0',
                    cursor: 'not-allowed'
                  }}
                />
              </div>

              {/* Time Slots */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Time Slot 1
                </label>
                <input
                  type="text"
                  name="timeslot1"
                  value={availability.timeslot1}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  placeholder="e.g. 11 AM - 1 PM"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Time Slot 2
                </label>
                <input
                  type="text"
                  name="timeslot2"
                  value={availability.timeslot2}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  placeholder="e.g. 4 PM - 6 PM"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Time Slot 3
                </label>
                <input
                  type="text"
                  name="timeslot3"
                  value={availability.timeslot3}
                  onChange={(e) => handleInputChange(e, setAvailability)}
                  placeholder="e.g. 9 PM - 11 PM"
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleUpdateAvailability}
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
                Update Availability
              </button>
              <button
                onClick={() => {
                  setIsEditingAvailability(false);
                  setSelectedAvailability(null);
                }}
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer style={{ position: 'relative', zIndex: 1 }} />
    </div>
  );
};

export default AdminDoctor;