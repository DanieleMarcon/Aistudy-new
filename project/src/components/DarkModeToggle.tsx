import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../styles/DarkModeToggle.css';

const DarkModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="darkmode-toggle" 
      onClick={toggleTheme} 
      aria-label={theme === 'light' ? 'Attiva modalità scura' : 'Attiva modalità chiara'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="moon-icon" />
      ) : (
        <Sun size={20} className="sun-icon" />
      )}
    </button>
  );
};

export default DarkModeToggle;