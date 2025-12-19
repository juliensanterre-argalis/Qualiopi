
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import IndicatorDetail from './components/IndicatorDetail.tsx';
import StaticPages from './components/StaticPages.tsx';
import { ViewState } from './types.ts';
import { INDICATORS } from './constants.ts';
import { storageService } from './services/storageService.ts';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'static', page: 'presentation' });
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      if (storageService.getApiUri()) {
        await storageService.fetchAll();
      }
      setIsInitializing(false);
    };
    initApp();
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-argalis flex flex-col items-center justify-center text-white">
        <div className="bg-white p-8 rounded-[32px] mb-8 animate-bounce shadow-2xl">
          <img 
            src="https://github.com/danyvarlet/argalis_assets/blob/d5f767e8967b95605861ecf236c9405cf6b0041e/Argalis%20carre.svg?raw=true" 
            className="h-16 w-auto" 
            alt="Argalis Logo"
          />
        </div>
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin text-argalis-accent" />
          <p className="font-head font-bold tracking-widest text-xs uppercase opacity-70">Synchronisation Cloud en cours...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentView.type === 'static') {
      return <StaticPages type={currentView.page} />;
    }

    if (currentView.type === 'indicator') {
      const data = INDICATORS.find(i => i.id === currentView.id);
      if (!data) return <div className="p-20 text-center font-head font-bold text-argalis">Indicateur non trouvé</div>;
      
      return (
        <IndicatorDetail 
          data={data} 
          onBack={() => setCurrentView({ type: 'static', page: 'presentation' })} 
        />
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar onNavigate={handleNavigate} currentView={currentView} />
      <main className="ml-80 flex-1 transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
