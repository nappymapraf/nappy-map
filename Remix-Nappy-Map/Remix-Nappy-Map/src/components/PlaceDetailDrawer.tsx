import React from 'react';
import { 
  X, 
  Baby, 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Check, 
  ShieldCheck, 
  Navigation, 
  MessageSquarePlus, 
  UserCheck
} from 'lucide-react';
import { Place, ChangingRoomReport } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';

interface PlaceDetailDrawerProps {
  place: Place | null;
  onClose: () => void;
  reports: ChangingRoomReport[];
  onOpenReportModal: (place: Place) => void;
}

export const PlaceDetailDrawer: React.FC<PlaceDetailDrawerProps> = ({
  place,
  onClose,
  reports,
  onOpenReportModal,
}) => {
  const { t } = useLanguage();

  if (!place) return null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${place.name}, ${place.address}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getChangingTypeLabel = (type: string) => {
    const key = `type_${type}` as TranslationKey;
    return t(key);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:max-w-md bg-white border-l border-sky-200 text-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header Bar */}
      <div className="p-4 bg-sky-50/90 border-b border-sky-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {place.category}
          </span>
          {place.distanceKm !== undefined && (
            <span className="text-xs font-semibold text-slate-500">
              {t('distanceAway', { dist: place.distanceKm })}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Title & Photo */}
        <div>
          {place.photoUrl && (
            <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 border border-sky-200 relative">
              <img
                src={place.photoUrl}
                alt={place.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          )}

          <h2 className="text-xl font-extrabold text-slate-900">{place.name}</h2>
          <p className="text-xs text-slate-500 flex items-start gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>{place.address}</span>
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{place.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({place.userRatingsTotal} {t('reviewsTotal')})</span>
            </div>
            <div className="text-teal-800 font-bold bg-teal-50 px-2 py-1 rounded-md border border-teal-200 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{place.verifiedCount} {t('verifications')}</span>
            </div>
          </div>
        </div>

        {/* Highlighted Changing Room Specs */}
        <div className="bg-sky-50/80 border border-teal-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-sky-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500 text-white shadow-xs">
                <Baby className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{t('changingTableStatus')}</h4>
                <p className="text-xs text-teal-800 font-bold">
                  {place.changingRoom.hasChangingTable ? t('verifiedAndAvailable') : t('notAvailableUnconfirmed')}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenReportModal(place)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-xs transition-all"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{t('verifyBtn')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-white p-2.5 rounded-xl border border-sky-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('restroomAccess')}</span>
              <span className="text-slate-800 font-semibold capitalize">
                {getChangingTypeLabel(place.changingRoom.type)}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-sky-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('cleanlinessRatingLabel')}</span>
              <span className="text-emerald-700 font-extrabold">
                {place.changingRoom.cleanlinessRating} / 5 ★
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-sky-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('strollerSpaceLabel')}</span>
              <span className={`font-bold ${place.changingRoom.spaciousForStroller ? 'text-teal-800' : 'text-amber-800'}`}>
                {place.changingRoom.spaciousForStroller ? t('fitsLargeStrollers') : t('tightSpace')}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-sky-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('inRoomAmenities')}</span>
              <span className="text-slate-800 font-semibold">
                {place.changingRoom.hasDisposalBin ? `${t('disposalBin')} • ` : ''}
                {place.changingRoom.hasSinkInside ? t('sinkInside') : ''}
              </span>
            </div>
          </div>

          {place.changingRoom.locationNote && (
            <div className="bg-white p-3 rounded-xl border border-sky-200 text-xs text-slate-700">
              <span className="font-bold text-teal-800 block mb-1">{t('locationNoteHeader')}</span>
              <p className="italic text-slate-600">{place.changingRoom.locationNote}</p>
            </div>
          )}
        </div>

        {/* Child & Family Amenities Checklist */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">
            {t('familyChildAmenities')}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${place.childAmenities.strollerAccessible ? 'bg-white border-sky-200 text-slate-800 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <Check className={`w-3.5 h-3.5 ${place.childAmenities.strollerAccessible ? 'text-teal-600 stroke-[3]' : 'text-slate-400'}`} />
              <span>{t('strollerAccessible')}</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${place.childAmenities.highChairs ? 'bg-white border-sky-200 text-slate-800 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <Check className={`w-3.5 h-3.5 ${place.childAmenities.highChairs ? 'text-teal-600 stroke-[3]' : 'text-slate-400'}`} />
              <span>{t('highChairsAvailable')}</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${place.childAmenities.kidsMenu ? 'bg-white border-sky-200 text-slate-800 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <Check className={`w-3.5 h-3.5 ${place.childAmenities.kidsMenu ? 'text-teal-600 stroke-[3]' : 'text-slate-400'}`} />
              <span>{t('kidsMenuAvailable')}</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${place.childAmenities.nursingArea ? 'bg-white border-sky-200 text-slate-800 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <Check className={`w-3.5 h-3.5 ${place.childAmenities.nursingArea ? 'text-teal-600 stroke-[3]' : 'text-slate-400'}`} />
              <span>{t('nursingCornerAvailable')}</span>
            </div>
          </div>
        </div>

        {/* Parent Reports & Verification Log */}
        <div className="space-y-3 pt-2 border-t border-sky-200">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>{t('parentReportsHeading')}</span>
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              {reports.length === 1 ? t('reportsCountOne') : t('reportsCountMany', { count: reports.length })}
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="bg-sky-50/50 p-4 rounded-xl text-center text-xs text-slate-500 border border-sky-200">
              <p>{t('noReportsYet')}</p>
              <button
                onClick={() => onOpenReportModal(place)}
                className="text-rose-600 hover:underline font-bold mt-1 inline-block"
              >
                {t('beFirstParent')}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {reports.map((rep) => (
                <div key={rep.id} className="bg-white p-3 rounded-xl border border-sky-200 text-xs space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rep.authorName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{rep.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-emerald-700 font-extrabold">{rep.cleanlinessRating} / 5 ★ {t('cleanliness')}</span>
                    {rep.spaciousForStroller && (
                      <span className="text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded border border-sky-200 font-semibold">
                        {t('strollerFitTag')}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-normal">{rep.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Practical Venue Details */}
        <div className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-sky-200 font-medium">
          {place.openingHours && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{place.openingHours}</span>
            </div>
          )}
          {place.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`tel:${place.phone}`} className="text-rose-600 font-bold hover:underline">
                {place.phone}
              </a>
            </div>
          )}
          {place.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-rose-600 font-bold hover:underline truncate">
                {place.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-4 bg-sky-50/90 border-t border-sky-200 flex items-center justify-between gap-3 shrink-0">
        <button
          onClick={handleDirections}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Navigation className="w-4 h-4" />
          <span>{t('getDirections')}</span>
        </button>
      </div>
    </div>
  );
};

