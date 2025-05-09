import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const AdminInventory = () => {
  // State for inventory data, search, pagination, and modals
  const [inventory, setInventory] = useState([
    { itemNo: 1, itemName: 'Desk', quantity: 6, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 2, itemName: 'Chair', quantity: 8, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 3, itemName: 'Monitor', quantity: 4, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 4, itemName: 'Cabinet', quantity: 6, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 5, itemName: 'Laptop', quantity: 8, purchaseDate: '15-Aug-2023 at 10:00 AM' },
    { itemNo: 6, itemName: 'Table', quantity: 7, purchaseDate: '13-Aug-2023 at 10:00 AM' },
    { itemNo: 7, itemName: 'Computer', quantity: 8, purchaseDate: '15-Aug-2023 at 10:00 AM' },
    { itemNo: 8, itemName: 'Cots', quantity: 6, purchaseDate: '15-Aug-2023 at 10:00 AM' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState({ itemName: '', quantity: '', purchaseDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  // Handle Modify button click
  const handleModifyClick = (item) => {
    setSelectedItem(item);
    setEditedItem({
      itemName: item.itemName,
      quantity: item.quantity,
      purchaseDate: item.purchaseDate,
    });
    setShowModifyModal(true);
  };

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save changes in Modify modal
  const handleSaveChanges = () => {
    if (selectedItem) {
      const updatedInventory = inventory.map((item) =>
        item.itemNo === selectedItem.itemNo ? { ...item, ...editedItem } : item
      );
      setInventory(updatedInventory);
      setShowModifyModal(false);
      setSelectedItem(null);
      setEditedItem({ itemName: '', quantity: '', purchaseDate: '' });
    }
  };

  // Handle Delete action
  const handleDelete = (itemNo) => {
    const updatedInventory = inventory.filter((item) => item.itemNo !== itemNo);
    setInventory(updatedInventory);
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
          Inventory
        </h1>

        {/* Search Input */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '35px', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23666" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>') no-repeat 10px center`, width: '300px' }}
            onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

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
                <tr key={item.itemNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.itemNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.itemName}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.purchaseDate}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                    <button
                      onClick={() => handleModifyClick(item)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#28a745',
                        color: '#fff',
                        marginRight: '5px'
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
                      onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                      onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleDelete(item.itemNo)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            style={{
              ...buttonStyle,
              backgroundColor: '#6f42c1',
              color: '#fff',
              padding: '8px 12px',
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                ...buttonStyle,
                backgroundColor: currentPage === page ? '#28a745' : '#6f42c1',
                color: '#fff',
                padding: '8px 12px'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = currentPage === page ? '#218838' : '#5a32a3')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = currentPage === page ? '#28a745' : '#6f42c1')}
              onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            style={{
              ...buttonStyle,
              backgroundColor: '#6f42c1',
              color: '#fff',
              padding: '8px 12px',
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modify Modal */}
      {showModifyModal && selectedItem && (
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>{selectedItem.itemName}</h3>
              <input
                type="text"
                name="itemName"
                value={editedItem.itemName}
                onChange={handleInputChange}
                placeholder="Item Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="number"
                name="quantity"
                value={editedItem.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="text"
                name="purchaseDate"
                value={editedItem.purchaseDate}
                onChange={handleInputChange}
                placeholder="Purchase Date"
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

export default AdminInventory;