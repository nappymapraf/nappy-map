import { Place, ChangingRoomReport, LocationCoordinates } from '../types';

export const DEFAULT_CITIES: Record<string, LocationCoordinates> = {
  'ancona': { lat: 43.6158, lng: 13.5189, name: 'Ancona, Italy 🇮🇹' },
  'rome': { lat: 41.9028, lng: 12.4964, name: 'Rome, Italy 🇮🇹' },
  'milan': { lat: 45.4642, lng: 9.1900, name: 'Milan, Italy 🇮🇹' },
  'london': { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
  'san_francisco': { lat: 37.7749, lng: -122.4194, name: 'San Francisco, CA' },
  'new_york': { lat: 40.7128, lng: -74.0060, name: 'New York, NY' },
  'berlin': { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
  'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
};

export const INITIAL_PLACES: Place[] = [
  // --- ANCONA (ITALY) PLACES ---
  {
    id: 'anc-1',
    name: 'Caffè del Teatro & Bistro Bar',
    category: 'bar',
    address: 'Piazza della Repubblica 1, 60121 Ancona AN, Italy',
    lat: 43.6180,
    lng: 13.5115,
    rating: 4.8,
    userRatingsTotal: 310,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.9,
      spaciousForStroller: true,
      locationNote: 'Bagno accessibile al piano terra vicino al foyer del Teatro delle Muse. Fasciatoio ribaltabile pulito e spazioso.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 52,
    lastVerifiedDate: '2026-08-11',
    phone: '+39 071 207 4321',
    website: 'https://example.com/caffe-teatro-ancona',
    openingHours: 'Mon-Sun: 07:30 AM - 11:30 PM',
    photoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'anc-2',
    name: 'L\'Ippocampo Bar & Lounge Passetto',
    category: 'bar',
    address: 'Piazza IV Novembre 1, 60123 Ancona AN, Italy',
    lat: 43.6190,
    lng: 13.5285,
    rating: 4.7,
    userRatingsTotal: 480,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'family_restroom',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.8,
      spaciousForStroller: true,
      locationNote: 'Servizio igienico dedicato alle famiglie con fasciatoio, scalda-biberon e spazio abbondante per passeggino doppio.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: true,
      outdoorSeating: true,
    },
    verifiedCount: 64,
    lastVerifiedDate: '2026-08-09',
    phone: '+39 071 33210',
    openingHours: 'Mon-Sun: 08:00 AM - 12:00 AM',
    photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'anc-3',
    name: 'Birrificio Artigianale Dorico (Taproom)',
    category: 'pub',
    address: 'Corso Giuseppe Garibaldi 45, 60121 Ancona AN, Italy',
    lat: 43.6165,
    lng: 13.5150,
    rating: 4.6,
    userRatingsTotal: 290,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'mens_and_womens',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.6,
      spaciousForStroller: true,
      locationNote: 'Fasciatoio murale a ribalta installato nei bagni accessibili sia uomini che donne. Molto pulito.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: false,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 38,
    lastVerifiedDate: '2026-08-04',
    phone: '+39 071 54321',
    openingHours: 'Mon-Sun: 12:00 PM - 01:00 AM',
    photoUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'anc-4',
    name: 'Caffè Papa\'s & Family Corner',
    category: 'cafe',
    address: 'Piazza del Plebiscito 12, 60121 Ancona AN, Italy',
    lat: 43.6175,
    lng: 13.5135,
    rating: 4.9,
    userRatingsTotal: 520,
    priceLevel: 1,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 5.0,
      spaciousForStroller: true,
      locationNote: 'Stanza cambio bimbi privata e sanificata continuamente con salviette umidificate e fasciatoio imbottito.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: true,
      outdoorSeating: true,
    },
    verifiedCount: 78,
    lastVerifiedDate: '2026-08-12',
    phone: '+39 071 22890',
    openingHours: 'Mon-Sat: 07:00 AM - 09:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'anc-5',
    name: 'Bar Rosa & Gelateria Porto Antico',
    category: 'bar',
    address: 'Molo Santa Maria, Porto Antico, 60121 Ancona AN, Italy',
    lat: 43.6210,
    lng: 13.5090,
    rating: 4.5,
    userRatingsTotal: 360,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'family_restroom',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.5,
      spaciousForStroller: true,
      locationNote: 'Bagno spazioso sul porto storico di Ancona con fasciatoio e lavandino abbassato per bimbi.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 42,
    lastVerifiedDate: '2026-08-02',
    phone: '+39 071 88901',
    openingHours: 'Mon-Sun: 08:00 AM - 11:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80',
  },
  // --- LONDON PLACES ---
  {
    id: 'ldn-1',
    name: 'The Crown & Anchor Family Pub',
    category: 'pub',
    address: '142 Neal Street, Covent Garden, London WC2H 9QG',
    lat: 51.5145,
    lng: -0.1260,
    rating: 4.6,
    userRatingsTotal: 342,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.8,
      spaciousForStroller: true,
      locationNote: 'Spacious dedicated family restroom on ground floor next to bar entrance.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 48,
    lastVerifiedDate: '2026-08-01',
    phone: '+44 20 7836 4739',
    website: 'https://example.com/crown-anchor',
    openingHours: 'Mon-Sun: 11:30 AM - 11:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ldn-2',
    name: 'BrewDog Soho & Craft Tap',
    category: 'bar',
    address: '21 Poland St, Soho, London W1F 8QG',
    lat: 51.5148,
    lng: -0.1382,
    rating: 4.4,
    userRatingsTotal: 820,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'mens_and_womens',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.2,
      spaciousForStroller: true,
      locationNote: 'Fold-down changing stations inside BOTH men and women accessible restrooms.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: false,
      playArea: false,
      outdoorSeating: false,
    },
    verifiedCount: 31,
    lastVerifiedDate: '2026-07-28',
    phone: '+44 20 7287 9012',
    website: 'https://example.com/brewdog-soho',
    openingHours: 'Mon-Sun: 12:00 PM - 12:00 AM',
    photoUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ldn-3',
    name: 'The Riverfront Cafe & Bar',
    category: 'bar',
    address: 'BFI Southbank, Belvedere Rd, London SE1 8XT',
    lat: 51.5065,
    lng: -0.1158,
    rating: 4.5,
    userRatingsTotal: 512,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'family_restroom',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.7,
      spaciousForStroller: true,
      locationNote: 'Large unisex family changing room with plush nursing chair and hot water sink.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: true,
      outdoorSeating: true,
    },
    verifiedCount: 62,
    lastVerifiedDate: '2026-08-05',
    phone: '+44 20 7928 3232',
    website: 'https://example.com/riverfront-bar',
    openingHours: 'Mon-Sun: 10:00 AM - 11:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ldn-4',
    name: 'The Old Thameside Inn',
    category: 'pub',
    address: 'Pickfords Wharf, Clink St, London SE1 9DG',
    lat: 51.5068,
    lng: -0.0910,
    rating: 4.2,
    userRatingsTotal: 640,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'womens_only',
      hasDisposalBin: true,
      hasSinkInside: false,
      cleanlinessRating: 3.8,
      spaciousForStroller: false,
      locationNote: 'Fold-down wall unit inside women restroom stall. Tight space for twin strollers.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: false,
      kidsMenu: true,
      nursingArea: false,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 19,
    lastVerifiedDate: '2026-06-14',
    phone: '+44 20 7403 4243',
    photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ldn-5',
    name: 'Dishoom King\'s Cross (Bar & Verandah)',
    category: 'restaurant',
    address: '5 Stable St, Kings Cross, London N1C 4AB',
    lat: 51.5360,
    lng: -0.1251,
    rating: 4.8,
    userRatingsTotal: 1420,
    priceLevel: 3,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.9,
      spaciousForStroller: true,
      locationNote: 'Immaculate gender-neutral accessible room with complimentary wipes & sanitizers.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 89,
    lastVerifiedDate: '2026-08-10',
    phone: '+44 20 7420 9321',
    photoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  },

  // --- SAN FRANCISCO PLACES ---
  {
    id: 'sf-1',
    name: 'Spark Social SF & Beer Garden',
    category: 'bar',
    address: '601 Mission Bay Boulevard North, San Francisco, CA 94158',
    lat: 37.7712,
    lng: -122.3912,
    rating: 4.7,
    userRatingsTotal: 1850,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'family_restroom',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.8,
      spaciousForStroller: true,
      locationNote: 'Permanent restroom trailers with air conditioning and dual changing tables.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: true,
      playArea: true,
      outdoorSeating: true,
    },
    verifiedCount: 112,
    lastVerifiedDate: '2026-08-08',
    phone: '+1 415 655 9223',
    website: 'https://sparksocialsf.com',
    openingHours: 'Mon-Sun: 11:00 AM - 9:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sf-2',
    name: 'Barebottle Brewing Company',
    category: 'bar',
    address: '1525 Cortland Ave, San Francisco, CA 94110',
    lat: 37.7398,
    lng: -122.4088,
    rating: 4.6,
    userRatingsTotal: 920,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'mens_and_womens',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.6,
      spaciousForStroller: true,
      locationNote: 'Sturdy Koala Kare changing tables inside all individual gender-neutral restrooms.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: false,
      nursingArea: false,
      playArea: true,
      outdoorSeating: true,
    },
    verifiedCount: 74,
    lastVerifiedDate: '2026-08-02',
    phone: '+1 415 926 8619',
    website: 'https://barebottle.com',
    openingHours: 'Mon-Sun: 12:00 PM - 10:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sf-3',
    name: 'Fort Point Beer Co. - Ferry Building',
    category: 'bar',
    address: '1 Ferry Building #54, San Francisco, CA 94111',
    lat: 37.7955,
    lng: -122.3937,
    rating: 4.5,
    userRatingsTotal: 730,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.5,
      spaciousForStroller: true,
      locationNote: 'Ferry Building main restrooms nearby feature spotless family changing suites.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: false,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 52,
    lastVerifiedDate: '2026-07-29',
    phone: '+1 415 906 2082',
    photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sf-4',
    name: 'The Monk\'s Kettle',
    category: 'pub',
    address: '3141 16th St, San Francisco, CA 94103',
    lat: 37.7647,
    lng: -122.4231,
    rating: 4.4,
    userRatingsTotal: 610,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.3,
      spaciousForStroller: false,
      locationNote: 'Changing station installed in back unisex bathroom. High demand during dinner hours.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: false,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 29,
    lastVerifiedDate: '2026-07-15',
    phone: '+1 415 865 9523',
    photoUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80',
  },

  // --- NEW YORK PLACES ---
  {
    id: 'ny-1',
    name: 'Brooklyn Brewery Taproom',
    category: 'bar',
    address: '79 N 11th St, Brooklyn, NY 11249',
    lat: 40.7217,
    lng: -73.9577,
    rating: 4.6,
    userRatingsTotal: 1540,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'mens_and_womens',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.4,
      spaciousForStroller: true,
      locationNote: 'Spacious taproom with changing tables in both men and women restrooms.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: false,
      nursingArea: false,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 65,
    lastVerifiedDate: '2026-08-03',
    phone: '+1 718 486 7422',
    photoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ny-2',
    name: 'Radegast Hall & Beer Garden',
    category: 'pub',
    address: '113 N 3rd St, Brooklyn, NY 11249',
    lat: 40.7166,
    lng: -73.9616,
    rating: 4.5,
    userRatingsTotal: 1200,
    priceLevel: 2,
    changingRoom: {
      hasChangingTable: true,
      type: 'gender_neutral',
      hasDisposalBin: true,
      hasSinkInside: true,
      cleanlinessRating: 4.1,
      spaciousForStroller: true,
      locationNote: 'Large hall with wide doors and accessible restroom equipped with changing table.'
    },
    childAmenities: {
      highChairs: true,
      strollerAccessible: true,
      kidsMenu: true,
      nursingArea: false,
      playArea: false,
      outdoorSeating: true,
    },
    verifiedCount: 44,
    lastVerifiedDate: '2026-07-22',
    phone: '+1 718 963 3973',
    photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
  }
];

export const MOCK_REPORTS: Record<string, ChangingRoomReport[]> = {
  'anc-1': [
    {
      id: 'rep-anc-1',
      placeId: 'anc-1',
      authorName: 'Marco B. (Papà di Giulia)',
      date: '2026-08-11',
      hasChangingRoom: true,
      type: 'gender_neutral',
      cleanlinessRating: 5,
      spaciousForStroller: true,
      hasDisposalBin: true,
      comment: 'Super consigliato ad Ancona per aperitivo con passeggino! Bagno al piano terra grandissimo, fasciatoio perfetto e pulito.',
      isVerified: true
    }
  ],
  'anc-4': [
    {
      id: 'rep-anc-2',
      placeId: 'anc-4',
      authorName: 'Elena & Piccolo Leo',
      date: '2026-08-12',
      hasChangingRoom: true,
      type: 'gender_neutral',
      cleanlinessRating: 5,
      spaciousForStroller: true,
      hasDisposalBin: true,
      comment: 'Il miglior locale baby friendly in centro ad Ancona in Piazza del Plebiscito. Salviettine e fasciatoio imbottito disponibili!',
      isVerified: true
    }
  ],
  'ldn-1': [
    {
      id: 'rep-1',
      placeId: 'ldn-1',
      authorName: 'Sarah M. (Mom of 2)',
      date: '2026-08-01',
      hasChangingRoom: true,
      type: 'gender_neutral',
      cleanlinessRating: 5,
      spaciousForStroller: true,
      hasDisposalBin: true,
      comment: 'Super spacious bathroom! Easily parked our double stroller inside while changing our 8-month-old. Very clean with sanitizer available.',
      isVerified: true
    },
    {
      id: 'rep-2',
      placeId: 'ldn-1',
      authorName: 'David K. (Dad)',
      date: '2026-07-18',
      hasChangingRoom: true,
      type: 'gender_neutral',
      cleanlinessRating: 4,
      spaciousForStroller: true,
      hasDisposalBin: true,
      comment: 'As a dad, I really appreciate that the changing room is gender neutral and accessible to men. Staff were super friendly too.',
      isVerified: true
    }
  ],
  'sf-1': [
    {
      id: 'rep-3',
      placeId: 'sf-1',
      authorName: 'Elena & Baby Leo',
      date: '2026-08-08',
      hasChangingRoom: true,
      type: 'family_restroom',
      cleanlinessRating: 5,
      spaciousForStroller: true,
      hasDisposalBin: true,
      comment: 'Best spot in SF for drinks with kids! Restroom trailers are clean, cooled, and have sturdy changing stations.',
      isVerified: true
    }
  ]
};

// Calculate Haversine distance in kilometers
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Helper to generate dynamic mock places centered near user coordinates if user is elsewhere
export function generatePlacesForLocation(userLat: number, userLng: number): Place[] {
  // Check if existing list has places within 25km
  const existingWithDistance = INITIAL_PLACES.map(p => ({
    ...p,
    distanceKm: calculateDistance(userLat, userLng, p.lat, p.lng)
  }));

  const nearbyCount = existingWithDistance.filter(p => (p.distanceKm || 999) <= 25).length;
  if (nearbyCount >= 3) {
    return existingWithDistance;
  }

  // Check if user is near Italy (roughly 36-47 lat, 6-19 lon)
  const isItaly = userLat >= 36 && userLat <= 47 && userLng >= 6 && userLng <= 19;

  const names = isItaly
    ? [
        { name: 'Caffè & Bar della Piazza', cat: 'cafe' },
        { name: 'Birrerie & Lounge del Corso', cat: 'pub' },
        { name: 'Osteria & Bar Famiglia', cat: 'restaurant' },
        { name: 'Gelateria & Bar del Porto', cat: 'bar' },
        { name: 'Trattoria & Bistro Bimbi', cat: 'restaurant' },
        { name: 'Café & Taproom San Ciriaco', cat: 'pub' },
      ]
    : [
        { name: 'The Hop & Stroller Family Taproom', cat: 'bar' },
        { name: 'Little Explorers Craft Beer & Cafe', cat: 'cafe' },
        { name: 'The Starlight Gastropub', cat: 'pub' },
        { name: 'Cornerstone Family Lounge & Bar', cat: 'bar' },
        { name: 'Bistro & Playroom Garden', cat: 'restaurant' },
        { name: 'The Timber & Barrel Pub', cat: 'pub' },
      ];

  const generated: Place[] = names.map((item, idx) => {
    // Generate slight offset (approx 0.3 - 2.5 km)
    const latOffset = (Math.random() - 0.5) * 0.025;
    const lngOffset = (Math.random() - 0.5) * 0.025;
    const pLat = userLat + latOffset;
    const pLng = userLng + lngOffset;
    const dist = calculateDistance(userLat, userLng, pLat, pLng);

    return {
      id: `gen-${idx + 1}`,
      name: item.name,
      category: item.cat as any,
      address: isItaly
        ? `Via Roma / Centro, Vicino a (${userLat.toFixed(3)}, ${userLng.toFixed(3)})`
        : `Near ${userLat.toFixed(3)}, ${userLng.toFixed(3)} - Spot #${idx + 1}`,
      lat: pLat,
      lng: pLng,
      rating: Math.round((4.3 + Math.random() * 0.6) * 10) / 10,
      userRatingsTotal: Math.floor(40 + Math.random() * 300),
      priceLevel: Math.floor(1 + Math.random() * 3),
      changingRoom: {
        hasChangingTable: idx !== 4, // 5 out of 6 have changing room
        type: idx % 2 === 0 ? 'gender_neutral' : 'mens_and_womens',
        hasDisposalBin: true,
        hasSinkInside: true,
        cleanlinessRating: Math.round((4.0 + Math.random() * 0.9) * 10) / 10,
        spaciousForStroller: idx % 3 !== 0,
        locationNote: isItaly
          ? 'Fasciatoio pieghevole a muro installato nel bagno unisex accessibile ai genitori.'
          : 'Fold-down wall changing unit in main accessible/unisex restroom.'
      },
      childAmenities: {
        highChairs: true,
        strollerAccessible: true,
        kidsMenu: idx % 2 === 0,
        nursingArea: idx === 0,
        playArea: idx === 1,
        outdoorSeating: true,
      },
      verifiedCount: Math.floor(12 + Math.random() * 45),
      lastVerifiedDate: '2026-08-01',
      distanceKm: dist,
      photoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    };
  });

  return [...existingWithDistance, ...generated];
}
