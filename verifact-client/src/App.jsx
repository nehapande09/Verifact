import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import VerificationForm from './components/VerificationForm';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';

function App() {
  const [statement, setStatement] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (inputStatement) => {
    setStatement(inputStatement);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement: inputStatement }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch verification results');
      }

      const data = await response.json();
      
      setResults(data);

    } catch (error) {
      console.error('Error verifying statement:', error);
    } finally {
      setIsLoading(false);
    }
  };
console.log({results})
  return (
    <div className="app">
      <Header />

      <main>
        <section className="hero">
          <div className="container">
            <h1>AI-Powered Fact Checking</h1>
            <p className="subtitle">
              Verify any statement with our advanced AI technology. Get instant analysis backed by reliable sources.
            </p>
            <HowItWorks />
            {/* 👇 Pass statement and setStatement */}
            <VerificationForm
              statement={statement}
              setStatement={setStatement}
              onVerify={handleVerify}
            />
          </div>
        </section>

        {isLoading && (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Verifying...</p>
          </div>
        )}

        {results && <ResultsSection results={results} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
