import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, Menu, X, Bell, Globe, Moon, Sun } from 'lucide-react';

// TODO: maybe add scroll effect to change header bg on scroll?
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as 'en' | 'tr' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // don't show header on auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white">NearCraft</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
            >
              {t('home')}
            </Link>
            <Link 
              to="/workshops" 
              className={`font-medium transition-colors ${isActive('/workshops') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
            >
              {t('workshops')}
            </Link>
            <Link 
              to="/map" 
              className={`font-medium transition-colors ${isActive('/map') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
            >
              {t('map')}
            </Link>
            <Link 
              to="/events" 
              className={`font-medium transition-colors ${isActive('/events') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
            >
              {t('events')}
            </Link>
            <Link 
              to="/messages" 
              className={`font-medium transition-colors ${isActive('/messages') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
            >
              {t('messages')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <select 
                value={language} 
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer text-sm font-medium appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TExIDEiIHN0cm9rZT0iIzZiNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-no-repeat bg-right-center pr-8"
              >
                <option value="en" className="text-gray-900 dark:text-gray-100">EN</option>
                <option value="it" className="text-gray-900 dark:text-gray-100">IT</option>
                <option value="tr" className="text-gray-900 dark:text-gray-100">TR</option>
                <option value="es" className="text-gray-900 dark:text-gray-100">ES</option>
                <option value="fr" className="text-gray-900 dark:text-gray-100">FR</option>
                <option value="de" className="text-gray-900 dark:text-gray-100">DE</option>
                <option value="pt" className="text-gray-900 dark:text-gray-100">PT</option>
                <option value="ja" className="text-gray-900 dark:text-gray-100">JA</option>
                <option value="ko" className="text-gray-900 dark:text-gray-100">KO</option>
                <option value="zh" className="text-gray-900 dark:text-gray-100">ZH</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>

            {/* Profile */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                {t('signIn')}
              </Link>
            )}
          </div>

          {/* Mobile menu btn */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="flex flex-col space-y-4 px-4">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link to="/workshops" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('workshops')}
              </Link>
              <Link to="/map" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('map')}
              </Link>
              <Link to="/events" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('events')}
              </Link>
              <Link to="/messages" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('messages')}
              </Link>
              <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('profile')}
              </Link>
              
              {/* Mobile Language & Theme */}
              <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('language')}</span>
                  <select 
                    value={language} 
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer text-sm"
                  >
                    <option value="en" className="text-gray-900 dark:text-gray-100">EN</option>
                    <option value="it" className="text-gray-900 dark:text-gray-100">IT</option>
                    <option value="tr" className="text-gray-900 dark:text-gray-100">TR</option>
                    <option value="es" className="text-gray-900 dark:text-gray-100">ES</option>
                    <option value="fr" className="text-gray-900 dark:text-gray-100">FR</option>
                    <option value="de" className="text-gray-900 dark:text-gray-100">DE</option>
                    <option value="pt" className="text-gray-900 dark:text-gray-100">PT</option>
                    <option value="ja" className="text-gray-900 dark:text-gray-100">JA</option>
                    <option value="ko" className="text-gray-900 dark:text-gray-100">KO</option>
                    <option value="zh" className="text-gray-900 dark:text-gray-100">ZH</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('darkMode')}</span>
                  <button 
                    onClick={toggleTheme}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {user && (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="text-left text-red-600 dark:text-red-400 font-medium"
                >
                  {t('logout')}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
