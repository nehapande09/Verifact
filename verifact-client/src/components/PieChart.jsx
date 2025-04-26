import React from 'react';
import './PieChart.css';

function PieChart({ percentage = 0, color = "#3b82f6", label = "Support %" }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="pie-chart-container" style={{ textAlign: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 60 60)"
        />
        {/* Percentage Text */}
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="20"
          fill="#111"
          fontWeight="bold"
        >
          {percentage}%
        </text>
      </svg>
      {/* Label below */}
      <p className="text-sm text-gray-700 mt-2">{label}</p>
    </div>
  );
}

export default PieChart;
