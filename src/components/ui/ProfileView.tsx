import { 
  Settings, ChevronRight, Award, Heart, Users, Calendar, 
  Globe, Bell, LogOut, Camera, Edit2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';

// badge data - probably should come from backend eventually
// TODO: Make this dynamic based on user's actual achievements
// FIXME: These hardcoded badges are just for demo purposes
const badges = [
  { id: '1', name: 'First Timer', icon: '🌟', earned: true },
  { id: '2', name: 'Candle Master', icon: '🕯️', earned: true },
  { id: '3', name: 'Social Butterfly', icon: '🦋', earned: false },
  { id: '4', name: 'Explorer', icon: '🧭', earned: false },
  { id: '5', name: 'Pottery Pro', icon: '🏺', earned: false },
  { id: '6', name: 'Creative Soul', icon: '🎨', earned: false },
];

const ProfileView = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // This was added after users couldn't see their initials
  const userInitials = user?.name?.charAt(0).toUpperCase() || 'U';
  
  console.log('👤 ProfileView component loaded for user:', user?.name); // Debug trace

  const handleLogout = () => {
    // Added confirmation after accidental logouts
    if (window.confirm('Are you sure you want to log out?')) {
      console.log('👋 User logging out...'); // Debug trace
      logout();
      navigate('/login');
    }
  };

  // Old approach was using user.name, but we switched to username
  // const oldInitials = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2">
          {t('profile')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center relative">
            {/* Settings button */}
            <button className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                <AvatarFallback className="text-3xl bg-purple-600 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User Info */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{user?.name || 'User'}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{user?.email || 'Craft enthusiast'}</p>

            {/* Edit Profile Button */}
            <button 
              onClick={() => {
                console.log('✏️ Edit profile clicked - not implemented yet'); // Debug trace
                // TODO: Implement profile editing functionality
              }}
              className="w-full px-6 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-full font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>

            {/* Stats - These are hardcoded for now, should come from API */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
              <div>
                {/* TODO: Get actual workshop count from API */}
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Workshops</p>
                {/* This was inefficient - should be a single API call */}
                <p className="text-xs text-gray-400 text-center mt-1">📊 From database</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">24</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Friends</p>
                <p className="text-xs text-gray-400 text-center mt-1">👥 Social</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
                <p className="text-xs text-gray-400 text-center mt-1">🏆 Achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Badges Section - This should be dynamic based on user achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                My Badges
              </h3>
              <button 
                onClick={() => {
                  console.log('🏆 View all badges clicked - not implemented'); // Debug trace
                  // TODO: Implement badges page
                }}
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 text-sm"
              >
                View All
              </button>
            </div>
            {/* This mapping is inefficient - should use proper component */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${badge.earned ? 'hover:bg-purple-50 dark:hover:bg-purple-900/20' : 'opacity-40'}`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${badge.earned ? 'bg-purple-100 dark:bg-purple-800/50' : 'bg-gray-100 dark:bg-gray-700/50'}`}>
                    <span className="filter dark:brightness-125">{badge.icon}</span>
                  </div>
                  <span className="text-xs text-center text-gray-600 dark:text-gray-300 font-medium">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <button className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700/50 transition-colors">
                  <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Saved Workshops</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">8 saved</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700/50 transition-colors">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">My Friends</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">24 friends</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700/50 transition-colors">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Workshop History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">View past workshops</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-800/50 rounded-full flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-700/50 transition-colors">
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-red-600 dark:text-red-400">Log Out</p>
                  <p className="text-sm text-red-400 dark:text-red-500">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('settings')}</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors cursor-pointer">
                <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="flex-1 text-gray-900 dark:text-gray-100">{t('language')}</span>
                <span className="text-gray-500 dark:text-gray-400">English</span>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>

              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="flex-1 text-gray-900 dark:text-gray-100">{t('notifications')}</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileView;
