import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50',
    fontSize: '2rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1
  };

  const errorStyle = {
    color: '#e74c3c',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '1rem'
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Login</h2>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={formData.username}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div style={linkStyle}>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;