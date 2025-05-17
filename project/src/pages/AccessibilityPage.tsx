import React, { useState } from 'react';
import { 
  Sun, Moon, Volume2, Volume1, VolumeX, 
  Clock, ZoomIn, ZoomOut, Type, Eye 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ProgressBar from '../components/ProgressBar';
import '../styles/AccessibilityPage.css';

const AccessibilityPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Simulated accessibility settings
  const [fontScale, setFontScale] = useState<number>(100);
  const [soundLevel, setSoundLevel] = useState<number>(50);
  const [breakInterval, setBreakInterval] = useState<number>(25);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [readAloud, setReadAloud] = useState<boolean>(false);
  const [simplifiedUI, setSimplifiedUI] = useState<boolean>(false);
  
  // Apply font scaling to document
  React.useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', `${fontScale}%`);
  }, [fontScale]);
  
  // Apply high contrast if enabled
  React.useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    return () => {
      document.body.classList.remove('high-contrast');
    };
  }, [highContrast]);
  
  // Apply dyslexic font if enabled
  React.useEffect(() => {
    if (dyslexicFont) {
      document.body.classList.add('dyslexic-font');
    } else {
      document.body.classList.remove('dyslexic-font');
    }
    
    return () => {
      document.body.classList.remove('dyslexic-font');
    };
  }, [dyslexicFont]);

  return (
    <div className="accessibility-page">
      <section className="header-section">
        <h1>Impostazioni di Accessibilità</h1>
        <p>Personalizza l'app in base alle tue esigenze</p>
      </section>

      <div className="settings-grid">
        <section className="settings-card appearance-settings">
          <h2>Aspetto</h2>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Sun size={20} />
                <span>Tema</span>
              </div>
              <button 
                className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`} 
                onClick={toggleTheme}
                aria-label="Cambia tema"
              >
                <div className="toggle-thumb"></div>
                <Sun className="light-icon" size={12} />
                <Moon className="dark-icon" size={12} />
              </button>
            </div>
            <p className="setting-description">
              {theme === 'light' ? 'Tema chiaro' : 'Tema scuro'} attivo
            </p>
          </div>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Type size={20} />
                <span>Dimensione del testo</span>
              </div>
              <div className="zoom-controls">
                <button 
                  onClick={() => setFontScale(Math.max(80, fontScale - 10))}
                  aria-label="Riduci dimensione testo"
                  disabled={fontScale <= 80}
                >
                  <ZoomOut size={16} />
                </button>
                <span>{fontScale}%</span>
                <button 
                  onClick={() => setFontScale(Math.min(150, fontScale + 10))}
                  aria-label="Aumenta dimensione testo"
                  disabled={fontScale >= 150}
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>
            <ProgressBar 
              progress={(fontScale - 80) / (150 - 80) * 100} 
              showPercentage={false}
              size="small"
            />
          </div>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Eye size={20} />
                <span>Contrasto elevato</span>
              </div>
              <button 
                className={`setting-toggle ${highContrast ? 'active' : ''}`}
                onClick={() => setHighContrast(!highContrast)}
                aria-label="Attiva/disattiva contrasto elevato"
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <p className="setting-description">
              Aumenta il contrasto tra testo e sfondo
            </p>
          </div>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Type size={20} />
                <span>Font per dislessia</span>
              </div>
              <button 
                className={`setting-toggle ${dyslexicFont ? 'active' : ''}`}
                onClick={() => setDyslexicFont(!dyslexicFont)}
                aria-label="Attiva/disattiva font per dislessia"
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <p className="setting-description">
              Utilizza un font progettato per facilitare la lettura
            </p>
          </div>
        </section>

        <section className="settings-card audio-settings">
          <h2>Audio</h2>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Volume2 size={20} />
                <span>Volume effetti</span>
              </div>
              <div className="volume-indicator">
                {soundLevel === 0 ? (
                  <VolumeX size={16} />
                ) : soundLevel < 50 ? (
                  <Volume1 size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soundLevel}
              onChange={(e) => setSoundLevel(parseInt(e.target.value))}
              className="range-slider"
              aria-label="Controllo volume"
            />
          </div>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Volume2 size={20} />
                <span>Leggi ad alta voce</span>
              </div>
              <button 
                className={`setting-toggle ${readAloud ? 'active' : ''}`}
                onClick={() => setReadAloud(!readAloud)}
                aria-label="Attiva/disattiva lettura ad alta voce"
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <p className="setting-description">
              Legge automaticamente i contenuti della pagina
            </p>
          </div>
        </section>

        <section className="settings-card interface-settings">
          <h2>Interfaccia</h2>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Clock size={20} />
                <span>Promemoria pausa</span>
              </div>
              <div className="interval-selector">
                <button 
                  onClick={() => setBreakInterval(Math.max(15, breakInterval - 5))}
                  disabled={breakInterval <= 15}
                >
                  -
                </button>
                <span>{breakInterval} min</span>
                <button 
                  onClick={() => setBreakInterval(Math.min(60, breakInterval + 5))}
                  disabled={breakInterval >= 60}
                >
                  +
                </button>
              </div>
            </div>
            <p className="setting-description">
              Ricorda di fare una breve pausa ogni {breakInterval} minuti
            </p>
          </div>
          
          <div className="setting-item">
            <div className="setting-header">
              <div className="setting-label">
                <Eye size={20} />
                <span>Interfaccia semplificata</span>
              </div>
              <button 
                className={`setting-toggle ${simplifiedUI ? 'active' : ''}`}
                onClick={() => setSimplifiedUI(!simplifiedUI)}
                aria-label="Attiva/disattiva interfaccia semplificata"
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <p className="setting-description">
              Riduci gli elementi visivi per un'esperienza più semplice
            </p>
          </div>
        </section>

        <section className="settings-card memory-settings">
          <h2>Memoria e Ripasso</h2>
          
          <div className="memory-techniques">
            <h3>Tecniche consigliate</h3>
            <ul>
              <li>
                <strong>Spaced Repetition</strong>
                <p>Ripassa il materiale a intervalli crescenti per migliorare la memorizzazione a lungo termine</p>
              </li>
              <li>
                <strong>Chunking</strong>
                <p>Dividi le informazioni in piccoli gruppi per facilitare l'apprendimento</p>
              </li>
              <li>
                <strong>Mnemonic Devices</strong>
                <p>Usa associazioni e acronimi per ricordare meglio le informazioni</p>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <section className="save-settings">
        <button className="save-button">Salva impostazioni</button>
        <button className="reset-button">Ripristina predefiniti</button>
      </section>
    </div>
  );
};

export default AccessibilityPage;