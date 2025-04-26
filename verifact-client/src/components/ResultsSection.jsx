import React, { useState } from 'react';
import './ResultsSection.css';
import PieChart from './PieChart';
import {
  FaCheck,
  FaShareAlt,
  FaBookmark,
  FaDownload,
  FaExternalLinkAlt,
} from 'react-icons/fa';

function ResultsSection({ results }) {
  if (!results) return null;

  const { statement, isTrue, prediction, verdict, deep_analysis } = results;

  // State to manage the visibility of sources
  const [showSources, setShowSources] = useState(false);

  const toggleSources = () => {
    setShowSources(!showSources);
  };

  return (
    <section className="results-section">
      <div className="container">
        <div className="result-card">

          {/* Verified Statement */}
          <div className="statement-section">
            <h3>Verified Statement:</h3>
            <p className="statement">{statement}</p>
          </div>

          {/* Verification Result
            <div className="verification-result">
              <h3>Result:</h3>
              <p className="result">
                <span className={`result-badge ${isTrue ? 'true' : 'false'}`}>
                  {isTrue ? 'True' : 'False'}
                </span>
                <span className="confidence"> (Confidence: {prediction?.pie_chart?.SUPPORTS}%)</span>
              </p>
            </div> */}

          {/* Model Analysis Pie Charts */}
          <div className="model-analysis">
            <div className="model">
              <h4>Trending</h4>
              <PieChart percentage={prediction?.pie_chart?.SUPPORTS} color="#3b82f6" />
              <span className="model-percentage">{prediction?.pie_chart?.SUPPORTS}%</span>
            </div>
            <div className="model">
              <h4>Analysis</h4>
              <PieChart percentage={deep_analysis?.pie_chart?.NOT_SUPPORTS} color="#10b981" />
              <span className="model-percentage">{deep_analysis?.pie_chart?.NOT_SUPPORTS}%</span>
            </div>
          </div>

          {/* Sources List */}
          <p className="sources-note">Based on the following sources:</p>
          <button onClick={toggleSources} className="toggle-sources-button">
            {showSources ? 'Hide Sources' : 'Show Sources'}
          </button>
          {showSources && prediction?.sources?.length > 0 && (
            <div className="detailed-sources">
              {prediction.sources.map((source, index) => (
                <div key={index} className="source-card">
                  <a
                    href={source?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-title"
                  >
                    {source.title} <FaExternalLinkAlt className="external-link-icon" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Key Points */}
          {/* {keyPoints?.length > 0 && (
              <div className="key-points">
                <h3>Key Points:</h3>
                <ul>
                  {keyPoints.map((point, index) => (
                    <li key={index}>
                      <FaCheck className="check-icon" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

          {/* Result Summary */}
          {results?.result && (
            <div className="result-text">
              <h3><strong>Result:</strong></h3>
              <p><strong>{results.result}</strong></p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-button">
              <FaShareAlt /> Share
            </button>
            <button className="action-button">
              <FaBookmark /> Save
            </button>
            <button className="action-button">
              <FaDownload /> Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;