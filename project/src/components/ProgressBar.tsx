import React from 'react';
import '../styles/ProgressBar.css';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label,
  showPercentage = true,
  className = '',
  size = 'medium'
}) => {
  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`progress-container ${className} size-${size}`}>
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${validProgress}%` }}
          role="progressbar"
          aria-valuenow={validProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {showPercentage && size !== 'small' && (
            <span className="progress-percentage">{validProgress}%</span>
          )}
        </div>
      </div>
      {showPercentage && size === 'small' && (
        <div className="progress-percentage-outside">{validProgress}%</div>
      )}
    </div>
  );
};

export default ProgressBar;