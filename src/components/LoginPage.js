// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Link to external stylesheet
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(user => user.email === email && user.password === password);

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      navigate('/home');
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Assuming '/' is your landing page route
  };

  return (
    <div className="form-container">
      <button className="back-button" onClick={handleGoBack}>
        <FaArrowLeft /> Back
      </button>
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="social-section">
          <p>or login with:</p>
          <div className="social-buttons">
            <button disabled className="google-btn">Google</button>
            <button disabled className="facebook-btn">Facebook</button>
          </div>
        </div>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;