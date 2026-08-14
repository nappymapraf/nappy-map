export type PlaceCategory = 'bar' | 'pub' | 'cafe' | 'restaurant' | 'park' | 'other';

export type ChangingRoomType = 
  | 'gender_neutral' 
  | 'womens_only' 
  | 'mens_and_womens' 
  | 'family_restroom' 
  | 'none' 
  | 'unknown';

export interface ChangingRoomDetails {
  hasChangingTable: boolean;
  type: ChangingRoomType;
  hasDisposalBin: boolean;
  hasSinkInside: boolean;
  cleanlinessRating: number; // 1 to 5
  spaciousForStroller: boolean;
  locationNote?: string; // e.g. "In main accessible restroom on ground floor"
}

export interface ChildAmenities {
  highChairs: boolean;
  strollerAccessible: boolean;
  kidsMenu: boolean;
  nursingArea: boolean;
  playArea: boolean;
  outdoorSeating: boolean;
}

export interface ChangingRoomReport {
  id: string;
  placeId: string;
  authorName: string;
  date: string;
  hasChangingRoom: boolean;
  type: ChangingRoomType;
  cleanlinessRating: number;
  spaciousForStroller: boolean;
  hasDisposalBin: boolean;
  comment: string;
  isVerified?: boolean;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  userRatingsTotal: number;
  priceLevel?: number; // 1 to 4
  changingRoom: ChangingRoomDetails;
  childAmenities: ChildAmenities;
  verifiedCount: number;
  lastVerifiedDate?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  photoUrl?: string;
  distanceKm?: number;
  isUserAdded?: boolean;
}

export interface FilterState {
  category: string; // 'all' | 'bar' | 'pub' | 'cafe' | 'restaurant' | 'park'
  changingRoomOnly: boolean;
  genderNeutralOrMens: boolean;
  strollerAccessibleOnly: boolean;
  highChairsOnly: boolean;
  searchQuery: string;
  maxDistanceKm: number;
  minCleanliness: number;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
  name?: string;
}
