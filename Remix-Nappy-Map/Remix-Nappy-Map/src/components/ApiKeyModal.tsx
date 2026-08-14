import React from 'react';
import { Key, ExternalLink, X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasApiKey: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, hasApiKey }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sky-200 rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${hasApiKey ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">{t('apiKeyConfigTitle')}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {hasApiKey ? t('apiKeyConnectedSub') : t('apiKeyConfigSub')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-sky-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hasApiKey ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 text-emerald-900 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">{t('apiKeyConnectedTitle')}</p>
              <p className="text-xs text-emerald-800 mt-1">
                {t('apiKeyConnectedDesc')}{' '}
                <code className="bg-emerald-100 px-1 py-0.5 rounded text-emerald-900 font-mono">process.env.GOOGLE_MAPS_PLATFORM_KEY</code>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-slate-700 font-medium">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-amber-900 text-sm">{t('howToAddApiKey')}</p>
                <p className="text-amber-800 mt-1">
                  {t('howToAddApiKeyDesc')}
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-sky-50/80 p-4 rounded-xl border border-sky-200">
              <p className="font-extrabold text-slate-900">{t('stepByStepGuide')}</p>
              <ol className="list-decimal list-inside space-y-2 text-slate-700">
                <li>
                  <a
                    href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    {t('getApiKeyLink')} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  {t('stepOpenSettings')}
                </li>
                <li>
                  {t('stepSelectSecrets')}
                </li>
                <li>
                  {t('stepAddSecretName')} <code className="bg-white border border-sky-200 px-1.5 py-0.5 rounded text-teal-800 font-bold font-mono">GOOGLE_MAPS_PLATFORM_KEY</code>
                </li>
                <li>
                  {t('stepPasteValue')}
                </li>
              </ol>
            </div>

            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-600 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                {t('apiKeyNote')}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-5 py-2 rounded-xl text-xs transition-colors shadow-xs"
          >
            {t('understandContinue')}
          </button>
        </div>
      </div>
    </div>
  );
};

