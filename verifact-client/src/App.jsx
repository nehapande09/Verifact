// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import VerificationForm from './components/VerificationForm';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';
import LatestCards from './components/LatestCards';
import HistoryPage from './pages/HistoryPage';

function HomePage({
  statement,
  setStatement,
  handleVerify,
  latest,
  results,
  isLoading,
}) {
  return (
    <section className="hero">
      <div className="container">
        <h1>AI-Powered Fact Checking</h1>
        <p className="subtitle">
          Verify any statement with our advanced AI technology. Get instant analysis backed by reliable sources.
        </p>

        
        {/* How It Works Section */}
        <HowItWorks />

        


        {/* Verification Form Section */}
        <VerificationForm
          statement={statement}
          setStatement={setStatement}
          onVerify={handleVerify}
        />
      </div>
     

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Verifying...</p>
        </div>
      )}

      {/* Show Verification Results */}
      {results && <ResultsSection results={results} />}

       {/* Latest Verifications Section */}
       <section className="latest-verifications">
          <h2 className="section-title"></h2>
          <LatestCards data={latest} />
        </section>
    </section>

    
  );
}


function App() {
  const [statement, setStatement] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latest, setLatest] = useState([]);
  const [history, setHistory] = useState([]);
  const [latestError, setLatestError] = useState('');
  const [historyError, setHistoryError] = useState('');

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
      fetchLatest();
      fetchHistory();
    } catch (error) {
      console.error('Error verifying statement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLatest = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/latest');
      const data = await res.json();
      setLatest(data);
    } catch (err) {
      setLatestError('Error fetching latest data');
      console.error('Error fetching latest:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setHistoryError('Error fetching history');
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchLatest();
    fetchHistory();
  }, []);

  return (
    <div className="app">
      {latestError && <p className="error">{latestError}</p>}
      {historyError && <p className="error">{historyError}</p>}

      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                statement={statement}
                setStatement={setStatement}
                handleVerify={handleVerify}
                latest={latest}
                results={results}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
