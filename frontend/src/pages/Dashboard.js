import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const contentStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const titleStyle = {
    color: '#2c3e50',
    marginBottom: '1rem',
    fontSize: '2rem'
  };

  const subtitleStyle = {
    color: '#7f8c8d',
    marginBottom: '2rem'
  };

  const infoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const infoCardStyle = {
    backgroundColor: '#ecf0f1',
    padding: '1rem',
    borderRadius: '4px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  };

  const valueStyle = {
    color: '#34495e'
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    backgroundColor: user?.role === 'admin' ? '#e74c3c' : '#3498db',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={contentStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Dashboard</h1>
          <p style={subtitleStyle}>Welcome to your expense control dashboard</p>
          
          <div style={infoStyle}>
            <div style={infoCardStyle}>
              <div style={labelStyle}>Username</div>
              <div style={valueStyle}>{user?.username}</div>
            </div>
            
            <div style={infoCardStyle}>
              <div style={labelStyle}>Email</div>
              <div style={valueStyle}>{user?.email}</div>
            </div>
            
            <div style={infoCardStyle}>
              <div style={labelStyle}>Full Name</div>
              <div style={valueStyle}>
                {user?.first_name || user?.last_name 
                  ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
                  : 'Not provided'
                }
              </div>
            </div>
            
            <div style={infoCardStyle}>
              <div style={labelStyle}>Role</div>
              <div style={valueStyle}>
                <span style={badgeStyle}>
                  {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div style={infoCardStyle}>
              <div style={labelStyle}>Member Since</div>
              <div style={valueStyle}>
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleDateString()
                  : 'Unknown'
                }
              </div>
            </div>
          </div>
          
          {isAdmin && (
            <div style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              padding: '1rem',
              marginTop: '2rem'
            }}>
              <h3 style={{ color: '#856404', marginBottom: '0.5rem' }}>
                Admin Features
              </h3>
              <p style={{ color: '#856404', margin: 0 }}>
                As an administrator, you have access to user management features. 
                Use the "Users" link in the navigation to manage system users.
              </p>
            </div>
          )}
        </div>
        
        <div style={cardStyle}>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
            Quick Actions
          </h2>
          <p style={{ color: '#7f8c8d' }}>
            This is where you can add quick actions for expense management features.
            The current implementation focuses on user authentication and management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;