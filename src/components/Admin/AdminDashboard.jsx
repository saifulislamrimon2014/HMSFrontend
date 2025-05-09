import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AdminDashboard = () => {
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
          Welcome to your panel, MD!
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          You can now manage your payments, inventory, and other services.
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
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Doctors</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>25</p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Patient</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>220</p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Inventory</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>10</p>
          </div>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Technologist</h3>
            <p style={{ color: '#28a745', fontSize: '32px', fontWeight: 'bold' }}>5</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;