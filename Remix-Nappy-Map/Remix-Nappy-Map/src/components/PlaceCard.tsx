import React from 'react';
import { 
  Baby, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight,
  Beer,
  Coffee,
  Utensils,
  Trees
} from 'lucide-react';
import { Place } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';

interface PlaceCardProps {
  place: Place;
  isSelected: boolean;
  onSelect: (place: Place) => void;
  onOpenReportModal: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSelected,
  onSelect,
  onOpenReportModal,
}) => {
  const { t } = useLanguage();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'bar':
      case 'pub':
        return <Beer className="w-3.5 h-3.5 text-amber-600" />;
      case 'cafe':
        return <Coffee className="w-3.5 h-3.5 text-amber-700" />;
      case 'restaurant':
        return <Utensils className="w-3.5 h-3.5 text-rose-500" />;
      case 'park':
        return <Trees className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Beer className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const getChangingTypeLabel = (type: string) => {
    const key = `type_${type}` as TranslationKey;
    return t(key);
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${place.name}, ${place.address}`
    )}&destination_place_id=${place.id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id={`place-card-${place.id}`}
      onClick={() => onSelect(place)}
      className={`rounded-2xl p-4 transition-all duration-200 cursor-pointer border text-slate-800 relative group overflow-hidden ${
        isSelected
          ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/20'
          : 'bg-white border-sky-200/80 hover:border-rose-300 shadow-xs hover:shadow-sm'
      }`}
    >
      {/* Top Banner / Category & Rating */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1.5 capitalize">
            {getCategoryIcon(place.category)}
            {place.category}
          </span>

          {place.distanceKm !== undefined && (
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
              {t('distanceAway', { dist: place.distanceKm })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{place.rating.toFixed(1)}</span>
          <span className="text-slate-400 text-[10px]">({place.userRatingsTotal})</span>
        </div>
      </div>

      {/* Place Title */}
      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-rose-600 transition-colors leading-snug">
        {place.name}
      </h3>

      {/* Address */}
      <p className="text-xs text-slate-500 flex items-start gap-1.5 mt-1 line-clamp-1">
        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>{place.address}</span>
      </p>

      {/* Primary Changing Room Feature Box */}
      <div className="mt-3 p-3 rounded-xl border bg-sky-50/70 border-sky-100">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${place.changingRoom.hasChangingTable ? 'bg-teal-500 text-white shadow-xs' : 'bg-rose-100 text-rose-600'}`}>
              <Baby className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-bold text-xs ${place.changingRoom.hasChangingTable ? 'text-teal-900' : 'text-slate-500'}`}>
                  {place.changingRoom.hasChangingTable ? t('changingAvailable') : t('noChangingTable')}
                </span>
                {place.changingRoom.hasChangingTable && (
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" title={t('verifiedCommunity')} />
                )}
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                {getChangingTypeLabel(place.changingRoom.type)}
              </p>
            </div>
          </div>

          {place.changingRoom.hasChangingTable && (
            <div className="text-right shrink-0">
              <span className="text-[11px] font-semibold text-slate-500 block">
                {t('cleanliness')}
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {place.changingRoom.cleanlinessRating} / 5 ★
              </span>
            </div>
          )}
        </div>

        {/* Location Note / Tip */}
        {place.changingRoom.locationNote && (
          <p className="text-[11px] text-slate-600 italic mt-2 pt-2 border-t border-sky-200/60 line-clamp-2">
            "{place.changingRoom.locationNote}"
          </p>
        )}
      </div>

      {/* Child Amenities Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3">
        {place.changingRoom.spaciousForStroller && (
          <span className="text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-200 px-2 py-0.5 rounded-md">
            {t('strollerFitTag')}
          </span>
        )}
        {place.childAmenities.highChairs && (
          <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md">
            {t('highChairsTag')}
          </span>
        )}
        {place.childAmenities.kidsMenu && (
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md">
            {t('kidsMenuTag')}
          </span>
        )}
        {place.childAmenities.nursingArea && (
          <span className="text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-md">
            {t('nursingSpotTag')}
          </span>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-3 pt-2.5 border-t border-sky-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          {t('verifiedByParents', { count: place.verifiedCount })}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenReportModal(place);
            }}
            className="text-slate-600 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-sky-50 transition-colors text-[11px] font-bold flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" />
            <span>{t('verifyBtn')}</span>
          </button>

          <button
            onClick={handleDirections}
            className="text-slate-600 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-sky-50 transition-colors text-[11px] font-bold flex items-center gap-1"
          >
            <Navigation className="w-3 h-3" />
            <span>{t('mapBtn')}</span>
          </button>

          <div className="text-rose-500 p-1 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

