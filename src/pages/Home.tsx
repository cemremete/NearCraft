import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import candleImg from '../../assets/workshop-candle (1).jpg';
import potteryImg from '../../assets/workshop-pottery.jpg';
import paintingImg from '../../assets/workshop-painting.jpg';

// TODO: Maybe add real-time updates for workshop availability later
// FIXME: This hardcoded data should come from API - temp solution for demo

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const temp = useState(null); // FIXME: Remove this temp variable later
  
  console.log('🏠 Home component loaded - user dashboard'); // Debug trace
  
  // Old approach was using static data, keeping this for reference
  // const oldWorkshops = [1, 2, 3]; // This was inefficient, switched to dynamic
  
  return (
    <div className="min-h-screen bg-background pt-20"> {/* pt-20 navbar ile çakışmayı önler */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing workshops near you
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => {
              console.log('🔍 Browse workshops clicked'); // Debug trace
              navigate('/workshops');
            }}
            className="bg-card hover:bg-accent border rounded-2xl p-6 text-left transition-all group"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Browse Workshops</h3>
            <p className="text-muted-foreground">Explore creative workshops in your area</p>
          </button>

          <button
            onClick={() => {
              console.log('📍 Map view clicked'); // Debug trace
              navigate('/map');
            }}
            className="bg-card hover:bg-accent border rounded-2xl p-6 text-left transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Map View</h3>
            <p className="text-muted-foreground">Find workshops on the map</p>
          </button>

          <button
            onClick={() => {
              console.log('📅 Events clicked'); // Debug trace
              navigate('/events');
            }}
            className="bg-card hover:bg-accent border rounded-2xl p-6 text-left transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Upcoming Events</h3>
            <p className="text-muted-foreground">See what's happening soon</p>
          </button>
        </div>

        {/* Featured Workshops */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-serif font-bold text-foreground">Featured Workshops</h2>
            <button
              onClick={() => navigate('/workshops')}
              className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  console.log(`🎨 Workshop ${i} clicked - ${['Artisan Candle Making', 'Pottery Wheel Class', 'Creative Painting'][i - 1]}`); // Debug trace
                  navigate('/workshops');
                }}
              >
                {/* Workshop Image - Gerçek resimler */}
                <div className="h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={[candleImg, potteryImg, paintingImg][i - 1]} 
                    alt={['Artisan Candle Making', 'Pottery Wheel Class', 'Creative Painting'][i - 1]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.log(`❌ Failed to load image for workshop ${i}`); // Debug trace
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/400/300';
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-foreground">4.9</span>
                    <span className="text-sm text-muted-foreground">(120 reviews)</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {['Artisan Candle Making', 'Pottery Wheel Class', 'Creative Painting'][i - 1]}
                  </h3>
                  <p className="text-muted-foreground mb-4">Learn amazing skills with local artisans</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">$45</span>
                    <span className="text-sm text-muted-foreground">2 hours</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
              <div className="text-muted-foreground">Active Workshops</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">1000+</div>
              <div className="text-muted-foreground">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
