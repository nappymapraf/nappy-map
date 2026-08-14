import React, { useState } from 'react';
import { X, Baby } from 'lucide-react';
import { Place, PlaceCategory, ChangingRoomType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: (newPlace: Place) => void;
  userLat: number;
  userLng: number;
}

export const AddPlaceModal: React.FC<AddPlaceModalProps> = ({
  isOpen,
  onClose,
  onAddPlace,
  userLat,
  userLng,
}) => {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<PlaceCategory>('bar');
  const [address, setAddress] = useState('');
  const [hasChangingTable] = useState(true);
  const [changingType, setChangingType] = useState<ChangingRoomType>('gender_neutral');
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [spaciousForStroller, setSpaciousForStroller] = useState(true);
  const [hasDisposalBin, setHasDisposalBin] = useState(true);
  const [locationNote, setLocationNote] = useState('');
  
  // Amenities
  const [highChairs, setHighChairs] = useState(true);
  const [strollerAccessible, setStrollerAccessible] = useState(true);
  const [kidsMenu, setKidsMenu] = useState(false);
  const [nursingArea, setNursingArea] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Slight offset if added near user location
    const latOffset = (Math.random() - 0.5) * 0.005;
    const lngOffset = (Math.random() - 0.5) * 0.005;

    const newPlace: Place = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      category,
      address: address.trim() || 'Nearby Venue',
      lat: userLat + latOffset,
      lng: userLng + lngOffset,
      rating: 4.5,
      userRatingsTotal: 1,
      priceLevel: 2,
      changingRoom: {
        hasChangingTable,
        type: changingType,
        hasDisposalBin,
        hasSinkInside: true,
        cleanlinessRating,
        spaciousForStroller,
        locationNote: locationNote.trim() || undefined,
      },
      childAmenities: {
        highChairs,
        strollerAccessible,
        kidsMenu,
        nursingArea,
        playArea: false,
        outdoorSeating: true,
      },
      verifiedCount: 1,
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      isUserAdded: true,
    };

    onAddPlace(newPlace);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sky-200 rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-sky-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500 text-white shadow-xs">
              <Baby className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">{t('addPlaceTitle')}</h3>
              <p className="text-xs text-slate-500 font-medium">{t('addPlaceSubtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          {/* Venue Name & Category */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">{t('placeNameLabel')}</label>
            <input
              type="text"
              required
              placeholder={t('placeNamePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-sky-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">{t('categoryLabel')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PlaceCategory)}
                className="w-full bg-slate-50 border border-sky-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              >
                <option value="bar">🍺 {t('catBar')}</option>
                <option value="cafe">☕ {t('catCafe')}</option>
                <option value="restaurant">🍽️ {t('catRestaurant')}</option>
                <option value="park">🌳 {t('catPark')}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">{t('restroomTypeLabel')}</label>
              <select
                value={changingType}
                onChange={(e) => setChangingType(e.target.value as ChangingRoomType)}
                className="w-full bg-slate-50 border border-sky-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              >
                <option value="gender_neutral">🚻 {t('type_gender_neutral')}</option>
                <option value="family_restroom">🍼 {t('type_family_restroom')}</option>
                <option value="mens_and_womens">🚹🚺 {t('type_mens_and_womens')}</option>
                <option value="womens_only">🚺 {t('type_womens_only')}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">{t('addressLabel')}</label>
            <input
              type="text"
              placeholder={t('addressPlaceholder')}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-sky-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>

          {/* Changing Table Details */}
          <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-200 space-y-3">
            <span className="font-extrabold text-teal-800 block text-xs">🚼 {t('changingDetailsHeader')}</span>

            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-semibold">{t('cleanlinessRatingLabel')}:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setCleanlinessRating(star)}
                    className={`text-sm px-1 ${star <= cleanlinessRating ? 'text-amber-500' : 'text-slate-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={spaciousForStroller}
                  onChange={(e) => setSpaciousForStroller(e.target.checked)}
                  className="rounded border-sky-300 text-teal-600 focus:ring-teal-500"
                />
                <span>🛒 {t('fitsLargeStrollers')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={hasDisposalBin}
                  onChange={(e) => setHasDisposalBin(e.target.checked)}
                  className="rounded border-sky-300 text-teal-600 focus:ring-teal-500"
                />
                <span>🗑️ {t('disposalBin')}</span>
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-slate-500 text-[11px] font-bold">{t('locationNoteLabel')}</label>
              <input
                type="text"
                placeholder={t('locationNotePlaceholder')}
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                className="w-full bg-white border border-sky-200 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>
          </div>

          {/* Child Amenities */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 block">{t('otherFamilyServices')}</span>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={highChairs}
                  onChange={(e) => setHighChairs(e.target.checked)}
                  className="rounded border-sky-300 text-teal-600"
                />
                <span>🪑 {t('highChairsAvailable')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={strollerAccessible}
                  onChange={(e) => setStrollerAccessible(e.target.checked)}
                  className="rounded border-sky-300 text-teal-600"
                />
                <span>♿ {t('strollerRamp')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={kidsMenu}
                  onChange={(e) => setKidsMenu(e.target.checked)}
                  className="rounded border-sky-300 text-teal-600"
                />
                <span>🍽️ {t('kidsMenuAvailable')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={nursingArea}
                  onChange={(e) => setNursingArea(e.target.checked)}
                  className="rounded border-sky-300 text-teal-600"
                />
                <span>🍼 {t('nursingCornerAvailable')}</span>
              </label>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t border-sky-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-5 py-2 rounded-xl shadow-sm transition-colors"
            >
              {t('savePlace')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

