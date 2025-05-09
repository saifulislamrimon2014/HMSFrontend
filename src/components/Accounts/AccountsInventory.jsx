import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const AccountsInventory = () => {
  // State for inventory data and pagination
  const [inventory, setInventory] = useState([
    { itemNo: 1, itemName: 'Desk', quantity: 6, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 2, itemName: 'Chair', quantity: 8, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 3, itemName: 'Monitor', quantity: 4, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 4, itemName: 'Cabinet', quantity: 6, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 5, itemName: 'Monitor', quantity: 8, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 6, itemName: 'Table', quantity: 7, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 7, itemName: 'Computer', quantity: 8, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 8, itemName: 'Cots', quantity: 6, purchaseDate: '13-Aug-2023 at 10:00 AM' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ itemNo: '', itemName: '', quantity: '', purchaseDate: '' });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inventory.length / itemsPerPage);

  // Handle Modify Modal submission
  const handleModifySubmit = () => {
    if (selectedItem && newItem.itemName && newItem.quantity && newItem.purchaseDate) {
      const updatedInventory = inventory.map(item =>
        item.itemNo === selectedItem.itemNo ? { ...item, ...newItem } : item
      );
      setInventory(updatedInventory);
      setShowModifyModal(false);
      setSelectedItem(null);
      setNewItem({ itemNo: '', itemName: '', quantity: '', purchaseDate: '' });
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
    boxSizing: 'border-box'
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
        maxWidth: '1000px',
        margin: '30px auto'
      }}>
        <h1 style={{ color: '#28a745', fontSize: '28px', fontWeight: '500', marginBottom: '30px', textAlign: 'center' }}>
          Inventory
        </h1>

        {/* Inventory Table */}
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Item No</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Item Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Quantity</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Purchase Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.itemNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.itemNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.itemName}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.purchaseDate}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => {
                        setShowModifyModal(true);
                        setSelectedItem(item);
                        setNewItem({ ...item });
                      }}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#007bff',
                        color: '#fff'
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
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

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              ...buttonStyle,
              backgroundColor: currentPage === 1 ? '#adb5bd' : '#6c757d',
              color: '#fff',
              padding: '8px 15px'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) e.target.style.backgroundColor = '#5a6268';
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) e.target.style.backgroundColor = '#6c757d';
            }}
            onMouseDown={(e) => {
              if (currentPage !== 1) e.target.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              if (currentPage !== 1) e.target.style.transform = 'scale(1)';
            }}
          >
            Previous
          </button>
          <span style={{ color: '#666', fontSize: '16px', padding: '5px 10px' }}>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              ...buttonStyle,
              backgroundColor: currentPage === totalPages ? '#adb5bd' : '#6c757d',
              color: '#fff',
              padding: '8px 15px'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) e.target.style.backgroundColor = '#5a6268';
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages) e.target.style.backgroundColor = '#6c757d';
            }}
            onMouseDown={(e) => {
              if (currentPage !== totalPages) e.target.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              if (currentPage !== totalPages) e.target.style.transform = 'scale(1)';
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modify Modal */}
      {showModifyModal && (
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
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '20px' }}>
              Modify Item
            </h3>
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.itemName}
              onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
              style={{ ...inputStyle, marginBottom: '15px' }}
              onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              style={{ ...inputStyle, marginBottom: '15px' }}
              onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
            <input
              type="text"
              placeholder="Purchase Date"
              value={newItem.purchaseDate}
              onChange={(e) => setNewItem({ ...newItem, purchaseDate: e.target.value })}
              style={{ ...inputStyle, marginBottom: '15px' }}
              onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleModifySubmit}
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
                Confirm
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

export default AccountsInventory;