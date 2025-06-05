import React from "react";
import './Dashboard.css';
import type { Score } from './App';

interface DashboardProps {
  score: Score | null;
}

export default function Dashboard({ score }: DashboardProps) {
  if (!score) return null;

  return (
    <div className="dashboard">
      <h2>Domain Health Score</h2>
      <div className="score-total">
        <span className="score-label">Total Score:</span>
        <span className="score-value">{score.total}</span>
      </div>
      <div className="score-breakdown">
        <div className="score-card spf">
          <h3>SPF</h3>
          <p>Score: {score.spf}</p>
          <p>Reason: {score.reasons.spf}</p>
          <p>Recommendation: {score.recommendations.spf}</p>
        </div>
        <div className="score-card dkim">
          <h3>DKIM</h3>
          <p>Score: {score.dkim}</p>
          <p>Reason: {score.reasons.dkim}</p>
          <p>Recommendation: {score.recommendations.dkim}</p>
        </div>
        <div className="score-card dmarc">
          <h3>DMARC</h3>
          <p>Score: {score.dmarc}</p>
          <p>Reason: {score.reasons.dmarc}</p>
          <p>Recommendation: {score.recommendations.dmarc}</p>
        </div>
      </div>
      <div className="score-details">
        <h4>Details</h4>
        <ul>
          {Object.entries(score.details).map(([k, v]) => (
            <li key={k}><b>{k}:</b> {v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
