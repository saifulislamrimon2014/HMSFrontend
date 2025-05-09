import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const AccountsEditProfile = () => {
  // State for form data
  const [profile, setProfile] = useState({
    name: '',
    degrees: '',
    designation: '',
    email: '',
    phoneNumber: '+1498738999',
    password: 'evfTbyVcD',
    confirmPassword: 'evfTbyVcD'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle form submission (mocked for now, replace with backend API call)
  const handleUpdate = (e) => {
    e.preventDefault();
    if (profile.password !== profile.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Replace with API call to update profile
    console.log('Profile updated:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fff',
        margin: '20px auto',
        maxWidth: '600px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#28a745', fontSize: '24px', marginBottom: '30px' }}>
          Edit Profile
        </h1>

        {/* Profile Picture Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#e9ecef',
            borderRadius: '50%',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '40px' }}>👤</span>
          </div>
          <button
            style={{
              padding: '8px 15px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Change Picture
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Degrees</label>
            <input
              type="text"
              name="degrees"
              value={profile.degrees}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Designation</label>
            <input
              type="text"
              name="designation"
              value={profile.designation}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#666', marginBottom: '5px' }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '12px 30px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AccountsEditProfile;