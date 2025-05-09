import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';
import './Header.css';

const Header = () => {
  const { adminLogout } = useContext(AuthContext);
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
  const handleLogout = (e) => {
    e.preventDefault();
    adminLogout();
    toast.success("Logged out successfully!");
    navigate('/adminlogin');
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
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink
          to="/AdminDashboard"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/AdminPatient"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Patients
        </NavLink>

        <NavLink
          to="/AdminDoctor"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Doctors
        </NavLink>
        <NavLink
          to="/AdminTechnologist"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Technologists
        </NavLink>
        <NavLink
          to="/AdminAccountants"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Accountants
        </NavLink>

        <NavLink
          to="/AdminInventory"
          style={getNavLinkStyle}
          className="nav-link"
        >
          Inventory
        </NavLink>

        <a
          href="#"
          onClick={handleLogout}
          style={{
            color: '#000',
            textDecoration: 'none',
            margin: '0 15px',
            marginRight: '0',
            position: 'relative',
            paddingBottom: '15px',
            paddingTop: '10px',
            fontWeight: 'normal',
            transition: 'color 0.3s ease'
          }}
          className="nav-link"
        >
          Log Out
        </a>
      </nav>
    </header>
  );
};

export default Header;