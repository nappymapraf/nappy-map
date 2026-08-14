import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Place, ChangingRoomReport, ChangingRoomType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface AddReportModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: ChangingRoomReport) => void;
}

export const AddReportModal: React.FC<AddReportModalProps> = ({
  place,
  isOpen,
  onClose,
  onSubmitReport,
}) => {
  const { t } = useLanguage();

  if (!isOpen || !place) return null;

  const [authorName, setAuthorName] = useState('');
  const [hasChangingRoom, setHasChangingRoom] = useState(true);
  const [type] = useState<ChangingRoomType>(place.changingRoom.type || 'gender_neutral');
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [spaciousForStroller, setSpaciousForStroller] = useState(true);
  const [hasDisposalBin] = useState(true);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const report: ChangingRoomReport = {
      id: `rep-${Date.now()}`,
      placeId: place.id,
      authorName: authorName.trim() || 'Parent Visitor',
      date: new Date().toISOString().split('T')[0],
      hasChangingRoom,
      type,
      cleanlinessRating,
      spaciousForStroller,
      hasDisposalBin,
      comment: comment.trim() || 'Verified changing room facilities on site.',
      isVerified: true,
    };

    onSubmitReport(report);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sky-200 rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-sky-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500 text-white shadow-xs">
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">{t('reportModalTitle')}</h3>
              <p className="text-xs text-slate-500 line-clamp-1 font-medium">{place.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">{t('authorNameLabel')}</label>
            <input
              type="text"
              placeholder={t('authorNamePlaceholder')}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-slate-50 border border-sky-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>

          <div className="bg-sky-50/80 p-3 rounded-xl border border-sky-200 space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-bold text-slate-800">{t('changingPresentQuestion')}</span>
              <input
                type="checkbox"
                checked={hasChangingRoom}
                onChange={(e) => setHasChangingRoom(e.target.checked)}
                className="w-4 h-4 rounded border-sky-300 text-teal-600 focus:ring-teal-500"
              />
            </label>

            {hasChangingRoom && (
              <div className="pt-2 border-t border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-semibold">{t('cleanliness')}:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setCleanlinessRating(star)}
                        className={`text-sm ${star <= cleanlinessRating ? 'text-amber-500' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-700 font-semibold">
                  <span>{t('strollerSpaceLabel')}:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={spaciousForStroller}
                      onChange={(e) => setSpaciousForStroller(e.target.checked)}
                      className="rounded border-sky-300 text-teal-600"
                    />
                    <span>{t('strollerFitTag')}</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">{t('reportNotesLabel')}</label>
            <textarea
              rows={3}
              placeholder={t('reportNotesPlaceholder')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-50 border border-sky-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-sky-200">
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
              {t('submitVerification')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

