import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Clock, Award } from 'lucide-react';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import '../styles/MirrorPage.css';

const MirrorPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Simulated topics for practice
  const topics = [
    'La Rivoluzione Francese',
    'Il Sistema Solare',
    'I biomi terrestri',
    'L\'energia rinnovabile',
    'Le equazioni di secondo grado',
    'Il ciclo dell\'acqua',
    'La struttura dell\'atomo',
    'I diritti umani',
    'La fotosintesi clorofilliana'
  ];

  const feedbackMessages = [
    {
      text: 'Ottimo lavoro! Hai parlato con sicurezza e chiarezza.',
      badge: 'Esperto',
      variant: 'success',
      score: 95
    },
    {
      text: 'Buona esposizione. Prova a rallentare in alcuni punti per enfatizzare i concetti più importanti.',
      badge: 'In Progresso',
      variant: 'primary',
      score: 75
    },
    {
      text: 'Stai migliorando! Cerca di mantenere un contatto visivo più costante.',
      badge: 'Miglioramento',
      variant: 'info',
      score: 65
    }
  ];

  const startRecording = () => {
    setIsRecording(true);
    setFeedback(null);
    
    // Start timer
    let startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setRecordingTime(elapsed);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Simulate processing time before showing feedback
    setTimeout(() => {
      // Choose random feedback message
      const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
      setFeedback(randomFeedback.text);
      
      // Set progress bars with random values for demonstration
      document.documentElement.style.setProperty('--clarity-score', `${randomFeedback.score}%`);
      document.documentElement.style.setProperty('--pace-score', `${Math.floor(Math.random() * 30) + 70}%`);
      document.documentElement.style.setProperty('--confidence-score', `${Math.floor(Math.random() * 25) + 75}%`);
      document.documentElement.style.setProperty('--completeness-score', `${Math.floor(Math.random() * 20) + 80}%`);
    }, 1500);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Randomly select 3 topics
  const selectedTopics = topics
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="mirror-page">
      <section className="header-section">
        <h1>Specchio</h1>
        <p>Pratica le tue presentazioni orali e ricevi feedback</p>
      </section>

      <section className="recorder-section">
        <div className="recorder-container">
          <div className="video-placeholder">
            {isRecording ? (
              <div className="recording-indicator">
                <div className="pulse"></div>
                <span>REC</span>
              </div>
            ) : null}
            <div className="avatar-placeholder">
              <div className="avatar-circle">
                <Mic size={48} />
              </div>
            </div>
          </div>

          <div className="recorder-controls">
            <div className="time-display">
              <Clock size={16} />
              <span>{formatTime(recordingTime)}</span>
            </div>
            
            <button 
              className={`record-button ${isRecording ? 'recording' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
              <span>{isRecording ? 'Ferma' : 'Registra'}</span>
            </button>
            
            <button 
              className={`playback-button ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlayback}
              disabled={!hasRecorded}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>
      </section>

      {feedback && (
        <section className="feedback-section">
          <h2>Feedback</h2>
          
          <div className="feedback-card">
            <div className="feedback-content">
              <p>{feedback}</p>
              
              <div className="score-summary">
                <div className="overall-score">
                  <Award size={48} className="score-icon" />
                  <div className="score-text">
                    <span className="score-value">B+</span>
                    <span className="score-label">Valutazione</span>
                  </div>
                </div>
                
                <div className="score-details">
                  <div className="score-item">
                    <span>Chiarezza</span>
                    <ProgressBar progress={0} className="clarity-bar" size="small" />
                  </div>
                  <div className="score-item">
                    <span>Ritmo</span>
                    <ProgressBar progress={0} className="pace-bar" size="small" />
                  </div>
                  <div className="score-item">
                    <span>Sicurezza</span>
                    <ProgressBar progress={0} className="confidence-bar" size="small" />
                  </div>
                  <div className="score-item">
                    <span>Completezza</span>
                    <ProgressBar progress={0} className="completeness-bar" size="small" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="improvement-tips">
              <h3>Suggerimenti per migliorare</h3>
              <ul>
                <li>Pratica davanti a uno specchio per migliorare il linguaggio del corpo</li>
                <li>Registrati e riascoltati per identificare aree di miglioramento</li>
                <li>Usa delle pause strategiche per enfatizzare punti importanti</li>
                <li>Mantieni un ritmo costante e non parlare troppo velocemente</li>
              </ul>
            </div>
            
            <button className="try-again-button" onClick={() => setIsRecording(false)}>
              Riprova
            </button>
          </div>
        </section>
      )}

      <section className="topics-section">
        <h2>Argomenti suggeriti</h2>
        <p>Scegli un argomento e pratica la tua presentazione orale:</p>
        
        <div className="topics-list">
          {selectedTopics.map((topic, index) => (
            <div key={index} className="topic-card">
              <h3>{topic}</h3>
              <p>Durata consigliata: 2-3 minuti</p>
              <Badge 
                text={index === 0 ? 'Consigliato' : 'Opzionale'} 
                variant={index === 0 ? 'primary' : 'secondary'}
                size="small"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MirrorPage;