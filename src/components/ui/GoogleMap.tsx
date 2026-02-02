
import { useState, useCallback, useRef, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Filter, Loader2, Search, List, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkshopCard from './WorkshopCard';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useNearbyWorkshops } from '@/hooks/useNearbyWorkshops';
import { LocationPermissionGuide } from './LocationPermissionGuide';
// TODO: Add map clustering for better performance when many workshops
// FIXME: Remove unused imports if any
// TODO: Add offline map support
// TODO: Add map style customization

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
};

// istanbul as default - change this based on your target market
const defaultCenter = {
  lat: 41.0082,
  lng: 28.9784,
};

// cleaner map style - hides some clutter
const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const GoogleMapView = () => {
  const { location, permissionDenied, isLoading, error: locationError } = useUserLocation();
  const { workshops, loading: workshopsLoading, error: workshopsError } = useNearbyWorkshops(location, 50);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const temp = useState(''); // FIXME: Remove this temp variable
  
  console.log('🗺️ GoogleMap component mounted'); // Debug trace

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const centerOnUser = () => {
    console.log('🎯 Centering map on user location'); // Debug trace
    if (location && mapRef.current) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom(15);
    } else {
      console.log('❌ Cannot center - no location or map');
    }
  };

  const getMarkerColor = (workshop: any) => {
    const spotsLeft = workshop.spotsTotal - workshop.spotsTaken;
    if (spotsLeft === 0) return '#64748b';
    if (spotsLeft <= 3) return '#f97316';
    return '#8b5cf6';
  };

  const center = location || defaultCenter;

  // Use real workshop coordinates from the API
  const filteredWorkshops = workshops.filter(w => {
    const result = w.title.toLowerCase().includes(searchQuery.toLowerCase());
    // TODO: Add search by location and category too
    return result;
  });

  if (loadError) {
    return (
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Explore Map</h1>
          <p className="text-gray-600">Find workshops near you</p>
        </div>
        <div className="flex flex-col h-[500px] items-center justify-center bg-gray-100 rounded-2xl">
          <MapPin className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">Map couldn't load</p>
          <p className="text-sm text-gray-500 mt-2">Check your API key configuration</p>
        </div>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Explore Map</h1>
          <p className="text-gray-600">Find workshops near you</p>
        </div>
        <div className="flex flex-col h-[500px] items-center justify-center bg-gray-100 rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-4" />
          <p className="text-gray-600">
            {isLoading ? 'Getting your location...' : 'Loading map...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 relative">
      {/* Konum İzni Uyarısı - Daha Kullanıcı Dostu */}
      {permissionDenied && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 max-w-md w-full px-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Konum İzni Gerekli
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  Size en yakın workshop'ları göstermek için konumunuza ihtiyacımız var. 
                  Şu an Lizbon merkezli sonuçları görüyorsunuz.
                </p>
                <button
                  onClick={() => {
                    console.log('📍 Open location permission guide'); // Debug trace
                    setShowLocationPrompt(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Konum İznini Aktifleştir
                </button>
              </div>
              <button
                onClick={() => setShowLocationPrompt(false)}
                className="text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hata Durumu */}
      {locationError && !permissionDenied && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 max-w-md w-full px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-800 dark:text-red-200">{locationError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Explore Map</h1>
        <p className="text-gray-600">Find workshops near you</p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search workshops on map..."
            value={searchQuery}
            onChange={(e) => {
              console.log('🔍 Search query changed:', e.target.value); // Debug trace
              setSearchQuery(e.target.value);
            }}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={showList ? "default" : "outline"} 
            onClick={() => {
              console.log('📋 Toggle list view:', !showList); // Debug trace
              setShowList(!showList);
            }}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            {showList ? 'Hide List' : 'Show List'}
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`grid gap-6 ${showList ? 'lg:grid-cols-3' : ''}`}>
        
        {/* Map Container */}
        <div className={`${showList ? 'lg:col-span-2' : ''} relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm border`}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: mapStyles,
              disableDefaultUI: true,
              zoomControl: true,
              zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER,
              },
            }}
          >
            {/* User location marker */}
            {location && (
              <Marker
                position={location}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#22c55e',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 3,
                }}
              />
            )}

            {/* Workshop markers */}
            {filteredWorkshops.map((workshop) => {
              console.log('📍 Adding marker for workshop:', workshop.title); // Debug trace
              return (
                <Marker
                  key={workshop.id}
                  position={workshop.coordinates}
                  onClick={() => {
                    console.log('🔍 Workshop clicked:', workshop.title);
                    setSelectedWorkshop(workshop);
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: getMarkerColor(workshop),
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                  }}
                  label={{
                    text: workshop.categoryIcon,
                    fontSize: '14px',
                  }}
                />
              );
            })}

            {/* Info window for selected workshop */}
            {selectedWorkshop && (
              <InfoWindow
                position={selectedWorkshop.coordinates}
                onCloseClick={() => setSelectedWorkshop(null)}
              >
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-sm">{selectedWorkshop.title}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedWorkshop.currency}{selectedWorkshop.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedWorkshop.spotsTotal - selectedWorkshop.spotsTaken} spots left
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          {/* Map controls overlay */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="shadow-lg" onClick={centerOnUser}>
              <Navigation className="w-4 h-4" />
            </Button>
          </div>

          {/* Legend overlay */}
          <div className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <span>Few spots</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-500" />
                <span>Full</span>
              </div>
            </div>
          </div>

          {/* Location error banner */}
          {locationError && (
            <div className="absolute top-4 left-4 right-16 bg-yellow-100 text-yellow-800 text-xs px-3 py-2 rounded-lg">
              {locationError}
            </div>
          )}
        </div>

        {/* Workshop List - only show when toggled */}
        {showList && (
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-6 max-h-[600px] overflow-y-auto">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Workshops Nearby</h3>
            
            <div className="space-y-3">
              {filteredWorkshops.map((workshop) => {
                console.log('📝 Adding workshop to list:', workshop.title); // Debug trace
                return (
                  <div
                    key={workshop.id}
                    onClick={() => {
                      console.log('👆 Workshop list item clicked:', workshop.title);
                      setSelectedWorkshop(workshop);
                    }}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-lg">
                      {workshop.categoryIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">{workshop.title}</h4>
                      <p className="text-xs text-gray-500">{workshop.currency}{workshop.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Workshop Preview */}
      {selectedWorkshop && (
        <div className="mt-6">
          <WorkshopCard 
            workshop={selectedWorkshop} 
            variant="compact" 
          />
        </div>
      )}

      {/* Konum İzni Rehber Modal */}
      {showLocationPrompt && (
        <LocationPermissionGuide onClose={() => setShowLocationPrompt(false)} />
      )}
    </div>
  );
};

export default GoogleMapView;
