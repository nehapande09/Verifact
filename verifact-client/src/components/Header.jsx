import React from 'react';
import './Header.css';
import logo from '../assets/logo.png'; // You'll need to add a logo image

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <img src={logo} alt="VeriFact Logo" />
          <span>VeriFact</span>
        </div>
        <nav>
          <ul>
            <li><a href="#" className="active">How It Works</a></li>
            <li><a href="#">Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;