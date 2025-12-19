
import React, { useEffect, useState, useMemo } from 'react';
import { BookOpen, Shield, Activity, FileCheck, Layers, Award, Settings, Home, Network, LayoutGrid, BarChart3, TrendingUp, Users, CalendarDays, Database, Cloud, CloudOff } from 'lucide-react';
import { ViewState } from '../types';
import { INDICATORS, KEY_FIGURES } from '../constants';
import { storageService } from '../services/storageService';
import DatabaseConfig from './DatabaseConfig';

interface SidebarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

interface IndicatorStatus {
  applicable: boolean;
  compliant: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const [statuses, setStatuses] = useState<Record<number, IndicatorStatus>>({});
  const [showDbConfig, setShowDbConfig] = useState(false);
  const isCloudConnected = !!storageService.getApiUri();

  const loadStatuses = () => {
    const newStatuses: Record<number, IndicatorStatus> = {};
    INDICATORS.forEach(ind => {
      const appKey = `argalis_indicator_${ind.id}_applicability`;
      const compKey = `argalis_indicator_${ind.id}_compliance`;
      const appVal = localStorage.getItem(appKey);
      const compVal = localStorage.getItem(compKey);

      let defaultApplicability = true;
      const text = ind.auditObservation?.toLowerCase() || "";
      if (text.includes("sans objet") || text.startsWith("non applicable")) {
        defaultApplicability = false;
      }

      newStatuses[ind.id] = {
        applicable: appVal !== null ? JSON.parse(appVal) : defaultApplicability,
        compliant: compVal !== null ? JSON.parse(compVal) : true,
      };
    });
    setStatuses(newStatuses);
  };

  useEffect(() => {
    loadStatuses();
    const handleStorageUpdate = () => loadStatuses();
    window.addEventListener('indicator-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('indicator-storage-update', handleStorageUpdate);
  }, []);

  const compliancePercent = useMemo(() => {
    let applicableCount = 0;
    let compliantCount = 0;
    (Object.values(statuses) as IndicatorStatus[]).forEach(s => {
      if (s.applicable) {
        applicableCount++;
        if (s.compliant) compliantCount++;
      }
    });
    return applicableCount > 0 ? Math.round((compliantCount / applicableCount) * 100) : 100;
  }, [statuses]);

  const menuItems = [
    { id: 'presentation', label: "Présentation & Argalis", icon: <Home size={18} /> },
    { id: 'of', label: "Présentation de l'OF", icon: <LayoutGrid size={18} /> },
    { id: 'dashboard', label: "Détails Performance", icon: <BarChart3 size={18} /> },
    { id: 'organigram', label: "Organigramme", icon: <Network size={18} /> },
    { id: 'synthesis', label: "Synthèse Audit", icon: <Activity size={18} /> },
  ];

  const indicatorGroups = [
    { label: "1. Info Public", range: [1, 2, 3], icon: <BookOpen size={18} /> },
    { label: "2. Objectifs", range: [4, 5, 6, 7, 8], icon: <Award size={18} /> },
    { label: "3. Adaptation", range: [9, 10, 11, 12, 13, 14, 15, 16], icon: <Settings size={18} /> },
    { label: "4. Moyens", range: [17, 18, 19, 20], icon: <Layers size={18} /> },
    { label: "5. Personnel", range: [21, 22], icon: <Shield size={18} /> },
    { label: "6. Environnement", range: [23, 24, 25, 26, 27, 28, 29], icon: <Network size={18} /> },
    { label: "7. Amélioration", range: [30, 31, 32], icon: <FileCheck size={18} /> },
  ];

  return (
    <aside className="w-80 h-screen fixed top-0 left-0 bg-argalis text-white flex flex-col overflow-y-auto z-50 custom-scrollbar shadow-2xl border-r border-argalis-dark/30">
      <div className="p-8 text-center border-b border-white/5 bg-argalis-dark/20 relative">
        <button 
          onClick={() => setShowDbConfig(true)}
          className="absolute top-4 right-4 text-white/20 hover:text-argalis-accent transition-colors"
          title="Configurer la base de données"
        >
          <Database size={16} />
        </button>
        
        <div className="bg-white rounded-2xl p-4 inline-block shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300">
           <img src="https://github.com/danyvarlet/argalis_assets/blob/d5f767e8967b95605861ecf236c9405cf6b0041e/Argalis%20carre.svg?raw=true" className="h-10 w-auto" alt="Logo Argalis"/>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <p className="text-argalis-accent font-head text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">Qualiopi Roadbook</p>
          {isCloudConnected ? <Cloud size={10} className="text-emerald-400" /> : <CloudOff size={10} className="text-white/20" />}
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-8">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate({ type: 'static', page: item.id as any })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  currentView.type === 'static' && currentView.page === item.id
                    ? 'bg-white text-argalis shadow-xl transform scale-[1.03]'
                    : 'text-argalis-accent hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`${currentView.type === 'static' && currentView.page === item.id ? 'text-argalis' : 'text-argalis-accent group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <span className="font-head tracking-tight">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Mini-Dashboard Widget */}
        <div className="bg-argalis-dark/40 rounded-2xl p-5 border border-white/5 shadow-inner">
           <div className="flex items-center gap-2 mb-4">
             <TrendingUp size={14} className="text-emerald-400" />
             <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Performance 2025</h3>
           </div>
           
           <div className="flex items-center gap-4 mb-6">
              <div className="relative w-14 h-14 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={283} strokeDashoffset={283 - (283 * compliancePercent) / 100} strokeLinecap="round" className="text-emerald-400 transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white">{compliancePercent}%</div>
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-argalis-accent/60 uppercase leading-tight mb-1">Conformité</p>
                <p className="text-xs font-black text-white leading-tight">Objectif 100%</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                 <CalendarDays size={12} className="text-argalis-accent mb-1 opacity-40" />
                 <p className="text-[10px] font-black text-white leading-none">{KEY_FIGURES.sessions}</p>
                 <p className="text-[7px] font-bold text-argalis-accent/40 uppercase mt-1">Sessions</p>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                 <Users size={12} className="text-argalis-accent mb-1 opacity-40" />
                 <p className="text-[10px] font-black text-white leading-none">{KEY_FIGURES.learners}</p>
                 <p className="text-[7px] font-bold text-argalis-accent/40 uppercase mt-1">Apprenants</p>
              </div>
           </div>
        </div>

        <div>
           <div className="flex items-center gap-3 px-2 mb-6 text-argalis-accent/40">
             <div className="h-px bg-white/10 flex-1"></div>
             <h3 className="text-[9px] font-black uppercase tracking-[0.25em]">Référentiel</h3>
             <div className="h-px bg-white/10 flex-1"></div>
           </div>
           <ul className="space-y-8">
             {indicatorGroups.map((group, idx) => (
               <li key={idx}>
                 <div className="flex items-center gap-2 px-2 py-1 text-white/90 font-head font-bold text-[11px] uppercase tracking-wider mb-3">
                   {group.icon} {group.label}
                 </div>
                 <ul className="pl-4 space-y-1 border-l border-white/10 ml-4">
                   {group.range.map((indId) => (
                     <li key={indId}>
                       <button
                         onClick={() => onNavigate({ type: 'indicator', id: indId })}
                         className={`w-full flex items-center px-4 py-2 rounded-lg text-xs transition-all duration-200 ${
                           currentView.type === 'indicator' && currentView.id === indId
                             ? 'bg-argalis-accent text-argalis font-bold shadow-md'
                             : 'text-argalis-accent/60 hover:text-white hover:bg-white/5'
                         }`}
                       >
                         <span className="flex-1 text-left font-medium">Indicateur {indId}</span>
                         {statuses[indId]?.applicable === false ? (
                           <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">N/A</span>
                         ) : (
                           <div className={`w-2 h-2 rounded-full ${statuses[indId]?.compliant ? 'bg-emerald-400' : 'bg-red-400'}`} />
                         )}
                       </button>
                     </li>
                   ))}
                 </ul>
               </li>
             ))}
           </ul>
        </div>
      </nav>

      {showDbConfig && <DatabaseConfig onClose={() => setShowDbConfig(false)} />}
    </aside>
  );
};

export default Sidebar;
