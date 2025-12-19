
import React, { useState, useEffect } from 'react';
import { IndicatorData } from '../types';
import { ArrowLeft, Lightbulb, Calendar, Link as LinkIcon, ExternalLink, Plus, Trash2, CheckCircle, AlertCircle, Slash, Info, LayoutGrid, FileCheck, Save, Loader2 } from 'lucide-react';
import { storageService } from '../services/storageService';

interface Props {
  data: IndicatorData;
  onBack: () => void;
}

interface LinkItem {
  label: string;
  url: string;
}

const IndicatorDetail: React.FC<Props> = ({ data, onBack }) => {
  const [applicability, setApplicability] = useState(() => {
    const saved = localStorage.getItem(`argalis_indicator_${data.id}_applicability`);
    if (saved !== null) return JSON.parse(saved);
    const text = data.auditObservation?.toLowerCase() || "";
    return !(text.includes("sans objet") || text.startsWith("non applicable"));
  });

  const [compliance, setCompliance] = useState(() => {
    const saved = localStorage.getItem(`argalis_indicator_${data.id}_compliance`);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [implementation, setImplementation] = useState(() => {
    const saved = localStorage.getItem(`argalis_indicator_${data.id}_implementation`);
    return saved !== null ? saved : (data.auditObservation || "");
  });

  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem(`argalis_indicator_${data.id}_links`);
    return saved !== null ? JSON.parse(saved) : (data.links || []);
  });

  const [isSaving, setIsSaving] = useState(false);
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [showAddLink, setShowAddLink] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await storageService.saveIndicator({
      indicatorId: data.id,
      applicability,
      compliance,
      implementation,
      links
    });
    // On notifie l'app qu'il y a eu un changement pour la sidebar
    window.dispatchEvent(new Event('indicator-storage-update'));
    setTimeout(() => setIsSaving(false), 800);
  };

  // Sauvegarde auto discrète sur les switchs
  useEffect(() => {
    handleSave();
  }, [applicability, compliance]);

  return (
    <div className="max-w-[1200px] mx-auto p-12 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-32">
      <div className="flex justify-between items-center mb-10">
        <button onClick={onBack} className="group flex items-center gap-2 text-argalis-muted hover:text-argalis transition-all text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform" />
          Référentiel
        </button>
        <div className="flex items-center gap-4">
          {storageService.getApiUri() && (
            <span className="flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <CheckCircle size={10} /> Sync Cloud Active
            </span>
          )}
          <span className="bg-argalis-accent/40 text-argalis px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-argalis/10">
            Qualiopi V.9
          </span>
        </div>
      </div>

      <header className="bg-white rounded-[24px] p-10 border border-gray-100 shadow-card mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-argalis-light/20 rounded-full -mr-32 -mt-32"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-argalis text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-widest">Critère {data.criterionId}</span>
              <div className="h-px bg-gray-100 flex-1"></div>
            </div>
            <h1 className="text-5xl font-extrabold text-argalis mb-4 tracking-tight">Indicateur {data.id}</h1>
            <p className="text-argalis-muted text-xl font-medium leading-tight max-w-2xl">{data.criterionName}</p>
          </div>
          <div className={`px-8 py-4 rounded-[20px] flex items-center gap-4 font-head font-black shadow-lg border-2 transition-all ${
            !applicability ? "bg-gray-100 text-gray-400 border-gray-200" : compliance ? "bg-argalis text-white border-transparent" : "bg-red-50 text-red-600 border-red-200"
          }`}>
            {!applicability ? <Slash size={24} /> : compliance ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            <span className="text-sm uppercase tracking-[0.1em]">{!applicability ? "Non Applicable" : compliance ? "Conforme" : "Non Conforme"}</span>
          </div>
        </div>
        <div className="mt-10 p-6 bg-argalis-bg border border-argalis-accent/30 rounded-2xl">
           <p className="text-argalis-text font-bold text-base leading-relaxed italic opacity-80">{data.name}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white border border-gray-100 rounded-[24px] p-10 shadow-soft">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-argalis-light rounded-2xl text-argalis shadow-inner"><Info size={24} /></div>
              <h3 className="font-head font-bold text-2xl text-argalis-text">Niveau attendu</h3>
            </div>
            <p className="text-argalis-muted text-base font-medium">{data.expectedLevel}</p>
          </section>

          <section className="bg-argalis text-white rounded-[24px] p-10 shadow-hover relative overflow-hidden group">
            <h3 className="text-argalis-accent font-head font-bold text-2xl flex items-center gap-3 mb-6">
              <Lightbulb size={28} /> Expertise Argalis
            </h3>
            <p className="text-white/90 text-lg leading-relaxed font-medium">{data.argalisHelp}</p>
          </section>

          <section className={`bg-white border border-gray-100 rounded-[24px] p-10 shadow-soft transition-all ${!applicability ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-argalis-accent/40 rounded-2xl text-argalis"><LayoutGrid size={24} /></div>
                <h3 className="font-head font-bold text-2xl text-argalis-text">Mise en œuvre</h3>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-argalis text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-argalis-dark transition-all disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Sauvegarder
              </button>
            </div>
            <textarea 
              value={implementation}
              onChange={(e) => setImplementation(e.target.value)}
              className="w-full h-64 p-8 rounded-[20px] border-2 border-argalis-bg bg-argalis-bg/30 focus:bg-white focus:border-argalis text-sm leading-relaxed resize-none outline-none transition-all"
              placeholder="Détaillez ici vos processus..."
            ></textarea>
          </section>
        </div>

        <aside className="space-y-10">
          <div className="bg-white border border-gray-100 rounded-[24px] p-10 shadow-soft sticky top-10">
            <h3 className="font-head font-bold text-xl mb-10 text-argalis-text border-b border-gray-50 pb-6">Réglages</h3>
            <div className="flex justify-between items-center mb-10">
              <label className="text-sm font-extrabold text-argalis-text">Applicabilité</label>
              <button onClick={() => setApplicability(!applicability)} className={`w-16 h-9 flex items-center rounded-full p-1.5 transition-all ${applicability ? 'bg-argalis' : 'bg-gray-200'}`}>
                <div className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform ${applicability ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className={`flex justify-between items-center mb-10 ${!applicability ? 'opacity-20 pointer-events-none' : ''}`}>
              <label className="text-sm font-extrabold text-argalis-text">Conformité</label>
              <button onClick={() => setCompliance(!compliance)} className={`w-16 h-9 flex items-center rounded-full p-1.5 transition-all ${compliance ? 'bg-emerald-500' : 'bg-red-400'}`}>
                <div className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform ${compliance ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default IndicatorDetail;
