import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  onClick, 
  className = '' 
}) => {
  const cardContent = (
    <>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </>
  );

  // If a link is provided, render as Link
  if (to) {
    return (
      <Link to={to} className={`card ${className}`}>
        {cardContent}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <div 
      className={`card ${className}`} 
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {cardContent}
    </div>
  );
};

export default Card;