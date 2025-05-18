// src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Import external CSS

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === formData.email);
    if (userExists) {
      alert('User already exists with this email!');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the landing page (assuming '/' is your landing page route)
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="back-button" onClick={handleBack}>
          &larr; Back
        </button>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;