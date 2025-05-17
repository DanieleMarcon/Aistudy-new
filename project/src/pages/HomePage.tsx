import React from 'react';
import { BookOpen, BookText, Lightbulb, Map, Mic, Settings, Upload } from 'lucide-react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Benvenuto su <span className="highlight">AIstudy</span></h1>
          <p className="hero-subtitle">
            Migliora la tua autonomia nello studio con strumenti digitali accessibili e personalizzabili
          </p>
          
          <div className="stats-container">
            <div className="stat-item">
              <h3>82%</h3>
              <p>degli studenti migliorano i risultati</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>strumenti di apprendimento</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>accessibile a tutti</p>
            </div>
          </div>
        </div>
      </section>

      <section className="progress-section">
        <h2>Il tuo progresso</h2>
        <div className="progress-overview">
          <ProgressBar progress={65} label="Progresso complessivo" />
          <div className="badges-container">
            <Badge text="Principiante" variant="primary" icon={<BookOpen size={16} />} />
            <Badge text="3 giorni consecutivi" variant="success" pulsing={true} />
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Esplora gli strumenti</h2>
        
        <div className="cards-container">
          <Card 
            title="Studiamo insieme" 
            description="Pianifica il tuo studio con agende interattive e timer" 
            icon={<BookText size={32} />}
            to="/studiamo"
          />
          
          <Card 
            title="Chiedi" 
            description="Ricerca veloce con suggerimenti di approfondimento" 
            icon={<Lightbulb size={32} />}
            to="/chiedi"
          />
          
          <Card 
            title="Vocabolario" 
            description="Glossario con definizioni personalizzabili" 
            icon={<BookOpen size={32} />}
            to="/vocabolario"
          />
          
          <Card 
            title="Composizione testi" 
            description="Crea testi guidati con il metodo 5W" 
            icon={<BookText size={32} />}
            to="/testo"
          />
          
          <Card 
            title="Mappe mentali" 
            description="Visualizza concetti con mappe interattive" 
            icon={<Map size={32} />}
            to="/mappe"
          />
          
          <Card 
            title="Specchio" 
            description="Pratica orale e ottieni feedback motivanti" 
            icon={<Mic size={32} />}
            to="/specchio"
          />
          
          <Card 
            title="Risorse" 
            description="Carica e organizza le tue fonti di studio" 
            icon={<Upload size={32} />}
            to="/risorse"
          />
          
          <Card 
            title="Accessibilità" 
            description="Personalizza l'app per le tue esigenze" 
            icon={<Settings size={32} />}
            to="/accessibilita"
          />
        </div>
      </section>

      <section className="cta-section">
        <h2>Inizia subito il tuo percorso</h2>
        <p>Scegli uno degli strumenti sopra per migliorare il tuo metodo di studio</p>
      </section>
    </div>
  );
};

export default HomePage;