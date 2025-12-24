
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Ideas from './pages/Ideas';
import Analytics from './pages/Analytics';
import { View, Idea, Reminder } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Persistent Storage Simulation (Local for now)
  useEffect(() => {
    const savedIdeas = localStorage.getItem('impact-studio-ideas');
    const savedReminders = localStorage.getItem('impact-studio-reminders');
    if (savedIdeas) setIdeas(JSON.parse(savedIdeas));
    if (savedReminders) setReminders(JSON.parse(savedReminders));
  }, []);

  useEffect(() => {
    localStorage.setItem('impact-studio-ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('impact-studio-reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addIdea = (idea: Idea) => setIdeas([...ideas, idea]);
  const deleteIdea = (id: string) => setIdeas(ideas.filter(i => i.id !== id));
  
  const addReminder = (reminder: Reminder) => setReminders([...reminders, reminder]);
  const deleteReminder = (id: string) => setReminders(reminders.filter(r => r.id !== id));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentView('home')}
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <div className="w-4 h-4 bg-black rounded-sm" />
          </div>
          <span className="font-bold text-xl tracking-tighter">Impact.</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-6">
          <button 
            onClick={() => setCurrentView('schedule')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'schedule' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Schedule
          </button>
          <button 
            onClick={() => setCurrentView('ideas')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'ideas' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Ideas
          </button>
          <button 
            onClick={() => setCurrentView('analytics')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'analytics' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Analytics
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow overflow-auto">
        {currentView === 'home' && <Home setView={setCurrentView} />}
        {currentView === 'schedule' && (
          <Schedule 
            reminders={reminders} 
            onAddReminder={addReminder} 
            onDeleteReminder={deleteReminder} 
          />
        )}
        {currentView === 'ideas' && (
          <Ideas 
            ideas={ideas} 
            onAddIdea={addIdea} 
            onDeleteIdea={deleteIdea} 
          />
        )}
        {currentView === 'analytics' && <Analytics />}
      </main>

      {/* Footer */}
      <footer className="p-8 border-t border-white/5 text-center text-white/20 text-xs">
        <p>© 2024 Impact Studio - The OS for Modern Social Content Managers</p>
      </footer>
    </div>
  );
};

export default App;
