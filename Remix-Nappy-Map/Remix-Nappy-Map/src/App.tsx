import React, { useState, useEffect, useMemo } from 'react';
import { Place, FilterState, ChangingRoomReport, LocationCoordinates } from './types';
import { DEFAULT_CITIES, INITIAL_PLACES, MOCK_REPORTS, calculateDistance, generatePlacesForLocation } from './data/mockPlaces';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PlaceCard } from './components/PlaceCard';
import { PlaceDetailDrawer } from './components/PlaceDetailDrawer';
import { MapView } from './components/MapView';
import { AddPlaceModal } from './components/AddPlaceModal';
import { AddReportModal } from './components/AddReportModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { InstallPwaModal } from './components/InstallPwaModal';
import { IconPreviewModal } from './components/IconPreviewModal';
import { Filter } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function App() {
  const { t } = useLanguage();

  // Location & City selection: Default to Ancona, Italy
  const [currentCityKey, setCurrentCityKey] = useState<string>('ancona');
  const [currentLocation, setCurrentLocation] = useState<LocationCoordinates>(DEFAULT_CITIES.ancona);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Auto-detect browser location on mount if available
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          const coords: LocationCoordinates = {
            lat: userLat,
            lng: userLng,
            name: 'Near Me (GPS Location)',
          };

          setCurrentCityKey('geolocation');
          setCurrentLocation(coords);
          setIsLocating(false);

          // Ensure local spots exist around user GPS coords
          const localSpots = generatePlacesForLocation(userLat, userLng);
          setPlaces((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newUnique = localSpots.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newUnique];
          });
        },
        (err) => {
          setIsLocating(false);
          console.log('GPS auto-locate unavailable, defaulting to Ancona, Italy', err);
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    }
  }, []);

  // Places & Reports state with LocalStorage persistence
  const [places, setPlaces] = useState<Place[]>(() => {
    const saved = localStorage.getItem('babyadvisor_user_places') || localStorage.getItem('parentspot_user_places');
    if (saved) {
      try {
        const userAdded: Place[] = JSON.parse(saved);
        return [...INITIAL_PLACES, ...userAdded];
      } catch (e) {
        console.error('Failed to parse saved places', e);
      }
    }
    return INITIAL_PLACES;
  });

  const [reports, setReports] = useState<Record<string, ChangingRoomReport[]>>(() => {
    const saved = localStorage.getItem('babyadvisor_user_reports') || localStorage.getItem('parentspot_user_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved reports', e);
      }
    }
    return MOCK_REPORTS;
  });

  // UI & View state
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split');
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState<boolean>(false);
  const [isAddReportOpen, setIsAddReportOpen] = useState<boolean>(false);
  const [reportTargetPlace, setReportTargetPlace] = useState<Place | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isInstallPwaOpen, setIsInstallPwaOpen] = useState<boolean>(false);
  const [isIconPreviewOpen, setIsIconPreviewOpen] = useState<boolean>(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    changingRoomOnly: true, // Default to showing places with baby changing table!
    genderNeutralOrMens: false,
    strollerAccessibleOnly: false,
    highChairsOnly: false,
    searchQuery: '',
    maxDistanceKm: 15,
    minCleanliness: 0,
  });

  // Update distances whenever center location changes
  const placesWithDistance = useMemo(() => {
    return places.map((place) => ({
      ...place,
      distanceKm: calculateDistance(currentLocation.lat, currentLocation.lng, place.lat, place.lng),
    }));
  }, [places, currentLocation]);

  // Handle City Selection
  const handleSelectCity = (key: string) => {
    if (key === 'geolocation') {
      handleUseGeolocation();
      return;
    }
    if (DEFAULT_CITIES[key]) {
      setCurrentCityKey(key);
      setCurrentLocation(DEFAULT_CITIES[key]);
      // Generate spots if needed
      const localSpots = generatePlacesForLocation(DEFAULT_CITIES[key].lat, DEFAULT_CITIES[key].lng);
      setPlaces((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newUnique = localSpots.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newUnique];
      });
    }
  };

  // Handle Search Custom Location
  const handleSearchCustomLocation = async (query: string) => {
    if (!query.trim()) return;
    setIsLocating(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const userLat = parseFloat(data[0].lat);
        const userLng = parseFloat(data[0].lon);
        const shortName = data[0].display_name.split(',').slice(0, 2).join(',');
        const coords: LocationCoordinates = {
          lat: userLat,
          lng: userLng,
          name: shortName,
        };

        setCurrentCityKey('custom');
        setCurrentLocation(coords);

        const localSpots = generatePlacesForLocation(userLat, userLng);
        setPlaces((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newUnique = localSpots.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });
      } else {
        alert(t('locationNotFound', { query }));
      }
    } catch (err) {
      console.error('Failed to search location', err);
      alert(t('locationNotFound', { query }));
    } finally {
      setIsLocating(false);
    }
  };

  // Handle Browser Geolocation
  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      alert(t('geoNotSupported'));
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const coords: LocationCoordinates = {
          lat: userLat,
          lng: userLng,
          name: 'Mia Posizione GPS',
        };

        setCurrentCityKey('geolocation');
        setCurrentLocation(coords);
        setIsLocating(false);

        // Ensure we have places nearby user's GPS coords
        const localSpots = generatePlacesForLocation(userLat, userLng);
        setPlaces((prev) => {
          // Merge avoiding duplicate IDs
          const existingIds = new Set(prev.map((p) => p.id));
          const newUnique = localSpots.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err);
        alert(t('geoErrorDefault'));
        handleSelectCity('ancona');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Filter Places
  const filteredPlaces = useMemo(() => {
    return placesWithDistance.filter((place) => {
      // Category
      if (filters.category !== 'all' && place.category !== filters.category) {
        return false;
      }

      // Changing Room Table requirement
      if (filters.changingRoomOnly && !place.changingRoom.hasChangingTable) {
        return false;
      }

      // Gender Neutral or Men's Accessible Changing Room
      if (filters.genderNeutralOrMens) {
        const type = place.changingRoom.type;
        const isAccessibleToDads =
          type === 'gender_neutral' ||
          type === 'mens_and_womens' ||
          type === 'family_restroom';
        if (!isAccessibleToDads) return false;
      }

      // Stroller Accessible
      if (
        filters.strollerAccessibleOnly &&
        (!place.childAmenities.strollerAccessible || !place.changingRoom.spaciousForStroller)
      ) {
        return false;
      }

      // High Chairs
      if (filters.highChairsOnly && !place.childAmenities.highChairs) {
        return false;
      }

      // Cleanliness
      if (place.changingRoom.cleanlinessRating < filters.minCleanliness) {
        return false;
      }

      // Max Distance
      if (place.distanceKm !== undefined && place.distanceKm > filters.maxDistanceKm) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(query);
        const matchesAddr = place.address.toLowerCase().includes(query);
        const matchesCat = place.category.toLowerCase().includes(query);
        const matchesNote = place.changingRoom.locationNote?.toLowerCase().includes(query);
        if (!matchesName && !matchesAddr && !matchesCat && !matchesNote) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [placesWithDistance, filters]);

  // Handlers for Adding Place & Adding Report
  const handleAddPlace = (newPlace: Place) => {
    const updated = [newPlace, ...places];
    setPlaces(updated);
    setSelectedPlace(newPlace);

    // Save user added places to localStorage
    const userPlaces = updated.filter((p) => p.isUserAdded);
    localStorage.setItem('babyadvisor_user_places', JSON.stringify(userPlaces));
  };

  const handleOpenReportForPlace = (place: Place) => {
    setReportTargetPlace(place);
    setIsAddReportOpen(true);
  };

  const handleAddReport = (report: ChangingRoomReport) => {
    const placeId = report.placeId;
    const existingReports = reports[placeId] || [];
    const updatedReports = [report, ...existingReports];

    const newReportsMap = { ...reports, [placeId]: updatedReports };
    setReports(newReportsMap);

    // Save to localStorage
    localStorage.setItem('babyadvisor_user_reports', JSON.stringify(newReportsMap));

    // Update place verified count
    setPlaces((prev) =>
      prev.map((p) => {
        if (p.id === placeId) {
          return {
            ...p,
            verifiedCount: p.verifiedCount + 1,
            lastVerifiedDate: report.date,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top App Navigation */}
      <Header
        currentCityKey={currentCityKey}
        onSelectCity={handleSelectCity}
        onUseGeolocation={handleUseGeolocation}
        isLocating={isLocating}
        onOpenAddPlace={() => setIsAddPlaceOpen(true)}
        hasApiKey={hasValidKey}
        onOpenApiKeyInfo={() => setIsApiKeyModalOpen(true)}
        onOpenInstallPwa={() => setIsInstallPwaOpen(true)}
        onOpenIconPreview={() => setIsIconPreviewOpen(true)}
        currentLocationName={currentLocation.name}
        onSearchCustomLocation={handleSearchCustomLocation}
      />

      {/* Filter & Search Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalResults={filteredPlaces.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {/* Left Column: Place Cards List (Visible in 'split' and 'list' view mode) */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <section
            className={`space-y-4 ${
              viewMode === 'list'
                ? 'lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-0'
                : 'lg:col-span-5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1'
            }`}
          >
            {filteredPlaces.length === 0 ? (
              <div className="col-span-full bg-white border border-sky-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{t('noPlacesMatch')}</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t('tryWidenSearch')}
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: 'all',
                      changingRoomOnly: false,
                      genderNeutralOrMens: false,
                      strollerAccessibleOnly: false,
                      highChairsOnly: false,
                      searchQuery: '',
                      maxDistanceKm: 25,
                      minCleanliness: 0,
                    })
                  }
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
                >
                  {t('resetFilters')}
                </button>
              </div>
            ) : (
              filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isSelected={selectedPlace?.id === place.id}
                  onSelect={(p) => setSelectedPlace(p)}
                  onOpenReportModal={handleOpenReportForPlace}
                />
              ))
            )}
          </section>
        )}

        {/* Right Column: Map View (Visible in 'split' and 'map' view mode) */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <section
            className={`sticky top-20 ${
              viewMode === 'map' ? 'lg:col-span-12 h-[calc(100vh-180px)]' : 'lg:col-span-7 h-[calc(100vh-180px)]'
            }`}
          >
            <MapView
              places={filteredPlaces}
              selectedPlace={selectedPlace}
              onSelectPlace={(p) => setSelectedPlace(p)}
              centerLat={currentLocation.lat}
              centerLng={currentLocation.lng}
              apiKey={API_KEY}
              hasValidKey={hasValidKey}
              onOpenReportModal={handleOpenReportForPlace}
            />
          </section>
        )}
      </main>

      {/* Selected Place Details Drawer */}
      <PlaceDetailDrawer
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        reports={selectedPlace ? reports[selectedPlace.id] || [] : []}
        onOpenReportModal={handleOpenReportForPlace}
      />

      {/* Modals */}
      <AddPlaceModal
        isOpen={isAddPlaceOpen}
        onClose={() => setIsAddPlaceOpen(false)}
        onAddPlace={handleAddPlace}
        userLat={currentLocation.lat}
        userLng={currentLocation.lng}
      />

      <AddReportModal
        place={reportTargetPlace}
        isOpen={isAddReportOpen}
        onClose={() => {
          setIsAddReportOpen(false);
          setReportTargetPlace(null);
        }}
        onSubmitReport={handleAddReport}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        hasApiKey={hasValidKey}
      />

      <InstallPwaModal
        isOpen={isInstallPwaOpen}
        onClose={() => setIsInstallPwaOpen(false)}
      />

      <IconPreviewModal
        isOpen={isIconPreviewOpen}
        onClose={() => setIsIconPreviewOpen(false)}
      />
    </div>
  );
}

