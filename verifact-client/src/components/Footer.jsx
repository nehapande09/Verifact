import React from 'react';
import './Footer.css';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-company">
          <h3>VeriFact</h3>
          <p>AI-powered fact checking platform for reliable information verification.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;