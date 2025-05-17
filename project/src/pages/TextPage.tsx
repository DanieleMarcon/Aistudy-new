import React, { useState } from 'react';
import { HelpCircle, FileText, Check, RotateCcw, Download } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import '../styles/TextPage.css';

interface TextStep {
  id: string;
  title: string;
  description: string;
  placeholder: string;
}

const TextPage: React.FC = () => {
  const textSteps: TextStep[] = [
    {
      id: 'who',
      title: 'Chi?',
      description: 'Chi sono i protagonisti o gli attori principali?',
      placeholder: 'Descrivi chi è coinvolto...'
    },
    {
      id: 'what',
      title: 'Cosa?',
      description: 'Cosa è successo o di cosa si tratta?',
      placeholder: 'Descrivi cosa è successo...'
    },
    {
      id: 'when',
      title: 'Quando?',
      description: 'Quando è avvenuto? In quale periodo o momento?',
      placeholder: 'Indica quando è avvenuto...'
    },
    {
      id: 'where',
      title: 'Dove?',
      description: 'Dove si è svolto? In quale luogo?',
      placeholder: 'Descrivi il luogo...'
    },
    {
      id: 'why',
      title: 'Perché?',
      description: 'Perché è successo? Quali sono le cause o le motivazioni?',
      placeholder: 'Spiega il perché...'
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [stepContents, setStepContents] = useState<{[key: string]: string}>({
    who: '',
    what: '',
    when: '',
    where: '',
    why: ''
  });
  const [finalText, setFinalText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStepChange = (content: string) => {
    const updatedContents = {
      ...stepContents,
      [textSteps[currentStep].id]: content
    };
    setStepContents(updatedContents);
  };

  const nextStep = () => {
    if (currentStep < textSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateFinalText();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateFinalText = () => {
    const text = `
# ${stepContents.what}

${stepContents.who} ${stepContents.what.toLowerCase()} ${stepContents.when.toLowerCase()} ${stepContents.where.toLowerCase()}.

Questo è avvenuto perché ${stepContents.why.toLowerCase()}.

Il fatto che ${stepContents.who.toLowerCase()} ${stepContents.what.toLowerCase()} ha delle implicazioni importanti. 
In primo luogo, dimostra come gli eventi possano evolversi rapidamente ${stepContents.where.toLowerCase()}.
Inoltre, evidenzia l'importanza di considerare il contesto temporale, dato che è avvenuto ${stepContents.when.toLowerCase()}.

Le motivazioni dietro l'evento, ovvero ${stepContents.why.toLowerCase()}, ci aiutano a comprendere le dinamiche in gioco.

In conclusione, questo evento rappresenta un esempio significativo di come interagiscono persone, luoghi, tempi e motivazioni nel plasmare la nostra realtà.
    `;
    
    setFinalText(text);
    setIsCompleted(true);
  };

  const restartProcess = () => {
    setCurrentStep(0);
    setStepContents({
      who: '',
      what: '',
      when: '',
      where: '',
      why: ''
    });
    setFinalText('');
    setIsCompleted(false);
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([finalText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'testo_composto.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const progress = ((currentStep + (isCompleted ? 1 : 0)) / (textSteps.length + 1)) * 100;

  return (
    <div className="text-page">
      <section className="header-section">
        <h1>Composizione Testo</h1>
        <p>Crea un testo guidato utilizzando il metodo delle 5W</p>
      </section>

      <section className="progress-indicator">
        <ProgressBar progress={progress} label="Progresso" />
        <div className="steps-indicator">
          {textSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
              onClick={() => {
                if (index < currentStep) {
                  setCurrentStep(index);
                }
              }}
            >
              {index < currentStep ? <Check size={16} /> : index + 1}
            </div>
          ))}
          <div className={`step ${isCompleted ? 'completed' : ''}`}>
            {isCompleted ? <Check size={16} /> : textSteps.length + 1}
          </div>
        </div>
      </section>

      {!isCompleted ? (
        <section className="text-composer">
          <div className="step-card">
            <div className="step-header">
              <h2>{textSteps[currentStep].title}</h2>
              <button className="help-button" aria-label="Aiuto">
                <HelpCircle size={20} />
              </button>
            </div>
            
            <p className="step-description">{textSteps[currentStep].description}</p>
            
            <textarea
              value={stepContents[textSteps[currentStep].id]}
              onChange={(e) => handleStepChange(e.target.value)}
              placeholder={textSteps[currentStep].placeholder}
              rows={6}
            />
            
            <div className="navigation-buttons">
              <button 
                className="prev-button" 
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Indietro
              </button>
              <button 
                className="next-button" 
                onClick={nextStep}
                disabled={!stepContents[textSteps[currentStep].id].trim()}
              >
                {currentStep < textSteps.length - 1 ? 'Avanti' : 'Genera testo'}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="final-text-section">
          <div className="final-text-container">
            <div className="final-text-header">
              <h2>Testo Completato</h2>
              <div className="text-actions">
                <button className="restart-button" onClick={restartProcess}>
                  <RotateCcw size={16} />
                  Ricomincia
                </button>
                <button className="download-button" onClick={downloadText}>
                  <Download size={16} />
                  Scarica
                </button>
              </div>
            </div>
            
            <div className="final-text-content">
              <textarea
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                rows={15}
                readOnly={false}
              />
            </div>
          </div>
        </section>
      )}

      <section className="text-tips">
        <h3>Suggerimenti per la scrittura</h3>
        <ul>
          <li>
            <FileText size={16} />
            <span>Utilizza frasi brevi e chiare.</span>
          </li>
          <li>
            <FileText size={16} />
            <span>Evita ripetizioni e parole superflue.</span>
          </li>
          <li>
            <FileText size={16} />
            <span>Usa la punteggiatura in modo appropriato.</span>
          </li>
          <li>
            <FileText size={16} />
            <span>Rileggi sempre il testo finale e controlla gli errori.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TextPage;