import React from 'react';
import { 
  Baby, 
  Search, 
  Beer, 
  Coffee, 
  Utensils, 
  Trees, 
  Check, 
  Sparkles,
  Map as MapIcon,
  List,
  Columns
} from 'lucide-react';
import { FilterState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalResults: number;
  viewMode: 'split' | 'map' | 'list';
  onViewModeChange: (mode: 'split' | 'map' | 'list') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalResults,
  viewMode,
  onViewModeChange,
}) => {
  const { t } = useLanguage();

  const categories = [
    { id: 'all', label: t('catAll'), icon: Sparkles },
    { id: 'bar', label: t('catBar'), icon: Beer },
    { id: 'cafe', label: t('catCafe'), icon: Coffee },
    { id: 'restaurant', label: t('catRestaurant'), icon: Utensils },
    { id: 'park', label: t('catPark'), icon: Trees },
  ];

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div id="filter-bar" className="bg-white/95 border-b border-sky-200 backdrop-blur-md px-4 sm:px-6 py-3 space-y-3 shadow-xs">
      {/* Top Row: Search & Category Tabs & View Mode */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="venue-search-input"
            type="text"
            placeholder={t('searchBarPlaceholder')}
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="w-full bg-slate-50 border border-sky-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all font-medium"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            <span className="text-rose-600 font-extrabold">{totalResults}</span>{' '}
            {totalResults === 1 ? t('spotFoundOne') : t('spotsFoundCount', { count: totalResults })}
          </span>

          <div className="bg-sky-50/80 p-1 rounded-xl border border-sky-200 flex items-center gap-1">
            <button
              onClick={() => onViewModeChange('split')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'split' ? 'bg-rose-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('splitView')}</span>
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'map' ? 'bg-rose-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('mapView')}</span>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'list' ? 'bg-rose-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('listView')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Middle Row: Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-rose-500 text-white border border-rose-500 shadow-sm'
                  : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Row: Changing Room & Amenity Quick Toggles */}
      <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-sky-100">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
          {t('mustHave')}
        </span>

        {/* Baby Changing Room Toggle */}
        <button
          onClick={() => updateFilter('changingRoomOnly', !filters.changingRoomOnly)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
            filters.changingRoomOnly
              ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Baby className="w-3.5 h-3.5 text-teal-600" />
          <span>{t('filterChangingTable')}</span>
          {filters.changingRoomOnly && <Check className="w-3 h-3 text-teal-600 stroke-[3]" />}
        </button>

        {/* Gender Neutral / Men's Accessible */}
        <button
          onClick={() => updateFilter('genderNeutralOrMens', !filters.genderNeutralOrMens)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
            filters.genderNeutralOrMens
              ? 'bg-purple-50 border-purple-300 text-purple-800 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🚻 {t('filterNeutralMens')}</span>
          {filters.genderNeutralOrMens && <Check className="w-3 h-3 text-purple-600 stroke-[3]" />}
        </button>

        {/* Stroller Accessible */}
        <button
          onClick={() => updateFilter('strollerAccessibleOnly', !filters.strollerAccessibleOnly)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
            filters.strollerAccessibleOnly
              ? 'bg-sky-100 border-sky-300 text-sky-900 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🛒 {t('filterStroller')}</span>
          {filters.strollerAccessibleOnly && <Check className="w-3 h-3 text-sky-700 stroke-[3]" />}
        </button>

        {/* High Chairs */}
        <button
          onClick={() => updateFilter('highChairsOnly', !filters.highChairsOnly)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
            filters.highChairsOnly
              ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🪑 {t('filterHighChairs')}</span>
          {filters.highChairsOnly && <Check className="w-3 h-3 text-amber-600 stroke-[3]" />}
        </button>

        {/* Distance Range */}
        <div className="ml-auto flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-sky-200 text-xs">
          <span className="text-slate-500 font-medium">{t('radiusLabel')}</span>
          <select
            value={filters.maxDistanceKm}
            onChange={(e) => updateFilter('maxDistanceKm', Number(e.target.value))}
            className="bg-transparent text-teal-700 font-bold focus:outline-none cursor-pointer"
          >
            <option value={2} className="bg-white text-slate-800">{t('radius2km')}</option>
            <option value={5} className="bg-white text-slate-800">{t('radius5km')}</option>
            <option value={10} className="bg-white text-slate-800">{t('radius10km')}</option>
            <option value={25} className="bg-white text-slate-800">{t('radius25km')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

