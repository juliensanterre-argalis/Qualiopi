
import React, { useMemo } from 'react';
import { 
  User, ShieldCheck, Building, FileBarChart, CheckCircle, Info, Rocket, 
  Target, Users, BarChart3, GraduationCap, Users2, CalendarDays, 
  Euro, TrendingUp, Award, Briefcase, Microscope, HeartPulse
} from 'lucide-react';
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
      subtitle: `Suivi d'activité • ${KEY_FIGURES.period}`,
      icon: <BarChart3 size={40} />,
      content: (
        <div className="space-y-10">
          {/* Section Principale : Conformité & CA */}
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
                  <h4 className="font-head font-extrabold text-3xl text-argalis-text mb-3 tracking-tight">Référentiel National Qualité</h4>
                  <p className="text-argalis-muted text-base font-medium leading-relaxed opacity-80">
                    Statut actuel de la conformité basée sur l'audit interne et les preuves collectées via Argalis.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-argalis-bg/50 p-5 rounded-[20px] border border-gray-100/50 shadow-sm">
                    <p className="text-3xl font-black text-argalis-text font-head mb-1">{stats.applicable}</p>
                    <p className="text-[9px] font-black text-argalis-muted uppercase tracking-[0.15em] leading-tight">Indicateurs<br/>Applicables</p>
                  </div>
                  <div className="bg-argalis-bg/50 p-5 rounded-[20px] border border-gray-100/50 shadow-sm">
                    <p className="text-3xl font-black text-argalis font-head mb-1">{stats.compliant}</p>
                    <p className="text-[9px] font-black text-argalis-muted uppercase tracking-[0.15em] leading-tight">Indicateurs<br/>Conformes</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-argalis text-white rounded-[32px] p-10 shadow-hover relative overflow-hidden bento-card flex flex-col justify-center">
              <Euro size={40} className="text-argalis-accent mb-6 opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-argalis-accent">Chiffre d'Affaires</p>
              <h3 className="text-5xl font-black font-head tracking-tighter mb-4">{KEY_FIGURES.revenue}</h3>
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <TrendingUp size={16} />
                <span>En progression</span>
              </div>
            </div>
          </div>

          {/* Section Secondaire : Métriques Activité */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft bento-card">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Users size={24} />
              </div>
              <p className="text-4xl font-black text-argalis-text font-head mb-1">{KEY_FIGURES.learners}</p>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest">Apprenants formés</p>
            </div>

            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft bento-card">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <CalendarDays size={24} />
              </div>
              <p className="text-4xl font-black text-argalis-text font-head mb-1">{KEY_FIGURES.sessions}</p>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest">Sessions réalisées</p>
            </div>

            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft bento-card">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Users2 size={24} />
              </div>
              <p className="text-4xl font-black text-argalis-text font-head mb-1">{KEY_FIGURES.trainersInternal + KEY_FIGURES.trainersExternal}</p>
              <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest">Formateurs mobilisés</p>
            </div>
          </div>
        </div>
      )
    },
    presentation: {
      title: "Vision Argalis",
      subtitle: "Votre copilote Qualité & Conformité",
      icon: <Rocket size={40} />,
      content: (
        <div className="space-y-12">
          <div className="bg-white rounded-[32px] p-12 border border-gray-100 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-argalis-light/10 rounded-full -mr-32 -mt-32"></div>
            <h3 className="font-head font-extrabold text-4xl text-argalis mb-8 relative z-10">L'Excellence Qualiopi</h3>
            <p className="text-xl text-argalis-text leading-relaxed font-medium mb-8 relative z-10">
              Argalis transforme la contrainte réglementaire en <span className="highlight-argalis">levier de performance</span>. 
              Grâce à notre plateforme, vous centralisez vos preuves, automatisez vos processus et sécurisez votre certification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[
                { title: "Centralisation", text: "Toutes vos preuves Qualiopi au même endroit." },
                { title: "Automatisation", text: "Génération de documents conformes en un clic." },
                { title: "Sérénité", text: "Suivi en temps réel de votre taux de conformité." },
                { title: "Expertise", text: "Un accompagnement métier par des consultants." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-argalis-bg/50 rounded-2xl">
                  <CheckCircle className="text-argalis shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-argalis-text text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-argalis-muted leading-tight">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    of: {
      title: "FORMAJADE",
      subtitle: "Identité de l'Organisme de Formation",
      icon: <Building size={40} />,
      content: (
        <div className="space-y-8">
          <div className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-card flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 bg-argalis-bg rounded-3xl flex items-center justify-center p-8 shadow-inner">
               <Building size={64} className="text-argalis/20" />
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-4xl font-black font-head text-argalis-text tracking-tight">SAS FORMAJADE</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Numéro Déclaration Activité</p>
                  <p className="text-lg font-bold text-argalis">52 44 008054 44</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">SIREN / SIRET</p>
                  <p className="text-lg font-bold text-argalis">884 892 485 00010</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Date de création</p>
                  <p className="text-lg font-bold text-argalis">01/07/2020</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mb-1">Siège Social</p>
                  <p className="text-lg font-bold text-argalis">St Brévin les Pins (44)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Actions de Formation', 'Bilans de Compétences', 'Actions VAE'].map((type, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                <CheckCircle className="mx-auto mb-3 text-emerald-500" size={24} />
                <p className="font-head font-bold text-sm text-argalis-text">{type}</p>
              </div>
            ))}
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
          {/* Niveau 1 : Direction */}
          <div className="flex justify-center">
            <div className="bg-argalis text-white p-8 rounded-[28px] shadow-hover w-full max-w-sm text-center">
               <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20">
                 <User size={32} />
               </div>
               <p className="font-head font-black text-2xl">Frédéric MORVAN</p>
               <p className="text-argalis-accent uppercase text-[10px] font-black tracking-widest mt-2">Président Directeur Général</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft text-center bento-card">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-inner">
                 <ShieldCheck size={24} />
               </div>
               <p className="font-head font-bold text-argalis-text">David ROBION</p>
               <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mt-2">Référent Qualité & Handicap</p>
            </div>
            
            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft text-center bento-card">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-inner">
                 <Briefcase size={24} />
               </div>
               <p className="font-head font-bold text-argalis-text">Équipe Administrative</p>
               <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mt-2">Gestion & Facturation</p>
            </div>

            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft text-center bento-card">
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-inner">
                 <GraduationCap size={24} />
               </div>
               <p className="font-head font-bold text-argalis-text">Corps Pédagogique</p>
               <p className="text-[10px] font-black text-argalis-muted uppercase tracking-widest mt-2">23 Formateurs Experts</p>
            </div>
          </div>
        </div>
      )
    },
    synthesis: {
      title: "Audit Qualité",
      subtitle: "Synthèse de Renouvellement • Octobre 2024",
      icon: <FileBarChart size={40} />,
      content: (
        <div className="space-y-8">
          <div className="bg-emerald-500 text-white p-12 rounded-[32px] shadow-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <Award size={64} className="text-white opacity-80" />
              <div>
                <h4 className="font-head font-black text-4xl">Zéro écart.</h4>
                <p className="text-emerald-100 text-xl font-medium mt-1">Audit réalisé par ICERT • Renouvellement Validé</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft">
              <h5 className="font-head font-bold text-lg text-argalis-text mb-6 flex items-center gap-2">
                <Target className="text-emerald-500" size={20} />
                Points Forts relevés
              </h5>
              <ul className="space-y-4">
                {[
                  "Utilisation experte du logiciel ARGALIS",
                  "Mise en place de la réalité augmentée (incendie)",
                  "Veille technologique et pédagogique active",
                  "Recueil de satisfaction dématérialisé (QR Code)"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-argalis-muted font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-soft">
              <h5 className="font-head font-bold text-lg text-argalis-text mb-6 flex items-center gap-2">
                <Microscope className="text-argalis" size={20} />
                Chiffres Clés Audit
              </h5>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-sm font-medium text-argalis-muted">Indicateurs audités</span>
                  <span className="font-black text-argalis">32</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-sm font-medium text-argalis-muted">Ecarts majeurs</span>
                  <span className="font-black text-emerald-500">0</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-sm font-medium text-argalis-muted">Ecarts mineurs</span>
                  <span className="font-black text-emerald-500">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-argalis-muted">Observations</span>
                  <span className="font-black text-argalis">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const data = content[type];

  return (
    <div className="max-w-[1100px] mx-auto p-16 animate-in slide-in-from-bottom-4 duration-700 pb-32">
      <div className="bg-argalis rounded-[40px] p-16 mb-16 shadow-hover relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-64 -mt-64 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-10">
             <div className="p-5 bg-white/10 rounded-[28px] backdrop-blur-xl border border-white/20 shadow-2xl">
               {data.icon}
             </div>
          </div>
          <h1 className="text-7xl font-extrabold mb-4 tracking-tighter leading-none">{data.title}</h1>
          <p className="text-argalis-accent font-head text-2xl opacity-80 font-medium tracking-tight">{data.subtitle}</p>
        </div>
      </div>
      <div>{data.content}</div>
    </div>
  );
};

export default StaticPages;
