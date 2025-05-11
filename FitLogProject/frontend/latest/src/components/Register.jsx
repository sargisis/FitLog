import React, { useState } from 'react';
import { registerUser, resetPassword } from '../../Api/ApiService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();
  const [resetData, setResetData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      console.log('Registration response:', res);
      alert('✅ Registration successful!');
      navigate('/LogIn')
    } catch (error) {
      console.error('Registration error:', error);
      alert('❌ Registration error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(resetData);
      console.log('Reset response:', res);
      alert('✅ Password has been reset!');
    } catch (error) {
      console.error('Reset error:', error);
      alert('❌ Reset error: ' + (error.response?.data?.message || error.message));
    }
  };

  const sharedStyle = {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>
        {showReset ? 'Reset Password' : 'Registration'}
      </h2>

      {!showReset ? (
        <form onSubmit={handleRegisterSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleRegisterChange}
            placeholder="Username"
            required
            style={sharedStyle}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleRegisterChange}
            placeholder="Password"
            required
            style={sharedStyle}
          />
          <button type="submit" style={{
            ...sharedStyle,
            backgroundColor: 'black',
            color: 'yellow',
            cursor: 'pointer',
          }}>
            Register
          </button>
          <button
            type="button"
            style={{
              marginTop: '10px',
              background: 'none',
              border: 'none',
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => setShowReset(true)}
          >
            Forgot password?
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
          <input
            type="text"
            name="username"
            value={resetData.username}
            onChange={handleResetChange}
            placeholder="Username"
            required
            style={sharedStyle}
          />
          <input
            type="password"
            name="oldPassword"
            value={resetData.oldPassword}
            onChange={handleResetChange}
            placeholder="Old Password"
            required
            style={sharedStyle}
          />
          <input
            type="password"
            name="newPassword"
            value={resetData.newPassword}
            onChange={handleResetChange}
            placeholder="New Password"
            required
            style={sharedStyle}
          />
          <button type="submit" style={{
            ...sharedStyle,
            backgroundColor: '#black',
            color: '#ffffff',
            cursor: 'pointer'
          }}>
            Reset Password
          </button>
          <button
            type="button"
            style={{
              marginTop: '10px',
              background: 'none',
              border: 'none',
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => setShowReset(false)}
          >
            Back to Registration
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
