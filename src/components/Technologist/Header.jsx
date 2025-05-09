import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  // Style for navigation links
  const getNavLinkStyle = ({ isActive }) => ({
    color: isActive ? '#28a745' : '#000',
    textDecoration: 'none',
    margin: '0 15px',
    position: 'relative',
    paddingBottom: '15px',
    paddingTop: '10px',
    fontWeight: isActive ? '600' : 'normal',
    transition: 'color 0.3s ease'
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('technologist');
    toast.success('Logged out successfully');
    navigate('/TechnologistLogin');
  };
  return (
    <header style={{
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Left side - Emergency contact */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          color: '#666',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" stroke="#666" strokeWidth="2"/>
            <path d="M12 18H12.01" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 5H16" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Emergency: +8801825674348
        </span>
      </div>

      {/* Right side - Navigation links */}
      <nav style={{ display: 'flex', alignItems: 'center', }}>
        <NavLink
          to="/technologistdashboard"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/technologistreportupload"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Report Upload
        </NavLink>

        <NavLink
          to="/technologistreportdelivery"
          style={getNavLinkStyle}
          className="nav-link"
        >
         Report Delivery
        </NavLink>
        <NavLink
          to="/technologistupdatereport"
          style={getNavLinkStyle}
          className="nav-link"
        >
        Update Report
        </NavLink>


        <NavLink
          to="/technologisteditprofile"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Edit Profile
        </NavLink>

        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#000',
            textDecoration: 'none',
            margin: '0 15px',
            marginRight: '0',
            position: 'relative',
            paddingBottom: '15px',
            paddingTop: '10px',
            fontWeight: 'normal',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          className="nav-link"
        >
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;