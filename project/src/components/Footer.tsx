import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AIstudy</h3>
          <p>Strumenti digitali accessibili per migliorare l'autonomia nello studio</p>
        </div>
        
        <div className="footer-section">
          <h3>Navigazione</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/studiamo">Studiamo</Link></li>
            <li><Link to="/chiedi">Chiedi</Link></li>
            <li><Link to="/vocabolario">Vocabolario</Link></li>
            <li><Link to="/risorse">Risorse</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Risorse</h3>
          <ul>
            <li><Link to="/testo">Testo</Link></li>
            <li><Link to="/mappe">Mappe</Link></li>
            <li><Link to="/specchio">Specchio</Link></li>
            <li><Link to="/accessibilita">Accessibilità</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} AIstudy - Progetto Educativo</p>
        <div className="social-links">
          <span>Creato con <Heart size={16} className="heart-icon" /></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;