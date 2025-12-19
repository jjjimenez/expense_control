import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import Navbar from '../components/Navbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.users);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingUser) {
        // Update user
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password; // Don't update password if empty
        }
        await userService.updateUser(editingUser.id, updateData);
      } else {
        // Create user
        await userService.createUser(formData);
      }
      
      await fetchUsers();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      role: user.role
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        await fetchUsers();
      } catch (err) {
        setError(err.response?.data?.error || 'Delete failed');
        console.error('Delete error:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      role: 'user'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setError('');
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const contentStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const titleStyle = {
    color: '#2c3e50',
    fontSize: '2rem',
    margin: 0
  };

  const buttonStyle = {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const tableStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const thStyle = {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '1rem',
    textAlign: 'left'
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #ecf0f1'
  };

  const actionButtonStyle = {
    padding: '0.25rem 0.5rem',
    margin: '0 0.25rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#3498db',
    color: 'white'
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#e74c3c',
    color: 'white'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const selectStyle = {
    ...inputStyle
  };

  const modalButtonStyle = {
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const saveButtonStyle = {
    ...modalButtonStyle,
    backgroundColor: '#27ae60',
    color: 'white'
  };

  const cancelButtonStyle = {
    ...modalButtonStyle,
    backgroundColor: '#95a5a6',
    color: 'white'
  };

  const errorStyle = {
    color: '#e74c3c',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const badgeStyle = {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  const adminBadgeStyle = {
    ...badgeStyle,
    backgroundColor: '#e74c3c',
    color: 'white'
  };

  const userBadgeStyle = {
    ...badgeStyle,
    backgroundColor: '#3498db',
    color: 'white'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <Navbar />
        <div style={contentStyle}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading users...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>User Management</h1>
          <button style={buttonStyle} onClick={openCreateModal}>
            Add New User
          </button>
        </div>

        {error && <div style={errorStyle}>{error}</div>}

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Created</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>
                  {user.first_name || user.last_name 
                    ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                    : '-'
                  }
                </td>
                <td style={tdStyle}>
                  <span style={user.role === 'admin' ? adminBadgeStyle : userBadgeStyle}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td style={tdStyle}>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td style={tdStyle}>
                  <button
                    style={editButtonStyle}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
            No users found
          </div>
        )}
      </div>

      {showModal && (
        <div style={modalStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
              {editingUser ? 'Edit User' : 'Create New User'}
            </h2>

            {error && <div style={errorStyle}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />

              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                style={inputStyle}
              />

              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                style={inputStyle}
              />

              <input
                type="password"
                name="password"
                placeholder={editingUser ? "New Password (leave empty to keep current)" : "Password"}
                value={formData.password}
                onChange={handleInputChange}
                style={inputStyle}
                required={!editingUser}
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                style={selectStyle}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                <button type="button" style={cancelButtonStyle} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" style={saveButtonStyle}>
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;