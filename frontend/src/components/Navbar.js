import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '1rem',
    cursor: 'pointer'
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => navigate('/dashboard')}>
        Expense Control
      </div>
      
      <div style={userInfoStyle}>
        <span onClick={() => navigate('/dashboard')} style={linkStyle}>
          Dashboard
        </span>
        {isAdmin && (
          <span onClick={() => navigate('/users')} style={linkStyle}>
            Users
          </span>
        )}
        <span>Welcome, {user?.first_name || user?.username}!</span>
        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          ({user?.role})
        </span>
        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;