import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react'; // FIXME: Remove later if not used
import icon from '../../assets/icon.png'; // icon.png dosyasını import et
// TODO: Add analytics tracking for button clicks

// this is the main landing page - tried to make it look like flexsoul
const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const result = useState(null); // FIXME: Remove this temp variable
  console.log('🏠 Home page loaded'); // Debug trace

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-[#1a1625]">
      
      {/* Hero Section - Flexsoul style solid background */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-purple-50 dark:bg-[#1a1625]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
              {t('home')},
              <br />
              {t('discoverWorkshops')}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  console.log('🚀 Get Started button clicked'); // Debug trace
                  navigate('/signup');
                }}
                className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  console.log('� Sign In button clicked'); // Debug trace
                  navigate('/login');
                }}
                className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
              >
                Sign In
              </button>
            </div>

            {/* Social proof - these numbers are kinda made up for now lol */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-sm">👩</div>
                <div className="w-10 h-10 rounded-full bg-purple-300 border-2 border-white flex items-center justify-center text-sm">👨</div>
                <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-sm">👩‍🦰</div>
                <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">+99</div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="font-semibold text-gray-900 dark:text-white">1,000+ {t('students')}</p>
                <p>{t('startJourney')}</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-purple-200">
              <img 
                src={icon} 
                alt="NearCraft Icon" 
                className="w-full h-full object-contain p-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/600/600';
                }}
                              />
            </div>
            {/* floating card thing */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">4.9 {t('rating')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">500+ {t('reviews')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-purple-50 dark:bg-[#1a1625]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {t('uncoverSoulful')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              <span className="italic">{t('essenceOfCrafts')}</span> <span className="font-semibold">{t('withNearCraft')}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-purple-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('findNearbyWorkshops')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('findNearbyWorkshopsDesc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-purple-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('bookEventsEasily')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('bookEventsEasilyDesc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('connectWithCommunity')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('connectWithCommunityDesc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-purple-700 dark:bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-purple-200 text-lg">Active Workshops</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-purple-200 text-lg">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-purple-200 text-lg">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-purple-200 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Categories - quick preview */}
      <section className="py-24 bg-purple-50 dark:bg-[#1a1625]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Popular Categories</h2>
              <p className="text-gray-600">Explore workshops by category</p>
            </div>
            <button 
              onClick={() => navigate('/workshops')}
              className="hidden md:flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: '🎨', name: 'Painting', count: 45 },
              { icon: '🏺', name: 'Pottery', count: 32 },
              { icon: '🕯️', name: 'Candles', count: 28 },
              { icon: '🧵', name: 'Sewing', count: 24 },
              { icon: '🌸', name: 'Floristry', count: 19 },
              { icon: '📸', name: 'Photography', count: 15 },
            ].map((cat) => (
              <div 
                key={cat.name}
                onClick={() => navigate('/workshops')}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} workshops</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-purple-50 dark:bg-[#1a1625]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            {t('readyToStart')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('joinThousands')}
          </p>
          <button 
            onClick={() => navigate('/workshops')}
            className="px-10 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('exploreWorkshopsNow')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0a1a] dark:bg-[#0a0612] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✨</span>
                </div>
                <span className="text-xl font-serif font-bold">NearCraft</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footerTagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('explore')}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/workshops" className="hover:text-white transition-colors">{t('workshops')}</a></li>
                <li><a href="/map" className="hover:text-white transition-colors">{t('map')}</a></li>
                <li><a href="/events" className="hover:text-white transition-colors">{t('events')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t('aboutUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('careers')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('legal')}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('termsOfService')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 NearCraft. {t('allRightsReserved')}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
