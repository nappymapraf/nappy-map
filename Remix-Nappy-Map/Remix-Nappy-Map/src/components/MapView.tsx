import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Place } from '../types';
import { Baby, Compass } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MapViewProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  centerLat: number;
  centerLng: number;
  apiKey: string;
  hasValidKey: boolean;
  onOpenReportModal: (place: Place) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  places,
  selectedPlace,
  onSelectPlace,
  centerLat,
  centerLng,
  apiKey,
  hasValidKey,
}) => {
  const { t } = useLanguage();
  const [activeInfoWindow, setActiveInfoWindow] = useState<Place | null>(selectedPlace);

  // Sync active info window when selectedPlace changes
  React.useEffect(() => {
    setActiveInfoWindow(selectedPlace);
  }, [selectedPlace]);

  // If a valid Google Maps API Key is provided, render Google Vector Map with @vis.gl/react-google-maps
  if (hasValidKey) {
    return (
      <div id="google-map-wrapper" className="w-full h-full relative min-h-[400px]">
        <APIProvider apiKey={apiKey} version="weekly">
          <Map
            center={{ lat: centerLat, lng: centerLng }}
            zoom={14}
            mapId="DEMO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            {/* User GPS Pin */}
            <AdvancedMarker position={{ lat: centerLat, lng: centerLng }}>
              <div className="relative flex items-center justify-center">
                <div className="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-ping" />
                <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md" />
              </div>
            </AdvancedMarker>

            {/* Place Markers */}
            {places.map((place) => {
              const isSelected = selectedPlace?.id === place.id;
              const hasTable = place.changingRoom.hasChangingTable;

              return (
                <AdvancedMarker
                  key={place.id}
                  position={{ lat: place.lat, lng: place.lng }}
                  onClick={() => {
                    onSelectPlace(place);
                    setActiveInfoWindow(place);
                  }}
                >
                  <div className={`p-2 rounded-full border-2 shadow-lg cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${
                    isSelected
                      ? 'bg-rose-500 text-white border-white ring-4 ring-rose-300 scale-125 z-30'
                      : hasTable
                      ? 'bg-teal-500 text-white border-white z-20'
                      : 'bg-slate-400 text-white border-white z-10'
                  }`}>
                    <Baby className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* InfoWindow for Active Place */}
            {activeInfoWindow && (
              <InfoWindow
                position={{ lat: activeInfoWindow.lat, lng: activeInfoWindow.lng }}
                onCloseClick={() => setActiveInfoWindow(null)}
              >
                <div className="p-2 max-w-xs text-slate-900 font-sans">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] uppercase font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                      {activeInfoWindow.category}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                      ★ {activeInfoWindow.rating.toFixed(1)}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">
                    {activeInfoWindow.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">
                    {activeInfoWindow.address}
                  </p>

                  <div className="mt-2 p-1.5 rounded bg-teal-50 border border-teal-200 text-[11px] text-teal-900 font-semibold flex items-center gap-1">
                    <Baby className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>
                      {activeInfoWindow.changingRoom.hasChangingTable
                        ? `${t('changingTableAvailable')} (${activeInfoWindow.changingRoom.cleanlinessRating}/5 ★)`
                        : t('noChangingTable')}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPlace(activeInfoWindow)}
                    className="mt-2 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded text-xs transition-colors"
                  >
                    {t('seeDetailsBtn')}
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    );
  }

  // Fallback Interactive Canvas Map Component (When API Key is not set or in demo mode)
  return (
    <div className="w-full h-full relative min-h-[400px] bg-[#F0F9FF] border border-sky-200 rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-sm">
      {/* Background Stylized Grid Map Canvas */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Map Header Overlay */}
      <div className="relative z-10 flex items-center justify-between gap-2 bg-white/90 border border-sky-200 p-3 rounded-xl backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-rose-500" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">{t('interactiveMapTitle')}</h4>
            <p className="text-[10px] text-slate-500 font-medium">{t('centeredOnCoords', { lat: centerLat.toFixed(3), lng: centerLng.toFixed(3) })}</p>
          </div>
        </div>

        <span className="text-[10px] bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full font-bold">
          {t('venuesTracked', { count: places.length })}
        </span>
      </div>

      {/* Simulated Interactive Map Plotting Area */}
      <div className="relative z-10 my-4 flex-1 w-full bg-white/60 border border-sky-200 rounded-xl overflow-hidden min-h-[300px]">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/80 via-white/40 to-sky-50/80" />
        
        {/* User GPS Center Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-rose-500/20 rounded-full animate-ping" />
          <div className="w-8 h-8 bg-rose-500 text-white border-2 border-white rounded-full flex items-center justify-center font-extrabold text-[10px] shadow-md">
            {t('youLabel')}
          </div>
        </div>

        {/* Positioned Place Markers based on relative offset */}
        {places.map((place) => {
          const latDiff = (place.lat - centerLat) * 350;
          const lngDiff = (place.lng - centerLng) * 350;
          const topPercent = Math.max(10, Math.min(85, 50 - latDiff));
          const leftPercent = Math.max(10, Math.min(85, 50 + lngDiff));
          const isSelected = selectedPlace?.id === place.id;
          const hasTable = place.changingRoom.hasChangingTable;

          return (
            <div
              key={place.id}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              onClick={() => onSelectPlace(place)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className={`p-2 rounded-xl border-2 shadow-md transition-all duration-200 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-rose-500 text-white border-white ring-4 ring-rose-300 scale-125 z-30'
                  : hasTable
                  ? 'bg-teal-500 text-white border-white hover:scale-110'
                  : 'bg-slate-400 text-white border-white hover:scale-110'
              }`}>
                <Baby className="w-4 h-4 stroke-[2.2]" />
                <span className="text-[11px] font-bold hidden sm:inline max-w-[100px] truncate">
                  {place.name}
                </span>
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-slate-900 text-white p-2 rounded-lg border border-slate-700 shadow-xl text-[10px] w-36 pointer-events-none z-40">
                <span className="font-bold text-white truncate">{place.name}</span>
                <span className="text-teal-300 font-medium">
                  {place.changingRoom.hasChangingTable ? `🚼 ${t('changingTableAvailable')}` : t('noChangingTable')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Footer Info */}
      <div className="relative z-10 bg-white/90 border border-sky-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-teal-800 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" /> {t('changingVerifiedLegend')}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" /> {t('toConfirmLegend')}
          </span>
        </div>

        <span className="text-[11px] text-slate-500 italic">{t('clickPinTip')}</span>
      </div>
    </div>
  );
};

