const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
  };
  types?: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export const getCurrentLocation = (): Promise<Location | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

export const getNearbyPlaces = async (
  lat: number,
  lng: number,
  radius: number = 1500,
  type: string = 'point_of_interest'
): Promise<PlaceResult[]> => {
  if (!GOOGLE_MAPS_API_KEY) {
    console.log('Google Maps API key not configured');
    return [];
  }

  try {
    // Using Google Places API via proxy or direct call
    // Note: For production, you should use a backend proxy to hide API key
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
    
    // Since we can't call Google Places API directly from browser (CORS),
    // we'll use the Places Service from @react-google-maps/api
    // This function is a placeholder for the actual implementation
    console.log('Fetching nearby places for:', { lat, lng, radius, type });
    
    return [];
  } catch (error) {
    console.log('Error fetching nearby places:', error);
    return [];
  }
};

export const getPlacePhoto = (photoReference: string, maxWidth: number = 400): string => {
  if (!GOOGLE_MAPS_API_KEY || !photoReference) {
    return '';
  }
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

export const searchPlaces = async (
  query: string,
  location: Location,
  radius: number = 5000
): Promise<PlaceResult[]> => {
  // Placeholder for text search
  console.log('Searching places:', { query, location, radius });
  return [];
};
