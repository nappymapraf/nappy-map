import React from 'react';
import { Baby, MapPin, Plus, Key, Compass, Search, Globe, Smartphone } from 'lucide-react';
import { LocationCoordinates } from '../types';
import { DEFAULT_CITIES } from '../data/mockPlaces';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES, Language } from '../i18n/translations';
import officialLogo from '../assets/images/nappy_map_icon_1786615086192.jpg';

interface HeaderProps {
  currentCityKey: string;
  onSelectCity: (cityKey: string) => void;
  onUseGeolocation: () => void;
  isLocating: boolean;
  onOpenAddPlace: () => void;
  hasApiKey: boolean;
  onOpenApiKeyInfo: () => void;
  onOpenInstallPwa?: () => void;
  onOpenIconPreview?: () => void;
  currentLocationName?: string;
  onSearchCustomLocation?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCityKey,
  onSelectCity,
  onUseGeolocation,
  isLocating,
  onOpenAddPlace,
  hasApiKey,
  onOpenApiKeyInfo,
  onOpenInstallPwa,
  onOpenIconPreview,
  currentLocationName,
  onSearchCustomLocation,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [customQuery, setCustomQuery] = React.useState('');
  const [isSearchingCustom, setIsSearchingCustom] = React.useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuery.trim() && onSearchCustomLocation) {
      onSearchCustomLocation(customQuery);
      setCustomQuery('');
      setIsSearchingCustom(false);
    }
  };

  return (
    <header id="app-header" className="bg-white/90 backdrop-blur-md border-b border-sky-200 text-slate-800 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenIconPreview}
            className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-teal-200 shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-hidden"
            title="Ingrandisci Icona / Anteprima Logo"
          >
            <img src={officialLogo} alt="Nappy Map Logo" className="w-full h-full object-cover" />
          </button>
          <div className="cursor-pointer" onClick={onOpenIconPreview}>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-none hover:text-teal-600 transition-colors">
                {t('appName')}
              </h1>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t('tagline')}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5 max-w-xs truncate">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Location Selector & Search */}
        <div className="flex items-center gap-2 bg-sky-50/80 p-1.5 rounded-xl border border-sky-200 max-w-xs sm:max-w-md md:max-w-lg w-full">
          <button
            id="geolocation-btn"
            onClick={onUseGeolocation}
            disabled={isLocating}
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
              currentCityKey === 'geolocation'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-sky-100 hover:text-slate-900'
            }`}
            title={t('gpsLocation')}
          >
            <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin text-white' : ''}`} />
            <span className="hidden md:inline">{t('nearMe')}</span>
          </button>

          <div className="h-4 w-px bg-sky-200 mx-0.5 hidden sm:block" />

          {!isSearchingCustom ? (
            <div className="relative flex-1 min-w-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="city-selector"
                value={currentCityKey}
                onChange={(e) => onSelectCity(e.target.value)}
                className="w-full bg-transparent text-slate-800 text-xs font-bold pl-7 pr-6 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer appearance-none truncate"
              >
                {currentCityKey === 'geolocation' && (
                  <option value="geolocation" className="bg-white text-teal-700 font-bold">
                    📍 {currentLocationName || t('gpsLocation')}
                  </option>
                )}
                {currentCityKey === 'custom' && (
                  <option value="custom" className="bg-white text-rose-700 font-bold">
                    📍 {currentLocationName || t('searchedLocation')}
                  </option>
                )}
                {Object.entries(DEFAULT_CITIES).map(([key, city]) => (
                  <option key={key} value={key} className="bg-white text-slate-800">
                    {city.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setIsSearchingCustom(true)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-sky-100 transition-colors shrink-0"
                title={t('searchCityPlaceholder')}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="flex-1 min-w-0 flex items-center gap-1">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder={t('searchCityPlaceholder')}
                autoFocus
                className="w-full bg-white border border-sky-300 text-slate-900 text-xs font-medium px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold px-2 py-1 rounded transition-colors shrink-0"
              >
                {t('searchBtn')}
              </button>
              <button
                type="button"
                onClick={() => setIsSearchingCustom(false)}
                className="text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ✕
              </button>
            </form>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Android PWA Install Button */}
          {onOpenInstallPwa && (
            <button
              id="pwa-install-btn"
              onClick={onOpenInstallPwa}
              className="bg-sky-50 border border-sky-200 hover:bg-sky-100 text-slate-700 font-extrabold px-2.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              title={t('installAndroidApp')}
            >
              <Smartphone className="w-4 h-4 text-rose-500" />
              <span className="hidden lg:inline">{t('installAndroidApp')}</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="relative flex items-center" id="language-selector-wrapper">
            <select
              id="language-selector"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-sky-50/90 border border-sky-200 text-slate-800 text-xs font-extrabold pl-2.5 pr-7 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer appearance-none hover:bg-sky-100 transition-colors shadow-xs"
              title="Cambia Lingua / Change Language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-slate-900 font-semibold">
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            id="add-venue-btn"
            onClick={onOpenAddPlace}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden md:inline">{t('addSpot')}</span>
            <span className="md:hidden">{t('addShort')}</span>
          </button>

          <button
            id="api-key-status-btn"
            onClick={onOpenApiKeyInfo}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              hasApiKey
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
            title={hasApiKey ? t('mapsKeyTooltipConnected') : t('mapsKeyTooltipInfo')}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{hasApiKey ? t('mapsReady') : t('mapsKey')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};


