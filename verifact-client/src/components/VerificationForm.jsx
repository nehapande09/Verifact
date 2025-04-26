import React from 'react';
import './VerificationForm.css';

function VerificationForm({ statement, setStatement, onVerify }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedStatement = statement.trim();
    if (trimmedStatement) {
      onVerify(trimmedStatement);
    }
  };

  const handleDemoClick = () => {
    const demoText = "The Eiffel Tower is taller than the Statue of Liberty.";
    setStatement(demoText);
  };

  return (
    <div className="verification-form">
      <div className="live-demo">
        <h3>Try a Demo Statement</h3>
        <button className="demo-button" onClick={handleDemoClick}>
          <span className="play-icon">▶</span> Use Demo
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Enter a statement to verify..."
            required
          />
          <button type="submit" className="verify-button">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerificationForm;
