import React from 'react';

export default function ProgressBar({ progress, text }) {
  return (
    <div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      {text && <div className="progress-text">{text} ({Math.round(progress)}%)</div>}
    </div>
  );
}