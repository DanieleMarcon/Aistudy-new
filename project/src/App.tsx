import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import AskPage from './pages/AskPage';
import VocabularyPage from './pages/VocabularyPage';
import TextPage from './pages/TextPage';
import MindMapPage from './pages/MindMapPage';
import MirrorPage from './pages/MirrorPage';
import AccessibilityPage from './pages/AccessibilityPage';
import ResourcesPage from './pages/ResourcesPage';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/studiamo" element={<StudyPage />} />
              <Route path="/chiedi" element={<AskPage />} />
              <Route path="/vocabolario" element={<VocabularyPage />} />
              <Route path="/testo" element={<TextPage />} />
              <Route path="/mappe" element={<MindMapPage />} />
              <Route path="/specchio" element={<MirrorPage />} />
              <Route path="/accessibilita" element={<AccessibilityPage />} />
              <Route path="/risorse" element={<ResourcesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;