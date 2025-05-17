import React, { useState } from 'react';
import { Calendar, CheckSquare, Clock, Plus, Trash2 } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import '../styles/StudyPage.css';

interface StudyTask {
  id: number;
  title: string;
  subject: string;
  duration: number;
  completed: boolean;
}

const StudyPage: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>([
    { id: 1, title: 'Leggere capitolo 3', subject: 'Storia', duration: 30, completed: true },
    { id: 2, title: 'Esercizi 1-10', subject: 'Matematica', duration: 45, completed: false },
    { id: 3, title: 'Riassunto', subject: 'Italiano', duration: 40, completed: false },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    duration: 30
  });

  const addTask = () => {
    if (newTask.title && newTask.subject) {
      const task: StudyTask = {
        id: Date.now(),
        title: newTask.title,
        subject: newTask.subject,
        duration: newTask.duration,
        completed: false
      };
      
      setTasks([...tasks, task]);
      setNewTask({ title: '', subject: '', duration: 30 });
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const totalMinutes = tasks.reduce((sum, task) => sum + task.duration, 0);
  const completedMinutes = tasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + task.duration, 0);
  
  const progressPercentage = totalMinutes ? Math.round((completedMinutes / totalMinutes) * 100) : 0;

  return (
    <div className="study-page">
      <section className="header-section">
        <h1>Piano di Studio</h1>
        <p>Organizza e traccia i tuoi progressi</p>
      </section>

      <section className="progress-section">
        <div className="progress-card">
          <h2>Il tuo progresso oggi</h2>
          <ProgressBar progress={progressPercentage} label="Completato" />
          <div className="stats">
            <div className="stat">
              <Clock size={20} />
              <span>Tempo totale: {totalMinutes} min</span>
            </div>
            <div className="stat">
              <CheckSquare size={20} />
              <span>Completato: {completedMinutes} min</span>
            </div>
          </div>
          <div className="badges">
            {progressPercentage >= 25 && (
              <Badge 
                text="In corso" 
                variant="primary" 
                icon={<Clock size={16} />} 
              />
            )}
            {progressPercentage >= 75 && (
              <Badge 
                text="Quasi completato!" 
                variant="success" 
                pulsing={true} 
              />
            )}
          </div>
        </div>
      </section>

      <section className="planner-section">
        <div className="add-task-form">
          <h2>Aggiungi attività</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Titolo dell'attività"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Materia"
              value={newTask.subject}
              onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Durata (minuti)</label>
            <input
              type="number"
              min="5"
              max="120"
              step="5"
              value={newTask.duration}
              onChange={(e) => setNewTask({...newTask, duration: parseInt(e.target.value)})}
            />
          </div>
          <button className="add-button" onClick={addTask}>
            <Plus size={16} />
            Aggiungi
          </button>
        </div>

        <div className="task-list">
          <h2>Attività pianificate</h2>
          {tasks.length === 0 ? (
            <div className="empty-state">
              <Calendar size={32} />
              <p>Nessuna attività pianificata. Aggiungi la tua prima attività!</p>
            </div>
          ) : (
            <ul>
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      id={`task-${task.id}`}
                    />
                    <label htmlFor={`task-${task.id}`}></label>
                  </div>
                  <div className="task-details">
                    <h3>{task.title}</h3>
                    <div className="task-meta">
                      <span className="subject">{task.subject}</span>
                      <span className="duration">{task.duration} min</span>
                    </div>
                  </div>
                  <button 
                    className="delete-button" 
                    onClick={() => removeTask(task.id)}
                    aria-label="Elimina attività"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudyPage;