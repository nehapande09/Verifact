import React from 'react';
import './HowItWorks.css';
import { FaKeyboard, FaRobot, FaCheckCircle } from 'react-icons/fa';

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-icon">
            <FaKeyboard />
          </div>
          <h2> Enter Statement</h2>
          <p>Input any statement you want to verify. Our AI will process your request.</p>
        </div>
        
        <div className="step">
          <div className="step-icon">
            <FaRobot />
          </div>
          <h2> AI Analysis</h2>
          <p>Our AI models analyze the statement using multiple reliable sources.</p>
        </div>
        
        <div className="step">
          <div className="step-icon">
            <FaCheckCircle />
          </div>
          <h2> Get Results</h2>
          <p>Receive comprehensive analysis with visual charts and detailed explanations.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;