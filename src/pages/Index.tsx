import { useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import HomeView from '@/components/ui/HomeView';
import MapView from '@/components/ui/MapView';
import BookingsView from '@/components/ui/BookingView';
import MessagesView from '@/components/ui/MessagesView';
import ProfileView from '@/components/ui/ProfileView';

// this component now handles different routes instead of tabs
// removed bottom nav since we have the header now
const Index = () => {
  const location = useLocation();

  const renderView = () => {
    const path = location.pathname;
    
    // console.log('current path:', path);
    
    if (path === '/map') return <MapView />;
    if (path === '/events' || path === '/bookings') return <BookingsView />;
    if (path === '/messages') return <MessagesView />;
    if (path === '/profile') return <ProfileView />;
    // default to workshops/home view
    return <HomeView />;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-purple-50 dark:bg-[#1a1625] pt-16">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
