// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css'; // Import the external CSS
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>
          <FaEnvelope className="footer-icon" /> Email: mkarthikeya122@gmail.com
        </p>
        <p>
          <FaPhone className="footer-icon" /> Phone: +91 93927 45443
        </p>
        <p>
          <FaMapMarkerAlt className="footer-icon" /> Address: Benz Circle, Vijayawada, AP
        </p>
      </div>
      <p className="footer-copyright">&copy; 2025 Your Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;