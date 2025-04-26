import React, { useEffect, useState } from 'react';
import './HistoryPage.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/history')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error fetching history:', err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getModelVerdicts = (prediction, deep_analysis) => {
    const primaryScore = prediction?.pie_chart?.SUPPORTS ?? 0;
    const secondaryScore = deep_analysis?.pie_chart?.NOT_SUPPORTS ?? 0;

    const primaryVerdict = primaryScore >= 50 ? 'True' : 'False';
    const secondaryVerdict = secondaryScore < 50 ? 'True' : 'False';

    return { primaryScore, secondaryScore, primaryVerdict, secondaryVerdict };
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Search History (Last 7 Days)</h2>

      <div className="history-list">
        {history.map((item, index) => {
          const {
            primaryScore,
            secondaryScore,
            primaryVerdict,
            secondaryVerdict,
          } = getModelVerdicts(item.prediction, item.deep_analysis);

          return (
            <div key={index} className="history-card">
              <div className="timestamp-top">
                {new Date(item.created_at).toLocaleString()}
              </div>

              <p className="statement"><strong>Statement:</strong> {item.statement}</p>

              <button className="view-button" onClick={() => toggleExpand(index)}>
                {expandedIndex === index ? 'Hide Results' : 'View Results'}
              </button>

              {expandedIndex === index && (
                <div className="results-section">
                  <ul>
                    <li>Model 1 (Trending): {primaryVerdict} ({primaryScore}%)</li>
                    <li>Model 2 (Analysis): {secondaryVerdict} ({secondaryScore}%)</li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryPage;
