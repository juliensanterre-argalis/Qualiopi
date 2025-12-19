
import React, { useMemo } from 'react';
import { User, ShieldCheck, Building, FileBarChart, CheckCircle, Info, Rocket, Target, Users, BarChart3, GraduationCap, Users2, CalendarDays, Euro, TrendingUp } from 'lucide-react';
import { INDICATORS, KEY_FIGURES } from '../constants.ts';

interface StaticPageProps {
  type: 'presentation' | 'of' | 'organigram' | 'synthesis' | 'dashboard';
}

const StaticPages: React.FC<StaticPageProps> = ({ type }) => {
  const stats = useMemo(() => {
    let applicable = 0;
    let compliant = 0;
    
    INDICATORS.forEach(ind => {
      const appKey = `argalis_indicator_${ind.id}_applicability`;
      const compKey = `argalis_indicator_${ind.id}_compliance`;
      
      const appVal = localStorage.getItem(appKey);
      const compVal = localStorage.getItem(compKey);

      let isApplicable = true;
      const text = ind.auditObservation?.toLowerCase() || "";
      if (text.includes("sans objet") || text.startsWith("non applicable")) {
        isApplicable = false;
      }
      if (appVal !== null) isApplicable = JSON.parse(appVal);

      if (isApplicable) {
        applicable++;
        let isCompliant = true;
        if (compVal !== null) isCompliant = JSON.parse(compVal);
        if (isCompliant) compliant++;
      }
    });

    const percent = applicable > 0 ? Math.round((compliant / applicable) * 100) : 100;
    return { applicable, compliant, percent };
  }, []);

  const content = {
    dashboard: {
      title: "Tableau de Bord",
      subtitle: "Synthèse de performance et conformité Qualiopi",
      icon: <BarChart3 size={40} />,
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[32px] p-10 border border-gray-100 shadow-card flex flex-col md:flex-row items-center gap-12 bento-card">
              <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 overflow-visible">
                  <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-gray-100" />
                  <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="14" fill="transparent" strokeDasharray={534} strokeDashoffset={534 - (534 * stats.percent) / 100} strokeLinecap="round" className="text-argalis transition-all duration-1000 ease-in-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-argalis-text font-head leading-none">{stats.percent}%</span>
                  <span className="text-[10px] font-black text-argalis-muted uppercase tracking-[0.2em] mt-1">Conformité</span>
                </div>
              </div>
              <div className="flex-1 space-y-8">
                <div>
                  <h4 className="font-head font-extrabold text-3xl text-argalis-text mb-3 tracking-tight">Objectif 100% Validé</h4>
                  <p className="text-argalis-muted text-base font-medium leading-relaxed opacity-80">
                    Sur les 32 indicateurs du référentiel national, nous pilotons la conformité en temps réel pour garantir un audit sans réserve.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-argalis-bg/50 p-5 rounded-[20px] border border-gray-100/50 shadow-sm">
                    <p className="text-3xl font-black text-argalis-text font-head mb-1">{stats.applicable}</p>
                    <p className="text-[9px] font-black text-argalis-muted uppercase tracking-[0.15em] leading-tight">Indicateurs<br/>Applicables</p>
                  </div>
                  <div className="bg-argalis-bg/50 p-5 rounded-[20px] border border-gray-100/50 shadow-sm">
                    <p className="text-3xl font-black text-argalis font-head mb-1">{stats.compliant}</p>
                    <p className="text-[9px] font-black text-argalis-muted uppercase tracking-[0.15em] leading-tight">Indicateurs<br/>Validés</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-argalis text-white rounded-[32px] p-10 shadow-hover relative overflow-hidden bento-card">
              <Euro size={48} className="text-argalis-accent mb-6 opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-argalis-accent">Chiffre d'Affaires</p>
              <h3 className="text-5xl font-black font-head tracking-tighter mb-4">{KEY_FIGURES.revenue}</h3>
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <TrendingUp size={16} />
                <span>+12.4% vs 2024</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    presentation: {
      title: "Vision Argalis",
      subtitle: "Identité visuelle & Excellence opérationnelle",
      icon: <Rocket size={40} />,
      content: (
        <div className="space-y-12">
          <div className="bg-white rounded-[24px] p-12 border border-gray-100 shadow-soft">
            <h3 className="font-head font-extrabold text-3xl text-argalis mb-6">Notre Partenariat</h3>
            <p className="text-xl text-argalis-muted leading-relaxed font-medium">
              Argalis n'est pas qu'un outil, c'est votre <span className="highlight-argalis">pilote automatique</span> pour la qualité. 
            </p>
          </div>
        </div>
      )
    },
    of: {
      title: "FORMAJADE",
      subtitle: "Organisme de Formation • Carte d'Identité",
      icon: <Building size={40} />,
      content: (
        <div className="bg-white p-12 rounded-[24px] border border-gray-100 shadow-card">
          <p className="text-xl font-head font-bold text-argalis-text">SAS FORMAJADE</p>
          <p className="text-argalis-muted mt-2">NDA : 52 44 008054 44</p>
        </div>
      )
    },
    organigram: {
      title: "Structure OF",
      subtitle: "Gouvernance & Référents Qualité",
      icon: <Users size={40} />,
      content: (
        <div className="bg-white p-12 rounded-[32px] border border-gray-100 text-center">
           <p className="font-head font-bold text-2xl text-argalis">Frédéric MORVAN</p>
           <p className="text-argalis-muted uppercase text-xs tracking-widest mt-2">Présidence</p>
        </div>
      )
    },
    synthesis: {
      title: "Performance",
      subtitle: "Audit de Renouvellement • Synthèse 2024",
      icon: <FileBarChart size={40} />,
      content: (
        <div className="bg-emerald-500 text-white p-12 rounded-[24px] shadow-hover">
          <h4 className="font-head font-bold text-3xl">Zéro écart majeur.</h4>
        </div>
      )
    }
  };

  const data = content[type];

  return (
    <div className="max-w-[1000px] mx-auto p-16 animate-in slide-in-from-bottom-4 duration-700">
      <div className="bg-argalis rounded-[32px] p-16 mb-16 shadow-hover relative overflow-hidden text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-10">
             <div className="p-5 bg-white/10 rounded-[24px] backdrop-blur-xl border border-white/20">
               {data.icon}
             </div>
          </div>
          <h1 className="text-6xl font-extrabold mb-4 tracking-tighter">{data.title}</h1>
          <p className="text-argalis-accent font-head text-2xl opacity-80">{data.subtitle}</p>
        </div>
      </div>
      <div>{data.content}</div>
    </div>
  );
};

export default StaticPages;
