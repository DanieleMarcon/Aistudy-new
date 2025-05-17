import React, { useState } from 'react';
import { Book, Edit2, Save, X, Plus, Search, Trash2 } from 'lucide-react';
import '../styles/VocabularyPage.css';

interface VocabTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
}

const VocabularyPage: React.FC = () => {
  const [terms, setTerms] = useState<VocabTerm[]>([
    { id: 1, term: 'Fotosintesi', definition: 'Processo attraverso cui le piante convertono la luce solare in energia chimica, producendo ossigeno e glucosio.', category: 'scienze' },
    { id: 2, term: 'Rivoluzione industriale', definition: 'Periodo di rapida industrializzazione con ampi cambiamenti sociali ed economici, iniziato in Gran Bretagna nel 18° secolo.', category: 'storia' },
    { id: 3, term: 'Teorema di Pitagora', definition: 'In un triangolo rettangolo, il quadrato dell\'ipotenusa è uguale alla somma dei quadrati dei cateti.', category: 'matematica' },
    { id: 4, term: 'Metafora', definition: 'Figura retorica che implica un paragone implicito tra due elementi non correlati ma con caratteristiche simili.', category: 'italiano' },
    { id: 5, term: 'Algoritmo', definition: 'Procedimento che risolve un determinato problema attraverso un numero finito di passi elementari.', category: 'informatica' },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editForm, setEditForm] = useState<{term: string, definition: string, category: string}>({
    term: '',
    definition: '',
    category: ''
  });
  const [newTerm, setNewTerm] = useState<{term: string, definition: string, category: string}>({
    term: '',
    definition: '',
    category: 'altro'
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const startEditing = (term: VocabTerm) => {
    setEditingId(term.id);
    setEditForm({
      term: term.term,
      definition: term.definition,
      category: term.category
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = () => {
    if (editingId) {
      setTerms(terms.map(term => 
        term.id === editingId ? 
          { ...term, term: editForm.term, definition: editForm.definition, category: editForm.category } : 
          term
      ));
      setEditingId(null);
    }
  };

  const deleteTerm = (id: number) => {
    setTerms(terms.filter(term => term.id !== id));
  };

  const addNewTerm = () => {
    if (newTerm.term && newTerm.definition) {
      const newId = terms.length > 0 ? Math.max(...terms.map(t => t.id)) + 1 : 1;
      
      setTerms([...terms, {
        id: newId,
        term: newTerm.term,
        definition: newTerm.definition,
        category: newTerm.category
      }]);
      
      setNewTerm({
        term: '',
        definition: '',
        category: 'altro'
      });
      
      setIsAddingNew(false);
    }
  };

  const cancelAddNew = () => {
    setIsAddingNew(false);
    setNewTerm({
      term: '',
      definition: '',
      category: 'altro'
    });
  };

  const filteredTerms = terms.filter(term => 
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['scienze', 'storia', 'matematica', 'italiano', 'informatica', 'altro'];

  return (
    <div className="vocabulary-page">
      <section className="header-section">
        <h1>Vocabolario</h1>
        <p>Il tuo glossario personale di termini e definizioni</p>
      </section>

      <section className="controls-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Cerca termini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          className="add-button"
          onClick={() => setIsAddingNew(true)}
          disabled={isAddingNew}
        >
          <Plus size={20} />
          <span>Aggiungi termine</span>
        </button>
      </section>
      
      {isAddingNew && (
        <section className="add-term-section">
          <div className="add-term-form">
            <h2>Aggiungi nuovo termine</h2>
            
            <div className="form-group">
              <label>Termine</label>
              <input
                type="text"
                value={newTerm.term}
                onChange={(e) => setNewTerm({...newTerm, term: e.target.value})}
                placeholder="Inserisci il termine"
              />
            </div>
            
            <div className="form-group">
              <label>Definizione</label>
              <textarea
                value={newTerm.definition}
                onChange={(e) => setNewTerm({...newTerm, definition: e.target.value})}
                placeholder="Inserisci la definizione"
              />
            </div>
            
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={newTerm.category}
                onChange={(e) => setNewTerm({...newTerm, category: e.target.value})}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                className="cancel-button" 
                onClick={cancelAddNew}
              >
                <X size={16} />
                Annulla
              </button>
              <button 
                className="save-button" 
                onClick={addNewTerm}
                disabled={!newTerm.term || !newTerm.definition}
              >
                <Save size={16} />
                Salva
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="vocabulary-list">
        {filteredTerms.length === 0 ? (
          <div className="empty-state">
            <Book size={48} />
            <p>Nessun termine trovato. Aggiungi nuovi termini o modifica la ricerca.</p>
          </div>
        ) : (
          <ul>
            {filteredTerms.map(term => (
              <li key={term.id} className={`term-item category-${term.category}`}>
                {editingId === term.id ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Termine</label>
                      <input
                        type="text"
                        value={editForm.term}
                        onChange={(e) => setEditForm({...editForm, term: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Definizione</label>
                      <textarea
                        value={editForm.definition}
                        onChange={(e) => setEditForm({...editForm, definition: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="edit-actions">
                      <button className="cancel-button" onClick={cancelEditing}>
                        <X size={16} />
                        Annulla
                      </button>
                      <button className="save-button" onClick={saveEdit}>
                        <Save size={16} />
                        Salva
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="term-header">
                      <h3>{term.term}</h3>
                      <div className="category-tag">{term.category}</div>
                    </div>
                    <p className="definition">{term.definition}</p>
                    <div className="term-actions">
                      <button 
                        className="edit-button" 
                        onClick={() => startEditing(term)}
                      >
                        <Edit2 size={16} />
                        Modifica
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => deleteTerm(term.id)}
                      >
                        <Trash2 size={16} />
                        Elimina
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default VocabularyPage;