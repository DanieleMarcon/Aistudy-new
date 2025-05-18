import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Brain, BookText, Lightbulb, Map, Mic, Settings, Upload } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <BookOpen className="logo-icon" />
          <span className="logo-text">AIstudy</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/studiamo" className={`nav-link ${isActive('/studiamo') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <BookText size={20} />
            <span>Studiamo</span>
          </Link>
          <Link to="/chiedi" className={`nav-link ${isActive('/chiedi') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Lightbulb size={20} />
            <span>Chiedi</span>
          </Link>
          <Link to="/risorse" className={`nav-link ${isActive('/risorse') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Upload size={20} />
            <span>Risorse</span>
          </Link>
          <Link to="/vocabolario" className={`nav-link ${isActive('/vocabolario') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <BookOpen size={20} />
            <span>Vocabolario</span>
          </Link>
          <Link to="/testo" className={`nav-link ${isActive('/testo') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <BookText size={20} />
            <span>Testo</span>
          </Link>
          <Link to="/mappe" className={`nav-link ${isActive('/mappe') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Map size={20} />
            <span>Mappe</span>
          </Link>
          <Link to="/specchio" className={`nav-link ${isActive('/specchio') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Mic size={20} />
            <span>Specchio</span>
          </Link>
          <Link to="/accessibilita" className={`nav-link ${isActive('/accessibilita') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            <Settings size={20} />
            <span>Accessibilità</span>
          </Link>
        </div>

        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;