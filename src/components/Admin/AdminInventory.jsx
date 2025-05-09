import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const AdminInventory = () => {
  // State for inventory data, search, pagination, and modals
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState({ itemName: '', quantity: '', purchaseDate: '' });
  const [newItem, setNewItem] = useState({ itemName: '', quantity: '', purchaseDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch inventory data from MongoDB API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/inventory/');

        // Map the response data to our format
        const inventoryList = response.data.map((item) => ({
          id: item.id, // MongoDB document ID
          itemNo: item.itemNo,
          itemName: item.itemName,
          quantity: item.quantity,
          purchaseDate: item.purchaseDate
        }));

        setInventory(inventoryList);
        setError(null);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item =>
    item.itemName && item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save changes in Modify modal
  const handleSaveChanges = async () => {
    if (selectedItem) {
      try {
        setLoading(true);

        // Create data object to update in MongoDB
        const itemData = {
          itemName: editedItem.itemName,
          quantity: editedItem.quantity,
          purchaseDate: editedItem.purchaseDate
        };

        // Update document in MongoDB via API
        await axios.put(`http://localhost:8000/api/inventory/update/${selectedItem.id}/`, itemData);

        // Update local state
        const updatedInventory = inventory.map((item) =>
          item.id === selectedItem.id
            ? { ...item, ...itemData, updatedAt: new Date().toISOString() }
            : item
        );

        setInventory(updatedInventory);
        setShowModifyModal(false);
        setSelectedItem(null);
        setEditedItem({ itemName: '', quantity: '', purchaseDate: '' });
        alert('Inventory item updated successfully!');
      } catch (err) {
        console.error("Error updating inventory item:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to update inventory item. Please try again: ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setLoading(true);

        // Delete from MongoDB via API
        await axios.delete(`http://localhost:8000/api/inventory/delete/${id}/`);

        // Update local state
        const updatedInventory = inventory.filter((item) => item.id !== id);
        setInventory(updatedInventory);
        alert('Inventory item deleted successfully!');
      } catch (err) {
        console.error("Error deleting inventory item:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to delete inventory item. Please try again: ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Add Item submission
  const handleAddItem = async () => {
    if (newItem.itemName && newItem.quantity && newItem.purchaseDate) {
      try {
        setLoading(true);

        // Create data object to send to API
        const itemData = {
          itemName: newItem.itemName,
          quantity: newItem.quantity,
          purchaseDate: newItem.purchaseDate
        };

        // Add item via API
        const response = await axios.post('http://localhost:8000/api/inventory/add/', itemData);

        // Add to local state with the new document ID
        const newItemEntry = {
          id: response.data.id,
          itemNo: response.data.itemNo,
          ...itemData,
          createdAt: new Date().toISOString() // Use current date for display until refresh
        };

        setInventory([...inventory, newItemEntry]);
        setShowAddModal(false);
        setNewItem({ itemName: '', quantity: '', purchaseDate: '' });
        alert('Inventory item added successfully!');
      } catch (err) {
        console.error("Error adding inventory item:", err);
        const errorMessage = err.response?.data?.error || err.message;
        alert('Failed to add inventory item. Please try again: ' + errorMessage);
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
          Inventory
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

        {/* Search Input and Add Item Button */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by Name..."
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
            Add Item
          </button>
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
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #28a745',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <span>Loading inventory items...</span>
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
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>
                    No inventory items found. Add a new item using the button above.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id || item.itemNo} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#f9f9f9' }}>
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
                        onClick={() => handleDelete(item.id)}
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
                ))
              )}
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
              <h3 style={{ color: '#28a745', fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>{selectedItem.itemName}</h3>

              {/* Item Number (non-editable) */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  value={`Item #${selectedItem.itemNo}`}
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
                name="itemName"
                value={editedItem.itemName}
                onChange={(e) => handleInputChange(e, setEditedItem)}
                placeholder="Item Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="number"
                name="quantity"
                value={editedItem.quantity}
                onChange={(e) => handleInputChange(e, setEditedItem)}
                placeholder="Quantity"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              {/* Purchase Date as date input */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={editedItem.purchaseDate}
                  onChange={(e) => handleInputChange(e, setEditedItem)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
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
                  if (window.confirm(`Are you sure you want to delete ${selectedItem.itemName}?`)) {
                    handleDelete(selectedItem.id);
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

      {/* Add Item Modal */}
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
                Add New Inventory Item
              </h3>

              {/* Auto-generated Item Number */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  value="Item # (Auto-generated)"
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
                name="itemName"
                value={newItem.itemName}
                onChange={(e) => handleInputChange(e, setNewItem)}
                placeholder="Item Name"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={(e) => handleInputChange(e, setNewItem)}
                placeholder="Quantity"
                style={{ ...inputStyle }}
                onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />

              {/* Purchase Date as date input */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={newItem.purchaseDate}
                  onChange={(e) => handleInputChange(e, setNewItem)}
                  style={{ ...inputStyle }}
                  onFocus={(e) => Object.assign(e.target.style, inputHoverFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddItem}
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

export default AdminInventory;