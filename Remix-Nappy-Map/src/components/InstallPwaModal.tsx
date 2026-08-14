import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, CheckCircle2, MoreVertical, PlusSquare, Share2, Compass } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('android');

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOSDevice) {
      setActiveTab('ios');
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.warn('Installation prompt error:', err);
      } finally {
        setIsInstalling(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-100 relative overflow-hidden text-slate-800">
        
        {/* Header Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-teal-500/20 border border-teal-200 shrink-0">
              <img src="/icon.png" alt="Nappy Map" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Web App / Mobile App
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 mt-1">{t('installAppTitle')}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
          Aggiungi Nappy Map alla schermata Home del tuo telefono per aprirla istantaneamente come un'app nativa.
        </p>

        {/* Installed Success Message */}
        {isInstalled ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 text-emerald-900 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">{t('installedSuccess')}</p>
              <p className="text-emerald-700 font-medium mt-0.5">
                Trovi l'icona di Nappy Map nella tua schermata Home.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Direct Prompt Button if available (Chrome/Android/Desktop) */}
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 mb-4"
              >
                <Download className="w-4 h-4" />
                <span>{isInstalling ? 'Installazione in corso...' : 'Scarica & Installa Ora'}</span>
              </button>
            )}

            {/* Platform Selection Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-4">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'android' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Android / Chrome</span>
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ios' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>iPhone / iOS Safari</span>
              </button>
            </div>

            {/* Android Guide */}
            {activeTab === 'android' && (
              <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <MoreVertical className="w-4 h-4 text-rose-500" />
                  <span>Istruzioni Android (Google Chrome)</span>
                </h4>

                <ol className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Tocca i <strong>tre puntini (⋮)</strong> in alto a destra su Chrome.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Seleziona <strong>"Aggiungi a schermata Home"</strong> oppure <strong>"Installa applicazione"</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <span>Conferma premendo <strong>Installa</strong>.</span>
                  </li>
                </ol>
              </div>
            )}

            {/* iOS Guide */}
            {activeTab === 'ios' && (
              <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-rose-600" />
                  <span>Istruzioni iPhone / iPad (Safari)</span>
                </h4>

                <ol className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Apri questo sito su <strong>Safari</strong> sul tuo iPhone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Tocca il pulsante <strong>Condividi</strong> (<Share2 className="w-3 h-3 inline text-sky-600" /> in basso al centro).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <span>Scorri in basso e seleziona <strong className="text-slate-900"><PlusSquare className="w-3.5 h-3.5 inline text-rose-600" /> "Aggiungi alla schermata Home"</strong>.</span>
                  </li>
                </ol>
              </div>
            )}
          </>
        )}

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors"
          >
            {t('closeModal')}
          </button>
        </div>
      </div>
    </div>
  );
};
