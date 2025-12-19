import React, { useMemo } from 'react';
import { User, ShieldCheck, Building, FileBarChart, CheckCircle, Info, Rocket, Target, Users, BarChart3, GraduationCap, Users2, CalendarDays, Euro, TrendingUp } from 'lucide-react';
import { INDICATORS, KEY_FIGURES } from '../constants';

interface StaticPageProps {
  type: 'presentation' | 'of' | 'organigram' | 'synthesis' | 'dashboard';
}

const StaticPages: React.FC<StaticPageProps> = ({ type }) => {
  // Calcul dynamique des statistiques Qualiopi
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
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Qualiopi Progress Bento */}
            <div className="lg:col-span-2 bg-white rounded-[32px] p-10 border border-gray-100 shadow-card flex flex-col md:flex-row items-center gap-12 bento-card">
              <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 overflow-visible">
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="currentColor"
                    strokeWidth="14"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="currentColor"
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={534}
                    strokeDashoffset={534 - (534 * stats.percent) / 100}
                    strokeLinecap="round"
                    className="text-argalis transition-all duration-1000 ease-in-out"
                  />
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

            {/* CA Bento */}
            <div className="bg-argalis text-white rounded-[32px] p-10 shadow-hover relative overflow-hidden bento-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <Euro size={48} className="text-argalis-accent mb-6 opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-argalis-accent">Chiffre d'Affaires</p>
              <h3 className="text-5xl font-black font-head tracking-tighter mb-4">{KEY_FIGURES.revenue}</h3>
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <TrendingUp size={16} />
                <span>+12.4% vs 2024</span>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs font-medium text-white/60">Projection annuelle basée sur le premier semestre.</p>
              </div>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-soft bento-card group">
              <div className="w-12 h-12 bg-argalis-light rounded-xl flex items-center justify-center text-argalis mb-4 group-hover:scale-110 transition-transform">
                <CalendarDays size={24} />
              </div>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Sessions de formation</p>
              <p className="text-3xl font-black text-argalis-text font-head">{KEY_FIGURES.sessions}</p>
              <p className="text-[10px] text-argalis font-bold mt-2">{KEY_FIGURES.period}</p>
            </div>

            <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-soft bento-card group">
              <div className="w-12 h-12 bg-argalis-light rounded-xl flex items-center justify-center text-argalis mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Apprenants formés</p>
              <p className="text-3xl font-black text-argalis-text font-head">{KEY_FIGURES.learners}</p>
              <p className="text-[10px] text-argalis font-bold mt-2">{KEY_FIGURES.period}</p>
            </div>

            <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-soft bento-card group">
              <div className="w-12 h-12 bg-argalis-light rounded-xl flex items-center justify-center text-argalis mb-4 group-hover:scale-110 transition-transform">
                <Users2 size={24} />
              </div>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Intervenants Internes</p>
              <p className="text-3xl font-black text-argalis-text font-head">{KEY_FIGURES.trainersInternal}</p>
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-argalis w-3/4"></div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-soft bento-card group">
              <div className="w-12 h-12 bg-argalis-light rounded-xl flex items-center justify-center text-argalis mb-4 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Intervenants Externes</p>
              <p className="text-3xl font-black text-argalis-text font-head">{KEY_FIGURES.trainersExternal}</p>
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-argalis-accent w-1/2"></div>
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
              En 2025, nous franchissons un nouveau cap vers la <span className="highlight-argalis">dématérialisation totale</span> pour transformer chaque audit en simple formalité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[24px] border border-gray-100 shadow-card hover:shadow-hover transition-all bento-card">
              <div className="w-14 h-14 bg-argalis-light rounded-2xl flex items-center justify-center text-argalis mb-6 shadow-inner">
                <Target size={28} />
              </div>
              <h4 className="font-head font-bold text-argalis-text text-xl mb-4">Objectif 2025</h4>
              <p className="text-sm text-argalis-muted leading-relaxed font-medium">
                Optimiser la productivité administrative de 40% grâce à l'automatisation des indicateurs de résultats et des bilans pédagogiques.
              </p>
            </div>
            <div className="bg-argalis text-white p-10 rounded-[24px] shadow-hover relative overflow-hidden bento-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-argalis-accent mb-6">
                <ShieldCheck size={28} />
              </div>
              <h4 className="font-head font-bold text-argalis-accent text-xl mb-4">Certitude Qualité</h4>
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                Garantir une conformité Qualiopi en temps réel grâce au monitoring constant des écarts et réclamations.
              </p>
            </div>
          </div>

          <div className="bg-argalis-bg p-10 rounded-[24px] border border-argalis-accent/20 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-argalis shadow-lg flex items-center justify-center font-black text-3xl text-argalis">
              A
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-2xl font-head font-extrabold text-argalis-text">Consultant Argalis Expert</p>
              <p className="text-xs text-argalis font-black uppercase tracking-[0.3em] mt-1 opacity-70">Rédacteur • Auditeur Qualité</p>
            </div>
          </div>
        </div>
      )
    },
    of: {
      title: "FORMAJADE",
      subtitle: "Organisme de Formation • Carte d'Identité",
      icon: <Building size={40} />,
      content: (
        <div className="space-y-10">
          <div className="bg-white p-12 rounded-[24px] border border-gray-100 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-argalis uppercase tracking-[0.2em] opacity-50">Raison Sociale</span>
                <p className="font-head font-extrabold text-2xl text-argalis-text">SAS FORMAJADE</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-argalis uppercase tracking-[0.2em] opacity-50">Enregistrement NDA</span>
                <p className="font-head font-extrabold text-2xl text-argalis">52 44 008054 44</p>
              </div>
              <div className="md:col-span-2 space-y-2 pt-6 border-t border-gray-50">
                <span className="text-[10px] font-black text-argalis uppercase tracking-[0.2em] opacity-50">Siège Social & Plateaux Techniques</span>
                <p className="font-head font-bold text-xl text-argalis-text leading-tight">36 bis, avenue des Frères Lumières, PA de la Guerche, 44250 St Brévin les Pins</p>
              </div>
              <div className="space-y-2 pt-6 border-t border-gray-50">
                <span className="text-[10px] font-black text-argalis uppercase tracking-[0.2em] opacity-50">Dirigeant Fondateur</span>
                <p className="font-head font-bold text-xl text-argalis-text">Frédéric MORVAN</p>
              </div>
              <div className="space-y-2 pt-6 border-t border-gray-50">
                <span className="text-[10px] font-black text-argalis uppercase tracking-[0.2em] opacity-50">Référent Qualité & Pédagogie</span>
                <p className="font-head font-bold text-xl text-argalis-text">David ROBION</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-10 border border-gray-100 shadow-soft">
            <h4 className="font-head font-bold text-argalis text-xl mb-8 flex items-center gap-3">
              <Target size={24} /> 
              Expertises Métiers
            </h4>
            <div className="flex flex-wrap gap-4">
              {['Sécurité Incendie', 'Sauvetage Secourisme (SST)', 'Habilitation Électrique', 'Gestes & Postures', 'CACES / Engins'].map(tag => (
                <div key={tag} className="bg-argalis-bg px-6 py-3 rounded-2xl text-xs font-black text-argalis-text border border-argalis-accent/30 shadow-sm transition-all hover:bg-argalis hover:text-white hover:-translate-y-1 cursor-default">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    organigram: {
      title: "Structure OF",
      subtitle: "Gouvernance & Référents Qualité",
      icon: <Users size={40} />,
      content: (
        <div className="space-y-12">
          <div className="bg-white py-20 rounded-[32px] border border-gray-100 shadow-card flex justify-center">
            <div className="text-center">
              <div className="bg-argalis text-white px-12 py-8 rounded-[24px] shadow-hover mb-20 inline-block border-4 border-white transform hover:scale-105 transition-transform duration-500">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-argalis-accent">Présidence</p>
                <p className="font-head font-extrabold text-3xl">Frédéric MORVAN</p>
              </div>
              
              <div className="w-1 h-16 bg-gradient-to-b from-argalis to-argalis-accent mx-auto relative mb-4">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-argalis rounded-full -mt-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { label: "Pédagogie", name: "David ROBION", color: "argalis" },
                  { label: "Handicap", name: "David ROBION", color: "argalis-accent" },
                  { label: "Qualité", name: "David ROBION", color: "argalis-muted" }
                ].map((pos, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-px h-10 bg-argalis-accent/50 mb-6"></div>
                    <div className="bg-white border-2 border-argalis-accent text-argalis px-8 py-6 rounded-[20px] shadow-soft transition-all hover:-translate-y-2 hover:shadow-xl group">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-argalis-muted mb-2 group-hover:text-argalis">Référent {pos.label}</p>
                      <p className="font-head font-extrabold text-lg text-argalis-text">{pos.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    synthesis: {
      title: "Performance",
      subtitle: "Audit de Renouvellement • Synthèse 2024",
      icon: <FileBarChart size={40} />,
      content: (
        <div className="space-y-10">
          <div className="bg-emerald-500 text-white p-12 rounded-[24px] shadow-hover flex items-center gap-10 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 transform scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-1000">
              <ShieldCheck size={200} />
            </div>
            <div className="bg-white/20 p-6 rounded-[24px] backdrop-blur-md shrink-0 border border-white/30">
               <CheckCircle size={48} className="text-white" />
            </div>
            <div>
              <h4 className="font-head font-extrabold text-3xl mb-3">Conformité Absolue</h4>
              <p className="text-white/90 font-bold text-lg leading-snug">Zéro écart majeur. Zéro écart mineur.<br/>Audit de renouvellement validé avec les félicitations de l'auditeur.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[24px] border border-gray-100 shadow-soft border-t-[12px] border-emerald-500">
              <h4 className="font-head font-extrabold text-argalis-text text-xl mb-8 flex items-center gap-3">
                Atouts Stratégiques
              </h4>
              <ul className="space-y-6">
                {[
                  { t: "Logiciel ARGALIS", d: "Maîtrise totale de la traçabilité" },
                  { t: "Réalité Augmentée", d: "Innovation pédagogique incendie" },
                  { t: "Infrastructures", d: "Plateaux techniques certifiés" },
                  { t: "Taux Satisfaction", d: "Moyenne de 4.9/5 sur l'année" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle size={24} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-argalis-text text-sm uppercase tracking-tight">{item.t}</p>
                      <p className="text-xs text-argalis-muted font-semibold">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-10 rounded-[24px] border border-gray-100 shadow-soft border-t-[12px] border-argalis-accent">
              <h4 className="font-head font-extrabold text-argalis-text text-xl mb-10">Statistiques Écarts</h4>
              <div className="flex gap-6 mb-10">
                <div className="flex-1 bg-argalis-bg p-6 rounded-[20px] text-center border border-gray-50 shadow-inner">
                  <p className="text-5xl font-head font-black text-argalis mb-1">0</p>
                  <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest">Majeures</p>
                </div>
                <div className="flex-1 bg-argalis-bg p-6 rounded-[20px] text-center border border-gray-50 shadow-inner">
                  <p className="text-5xl font-head font-black text-argalis mb-1">0</p>
                  <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest">Mineures</p>
                </div>
              </div>
              <p className="text-xs text-argalis-muted italic font-bold text-center bg-gray-50 py-3 rounded-xl border border-dashed border-gray-200">
                Prochain cycle : Surveillance mi-2026
              </p>
            </div>
          </div>
        </div>
      )
    }
  };

  const data = content[type];

  return (
    <div className="max-w-[1000px] mx-auto p-16 animate-in slide-in-from-bottom-4 duration-700">
      {/* Cover Header Style Premium du Guide */}
      <div className="bg-argalis rounded-[32px] p-16 mb-16 shadow-hover relative overflow-hidden text-white group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 transition-transform group-hover:scale-110 duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-argalis-accent/10 rounded-full -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-10">
             <div className="p-5 bg-white/10 rounded-[24px] backdrop-blur-xl border border-white/20 shadow-2xl transition-transform group-hover:rotate-6">
               {data.icon}
             </div>
             <div className="h-px bg-white/20 flex-1"></div>
          </div>
          <h1 className="text-6xl font-extrabold mb-4 tracking-tighter">{data.title}</h1>
          <p className="text-argalis-accent font-head text-2xl opacity-80 tracking-tight font-medium">{data.subtitle}</p>
        </div>
      </div>

      <div>
        {data.content}
      </div>
    </div>
  );
};

export default StaticPages;