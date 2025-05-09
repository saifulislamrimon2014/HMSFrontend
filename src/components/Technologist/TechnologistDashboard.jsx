import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TechnologistDashboard = () => {
  const [technologist, setTechnologist] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedTechnologist = localStorage.getItem('technologist');
    if (!storedTechnologist) {
      toast.error('Please login first');
      navigate('/TechnologistLogin');
    } else {
      setTechnologist(JSON.parse(storedTechnologist));
    }
  }, [navigate]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#fff',
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#28a745', fontSize: '24px', marginBottom: '10px' }}>
          Welcome to your panel, {technologist?.name || 'Technologist'}!
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          You can now manage reports, deliveries, and other services.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Pending Report Delivery</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>25</p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Total Report</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>220</p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Re-update Report</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>10</p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Total Delivered Report</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>115</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechnologistDashboard;