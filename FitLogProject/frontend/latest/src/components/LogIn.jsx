import React, { useState } from 'react';
import { loginUser } from '../../Api/ApiService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      alert('Login successful!');
      navigate('/home')

    } catch (error) {
      alert('Login error: ' + (error.response?.data?.message || 'Unknown error'));
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
      <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{
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
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={sharedStyle}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={sharedStyle}
        />
        <button type="submit" style={{
          ...sharedStyle,
          backgroundColor: 'black',
          color: 'yellow',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
