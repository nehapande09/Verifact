import React from 'react';
import './LatestCards.css';

function LatestCards({ data }) {
  if (!data.length) return null;

  const getModelResults = (prediction, deep_analysis) => {
    const primaryScore = prediction?.pie_chart?.SUPPORTS ?? 0;
    const secondaryScore = deep_analysis?.pie_chart?.NOT_SUPPORTS ?? 0;

    const primaryVerdict = primaryScore >= 50 ? 'True' : 'False';
    const secondaryVerdict = secondaryScore < 50 ? 'True' : 'False';

    return {
      primaryScore,
      secondaryScore,
      primaryVerdict,
      secondaryVerdict,
    };
  };

  return (
    <section className="latest-section">
      <h2>Latest Verifications</h2>
      <div className="card-grid">
        {data.map((item) => {
          const {
            primaryScore,
            secondaryScore,
            primaryVerdict,
            secondaryVerdict
          } = getModelResults(item.prediction, item.deep_analysis);

          return (
            <div className="card" key={item._id}>
              <p><strong>Statement:</strong> {item.statement}</p>
              <p><strong>Result:</strong></p>
              <ul>
                <li>Model 1 (Trending): {primaryVerdict} ({primaryScore}%)</li>
                <li>Model 2 (Analysis): {secondaryVerdict} ({secondaryScore}%)</li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default LatestCards;

