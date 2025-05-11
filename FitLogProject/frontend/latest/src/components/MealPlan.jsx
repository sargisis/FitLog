import React, { useState } from "react";
import { mealPlan } from "../../Api/ApiService";

function MealPlan() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
  });

  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await mealPlan(formData);
      setResponse(res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Meal Plan</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          onChange={handleChange}
          value={formData.height}
          style={inputStyle}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          onChange={handleChange}
          value={formData.weight}
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          value={formData.age}
          style={inputStyle}
        />
         <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
        <button type="submit" style={buttonStyle}>
          Get Recommendations
        </button>
      </form>

      {response && (
        <div style={{
          marginTop: '30px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          width: '80%',
          maxWidth: '700px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          whiteSpace: 'pre-wrap'
        }}>
          <h3 style={{ color: '#444', marginBottom: '10px' }}>Advice from Gemini:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#000',
  color: 'yellow',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default MealPlan;
