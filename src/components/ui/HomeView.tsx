import { ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import CategoryChips from './CategoryChips';
import WorkshopCard from './WorkshopCard';
import { workshops } from '@/data/workshops';

// workshops listing page - desktop friendly version
const HomeView = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkshops = workshops.filter(w => {
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-12 bg-purple-50 dark:bg-[#1a1625] min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          {t('featured')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{t('tagline')}</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <CategoryChips 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-900 dark:text-white">{filteredWorkshops.length}</span> {t('workshops').toLowerCase()}
        </p>
        <Button variant="ghost" size="sm" className="gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
          {t('viewAll')}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Workshop Grid - responsive columns */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      {filteredWorkshops.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('noResults') || 'No workshops found'}</h3>
          <p className="text-gray-600 dark:text-gray-400">{t('tryAdjusting') || 'Try adjusting your search or filters'}</p>
        </div>
      )}
    </div>
  );
};

export default HomeView;
