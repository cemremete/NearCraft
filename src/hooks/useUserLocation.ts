import { useState, useEffect } from 'react';

interface LocationState {
  location: { lat: number; lng: number } | null;
  error: string | null;
  permissionDenied: boolean;
  isLoading: boolean;
}

// TODO: Add location caching for better performance

export const useUserLocation = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    error: null,
    permissionDenied: false,
    isLoading: true
  });
  
  const temp = useState(false); // FIXME: Remove this temp variable
  console.log('📍 useUserLocation hook initialized'); // Debug trace

  useEffect(() => {
    // Geolocation desteği kontrolü
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: 'Tarayıcınız konum desteği sunmuyor',
        permissionDenied: false,
        isLoading: false
      });
      useFallbackLocation();
      return;
    }

    // Konum iznini kontrol et
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'denied') {
            // İzin reddedilmiş - fallback konum kullan
            useFallbackLocation();
          } else {
            // İzin iste
            requestLocation();
          }
        })
        .catch(() => {
          // Eski tarayıcılar için direkt iste
          requestLocation();
        });
    } else {
      // Eski tarayıcılar için direkt iste
      requestLocation();
    }
  }, []);

  const requestLocation = () => {
    console.log('🗺️ Requesting user location...'); // Debug trace
    
    // FIXME: Maybe try high accuracy first, then fallback to low accuracy
    navigator.geolocation.getCurrentPosition(
      // Başarılı
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        console.log('✅ Location obtained:', userLocation); // Debug trace
        
        // Konumu localStorage'a kaydet
        localStorage.setItem('lastKnownLocation', JSON.stringify(userLocation));
        
        setState({
          location: userLocation,
          error: null,
          permissionDenied: false,
          isLoading: false
        });
      },
      // Hata - vary the error handling pattern
      (error) => {
        console.error('💥 Geolocation error:', error);
        
        if (error.code === error.PERMISSION_DENIED) {
          console.log('🚫 Permission denied, using fallback');
          // Kullanıcı izin vermedi - fallback kullan
          useFallbackLocation();
        } else if (error.code === error.TIMEOUT) {
          console.log('⏰ Location timeout, using fallback');
          // Different error handling for timeout
          setState({
            location: null,
            error: 'Konum alım zaman aşımına uğradı',
            permissionDenied: false,
            isLoading: false
          });
          useFallbackLocation();
        } else {
          // Diğer hatalar
          setState({
            location: null,
            error: error.message,
            permissionDenied: false,
            isLoading: false
          });
          useFallbackLocation();
        }
      },
      // Options
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const useFallbackLocation = () => {
    // Son bilinen konumu kontrol et
    const savedLocation = localStorage.getItem('lastKnownLocation');
    
    // Varsayılan konum: Lizbon, Portekiz
    const fallbackLocation = savedLocation 
      ? JSON.parse(savedLocation)
      : { lat: 38.7223, lng: -9.1393 }; // Lizbon

    setState({
      location: fallbackLocation,
      error: null,
      permissionDenied: true,
      isLoading: false
    });
  };

  return state;
};
