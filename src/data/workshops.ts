// using placeholder images for now, swap these out later
const workshopCandle = 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop';
const workshopPottery = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop';
const workshopSewing = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop';
const workshopPainting = 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop';

export interface Workshop {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryIcon: string;
  image: string;
  price: number;
  currency: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  distance: string;
  spotsTotal: number;
  spotsTaken: number;
  hostName: string;
  hostRating: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  coordinates: { lat: number; lng: number };
}

export const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Artisan Candle Making',
    description: 'Learn the art of creating beautiful scented candles with natural ingredients',
    category: 'candles',
    categoryIcon: '🕯️',
    image: workshopCandle,
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
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: '2',
    title: 'Pottery Wheel Experience',
    description: 'Hands-on pottery class where you\'ll create your own ceramic piece',
    category: 'pottery',
    categoryIcon: '🏺',
    image: workshopPottery,
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
    coordinates: { lat: 40.7158, lng: -74.009 },
  },
  {
    id: '3',
    title: 'Embroidery Basics',
    description: 'Master the fundamentals of embroidery and create a beautiful hoop art',
    category: 'sewing',
    categoryIcon: '🧵',
    image: workshopSewing,
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
    coordinates: { lat: 40.7108, lng: -74.003 },
  },
  {
    id: '4',
    title: 'Abstract Painting Workshop',
    description: 'Express yourself through colors and create your own abstract masterpiece',
    category: 'painting',
    categoryIcon: '🎨',
    image: workshopPainting,
    price: 55,
    currency: '$',
    date: '2026-01-28',
    time: '18:00',
    duration: '2h',
    location: 'Art Loft Gallery',
    distance: '1.8 km',
    spotsTotal: 15,
    spotsTaken: 12,
    hostName: 'James Rivera',
    hostRating: 4.9,
    level: 'all',
    coordinates: { lat: 40.7148, lng: -74.012 },
  },
];

export const categories = [
  { id: 'all', key: 'allCategories', icon: '✨' },
  { id: 'candles', key: 'candles', icon: '🕯️' },
  { id: 'sewing', key: 'sewing', icon: '🧵' },
  { id: 'perfume', key: 'perfume', icon: '🌸' },
  { id: 'dance', key: 'dance', icon: '💃' },
  { id: 'pottery', key: 'pottery', icon: '🏺' },
  { id: 'painting', key: 'painting', icon: '🎨' },
  { id: 'baking', key: 'baking', icon: '🍰' },
  { id: 'photography', key: 'photography', icon: '📸' },
  { id: 'calligraphy', key: 'calligraphy', icon: '✍️' },
  { id: 'botanical', key: 'botanical', icon: '🌿' },
  { id: 'yoga', key: 'yoga', icon: '🧘' },
  { id: 'macrame', key: 'macrame', icon: '🪡' },
];
