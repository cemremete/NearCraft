import { useState, useEffect } from 'react';
import { Workshop } from '@/data/workshops';
// TODO: Add real API integration with error handling
// FIXME: Add loading states for better UX

// Mock API call - gerçek API'ye geçişte bu fonksiyonu güncelle
const fetchNearbyWorkshops = async (
  userLocation: {lat: number, lng: number},
  radius: number = 50
): Promise<Workshop[]> => {
  console.log('🔍 Fetching nearby workshops for location:', userLocation); // Debug trace
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Haversine formula ile mesafe hesapla
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Mock workshops verilerine gerçek koordinatlar ekle
  const mockWorkshops: Workshop[] = [
    {
      id: '1',
      title: 'Artisan Candle Making',
      description: 'Learn the art of creating beautiful scented candles with natural ingredients',
      category: 'candles',
      categoryIcon: '🕯️',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop',
      price: 45,
      currency: '$',
      date: '2026-01-25',
      time: '14:00',
      duration: '2h',
      location: 'Creative Studio, Downtown',
      distance: '1.2 km',
      spotsTotal: 12,
      spotsTaken: 8,
      hostName: 'Emma Wilson',
      hostRating: 4.9,
      level: 'beginner',
      coordinates: { lat: 45.4642, lng: 9.1900 }
    },
    {
      id: '2',
      title: 'Pottery Wheel Experience',
      description: 'Hands-on pottery class where you\'ll create your own ceramic piece',
      category: 'pottery',
      categoryIcon: '🏺',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop',
      price: 65,
      currency: '$',
      date: '2026-01-26',
      time: '10:00',
      duration: '3h',
      location: 'Clay Arts Center',
      distance: '2.5 km',
      spotsTotal: 8,
      spotsTaken: 5,
      hostName: 'Michael Chen',
      hostRating: 4.8,
      level: 'all',
      coordinates: { lat: 45.4700, lng: 9.1850 }
    },
    {
      id: '3',
      title: 'Embroidery Basics',
      description: 'Master the fundamentals of embroidery and create a beautiful hoop art',
      category: 'sewing',
      categoryIcon: '🧵',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      price: 35,
      currency: '$',
      date: '2026-01-27',
      time: '16:00',
      duration: '2.5h',
      location: 'Textile Hub',
      distance: '0.8 km',
      spotsTotal: 10,
      spotsTaken: 10,
      hostName: 'Sofia Martinez',
      hostRating: 4.7,
      level: 'beginner',
      coordinates: { lat: 45.4580, lng: 9.1920 }
    },
    {
      id: '4',
      title: 'Abstract Painting Workshop',
      description: 'Express yourself through colors and create your own abstract masterpiece',
      category: 'painting',
      categoryIcon: '🎨',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
      price: 55,
      currency: '$',
      date: '2026-01-28',
      time: '11:00',
      duration: '3h',
      location: 'Art Studio',
      distance: '3.2 km',
      spotsTotal: 15,
      spotsTaken: 7,
      hostName: 'Laura Rossi',
      hostRating: 4.6,
      level: 'intermediate',
      coordinates: { lat: 45.4800, lng: 9.1800 }
    },
    {
      id: '5',
      title: 'Italian Cooking Class',
      description: 'Learn authentic Italian recipes from a professional chef',
      category: 'cooking',
      categoryIcon: '🍝',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      price: 75,
      currency: '$',
      date: '2026-01-29',
      time: '18:00',
      duration: '4h',
      location: 'Culinary School',
      distance: '1.8 km',
      spotsTotal: 8,
      spotsTaken: 6,
      hostName: 'Marco Bianchi',
      hostRating: 4.9,
      level: 'all',
      coordinates: { lat: 45.4620, lng: 9.1950 }
    }
  ];

  // Mesafe içindeki workshop'ları filtrele
  const nearbyWorkshops = mockWorkshops.filter(workshop => {
    const distance = calculateDistance(
      userLocation.lat, 
      userLocation.lng, 
      workshop.coordinates.lat, 
      workshop.coordinates.lng
    );
    return distance <= radius;
  }).map(workshop => ({
    ...workshop,
    distance: `${calculateDistance(
      userLocation.lat, 
      userLocation.lng, 
      workshop.coordinates.lat, 
      workshop.coordinates.lng
    ).toFixed(1)} km`
  }));

  return nearbyWorkshops;
};

export const useNearbyWorkshops = (
  location: {lat: number, lng: number} | null,
  radius: number = 50
) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const temp = useState(''); // FIXME: Remove this temp variable

  useEffect(() => {
    if (!location) {
      console.log('📍 No location provided, skipping workshop fetch');
      return;
    }

    const fetchWorkshops = async () => {
      try {
        console.log('🔄 Starting workshop fetch...');
        setLoading(true);
        setError(null);
        const nearbyWorkshops = await fetchNearbyWorkshops(location, radius);
        console.log('✅ Workshops fetched:', nearbyWorkshops.length);
        setWorkshops(nearbyWorkshops);
      } catch (err) {
        // Vary the error handling pattern
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch workshops';
        setError(errorMessage);
        console.error('💥 Failed to fetch workshops:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [location, radius]);

  return { workshops, loading, error };
};
