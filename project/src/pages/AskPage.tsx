import React, { useState, useEffect } from 'react';
import { Search, Zap, Book, School, History } from 'lucide-react';
import Badge from '../components/Badge';
import '../styles/AskPage.css';

interface Question {
  id: number;
  text: string;
  answer: string;
  category: string;
}

const AskPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [recentQuestions, setRecentQuestions] = useState<Question[]>([]);

  // Sample questions database
  const questionsDatabase: Question[] = [
    {
      id: 1,
      text: 'Cosa sono le cellule?',
      answer: 'Le cellule sono le unità fondamentali di tutti gli organismi viventi. Sono strutture microscopiche che contengono il materiale genetico e sono in grado di crescere, riprodursi e rispondere a stimoli esterni. Esistono cellule procariotiche (come i batteri) e cellule eucariotiche (come quelle umane).',
      category: 'scienze'
    },
    {
      id: 2,
      text: 'Chi era Leonardo da Vinci?',
      answer: 'Leonardo da Vinci (1452-1519) è stato un artista, scienziato e inventore italiano del Rinascimento. È considerato uno dei più grandi geni poliedrici della storia. Tra le sue opere più famose ci sono "La Gioconda" e "L\'Ultima Cena". Si interessò di anatomia, ingegneria, astronomia e molti altri campi.',
      category: 'storia'
    },
    {
      id: 3,
      text: 'Come si risolve un\'equazione di secondo grado?',
      answer: 'Un\'equazione di secondo grado nella forma ax² + bx + c = 0 può essere risolta con la formula quadratica: x = (-b ± √(b² - 4ac)) / 2a, dove a, b, e c sono i coefficienti dell\'equazione. Il discriminante b² - 4ac determina il numero di soluzioni: se è positivo ci sono due soluzioni reali, se è zero c\'è una soluzione reale (doppia), se è negativo ci sono due soluzioni complesse.',
      category: 'matematica'
    },
    {
      id: 4,
      text: 'Quali sono i pianeti del sistema solare?',
      answer: 'I pianeti del sistema solare in ordine di distanza dal Sole sono: Mercurio, Venere, Terra, Marte, Giove, Saturno, Urano e Nettuno. Plutone era considerato il nono pianeta fino al 2006, quando è stato riclassificato come pianeta nano.',
      category: 'scienze'
    },
    {
      id: 5,
      text: 'Cosa significa HTML?',
      answer: 'HTML significa HyperText Markup Language (Linguaggio di marcatura per ipertesti). È il linguaggio standard per la creazione di pagine web. Utilizza tag per definire la struttura e il contenuto di una pagina web, che viene poi interpretato dai browser per visualizzare correttamente il sito.',
      category: 'informatica'
    }
  ];

  const suggestedQuestions = [
    'Cosa sono le cellule?',
    'Chi era Leonardo da Vinci?',
    'Come si risolve un\'equazione di secondo grado?',
    'Quali sono i pianeti del sistema solare?',
    'Cosa significa HTML?'
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsAnswering(true);
    
    // Simulate searching for an answer
    setTimeout(() => {
      const foundQuestion = questionsDatabase.find(
        q => q.text.toLowerCase() === query.toLowerCase()
      );
      
      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
        
        // Add to recent questions if not already there
        if (!recentQuestions.some(q => q.id === foundQuestion.id)) {
          setRecentQuestions(prev => [foundQuestion, ...prev].slice(0, 5));
        }
      } else {
        setCurrentQuestion({
          id: Date.now(),
          text: query,
          answer: "Mi dispiace, non ho una risposta per questa domanda. Prova a riformularla o scegli una delle domande suggerite.",
          category: "altro"
        });
      }
      
      setIsAnswering(false);
    }, 1500);
  };

  const handleSuggestionClick = (question: string) => {
    setQuery(question);
    // Auto-search after selecting a suggestion
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  useEffect(() => {
    // Optional: Focus the search input when component mounts
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  return (
    <div className="ask-page">
      <section className="header-section">
        <h1>Chiedi</h1>
        <p>Cerca informazioni e approfondisci i concetti</p>
      </section>

      <section className="search-section">
        <div className="search-container">
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Fai una domanda..."
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button 
            className="search-button" 
            onClick={handleSearch}
            disabled={isAnswering}
          >
            {isAnswering ? 'Cercando...' : <Search size={20} />}
          </button>
        </div>

        <div className="suggestions">
          <h3>Domande suggerite:</h3>
          <div className="suggestion-items">
            {suggestedQuestions.map((question, index) => (
              <button 
                key={index} 
                className="suggestion-item"
                onClick={() => handleSuggestionClick(question)}
              >
                <Zap size={16} />
                {question}
              </button>
            ))}
          </div>
        </div>
      </section>

      {currentQuestion && (
        <section className="answer-section">
          <div className="answer-container">
            <h2>{currentQuestion.text}</h2>
            <Badge 
              text={currentQuestion.category} 
              variant={
                currentQuestion.category === 'scienze' ? 'info' : 
                currentQuestion.category === 'storia' ? 'primary' :
                currentQuestion.category === 'matematica' ? 'secondary' :
                currentQuestion.category === 'informatica' ? 'success' : 'warning'
              }
              icon={
                currentQuestion.category === 'scienze' ? <Book size={16} /> : 
                <School size={16} />
              }
            />
            <div className="answer-content">
              <p>{currentQuestion.answer}</p>
            </div>
            <div className="additional-resources">
              <h3>Risorse aggiuntive:</h3>
              <ul>
                <li>
                  <a href="#">Approfondimento sul tema</a>
                </li>
                <li>
                  <a href="#">Esercizi correlati</a>
                </li>
                <li>
                  <a href="#">Video esplicativo</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {recentQuestions.length > 0 && (
        <section className="recent-section">
          <h2>Ricerche recenti</h2>
          <div className="recent-list">
            {recentQuestions.map((question) => (
              <div 
                key={question.id} 
                className="recent-item"
                onClick={() => handleSuggestionClick(question.text)}
              >
                <History size={16} />
                <span>{question.text}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AskPage;