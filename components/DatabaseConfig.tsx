
import React, { useState } from 'react';
import { Database, Link2, Check, X, AlertCircle } from 'lucide-react';
import { storageService } from '../services/storageService';

interface Props {
  onClose: () => void;
}

const DatabaseConfig: React.FC<Props> = ({ onClose }) => {
  const [url, setUrl] = useState(storageService.getApiUri() || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    storageService.setApiUri(url);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-[32px] w-full max-w-md p-10 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-argalis-light rounded-2xl flex items-center justify-center text-argalis">
            <Database size={24} />
          </div>
          <div>
            <h2 className="font-head font-black text-xl text-argalis-text leading-tight">Connexion Cloud</h2>
            <p className="text-[10px] text-argalis-muted font-bold uppercase tracking-widest opacity-60">Google Sheets API</p>
          </div>
          <button onClick={onClose} className="ml-auto text-gray-300 hover:text-gray-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-argalis uppercase tracking-widest ml-1">URL Google Apps Script</label>
            <div className="relative">
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full bg-argalis-bg border-2 border-transparent focus:border-argalis rounded-2xl p-4 text-xs font-medium outline-none transition-all pr-12"
              />
              <Link2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 border border-blue-100">
            <AlertCircle size={18} className="text-blue-500 shrink-0" />
            <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
              Une fois configurée, chaque modification de l'audit sera automatiquement synchronisée avec votre feuille de calcul Google.
            </p>
          </div>

          <button 
            onClick={handleSave}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
              saved ? 'bg-emerald-500 text-white' : 'bg-argalis text-white hover:bg-argalis-dark shadow-xl active:scale-95'
            }`}
          >
            {saved ? <Check size={18} /> : null}
            {saved ? 'Connecté' : 'Enregistrer la connexion'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConfig;
