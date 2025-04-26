import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom'; // ✅ Use NavLink instead of Link

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
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                How It Works
              </NavLink>
            </li>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                Get Started
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
                History
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
   