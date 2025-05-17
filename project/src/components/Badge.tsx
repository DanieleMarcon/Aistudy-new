import React from 'react';
import '../styles/Badge.css';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  pulsing?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  icon,
  pulsing = false,
  className = '',
}) => {
  return (
    <div 
      className={`
        badge 
        badge-${variant} 
        badge-${size} 
        ${pulsing ? 'badge-pulsing' : ''} 
        ${className}
      `}
    >
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-text">{text}</span>
    </div>
  );
};

export default Badge;