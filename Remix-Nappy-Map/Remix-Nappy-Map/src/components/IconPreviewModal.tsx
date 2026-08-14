import React from 'react';
import { X, ZoomIn, Check, Sparkles, Smartphone, Eye } from 'lucide-react';
import officialLogo from '../assets/images/nappy_map_icon_1786615086192.jpg';

interface IconPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IconPreviewModal: React.FC<IconPreviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-teal-100 relative overflow-hidden text-slate-800 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-200">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Anteprima Icona Nappy Map</h3>
              <p className="text-xs text-slate-500 font-medium">Visualizzazione ad alta risoluzione del logo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large SVG Icon Canvas Card */}
        <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/80 rounded-3xl p-6 mb-5 shadow-inner relative group">
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-500" />
            Icona Ufficiale
          </span>

          {/* Large Preview */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-300 group-hover:scale-105 my-2">
            <img 
              src={officialLogo} 
              alt="Nappy Map Icon Large Preview" 
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-xs text-slate-500 font-semibold text-center mt-3">
            Icona Ufficiale Nappy Map • Formato App Icon / PWA
          </p>
        </div>

        {/* Feature Highlights of the Icon design requested */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-5">
          <div className="p-3 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-start gap-2">
            <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-slate-800">Sfondo Verde</p>
              <p className="text-slate-500 text-[11px]">Sfondo verde sfumato come la foto centrale</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-100 flex items-start gap-2">
            <Check className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-slate-800">Pin Rosa a Punta</p>
              <p className="text-slate-500 text-[11px]">Segnaposto rosa appuntito in primo piano</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-start gap-2">
            <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-slate-800">Mappa di Sfondo</p>
              <p className="text-slate-500 text-[11px]">Griglia con strade come nella foto a destra</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-start gap-2">
            <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-slate-800">Cambio Fasciatoio</p>
              <p className="text-slate-500 text-[11px]">Simbolo mamma e bimbo come nella prima foto</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors shadow-md"
          >
            Chiudi Anteprima
          </button>
        </div>
      </div>
    </div>
  );
};
