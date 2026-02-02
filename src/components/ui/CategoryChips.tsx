import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/workshops';

interface CategoryChipsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryChips = ({ selectedCategory, onCategoryChange }: CategoryChipsProps) => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-200",
              "text-sm font-medium touch-manipulation active:scale-95",
              isActive
                ? "bg-purple-600 text-white shadow-md dark:bg-purple-500 dark:text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400"
            )}
          >
            <span className="text-base">{category.icon}</span>
            <span>{t(category.key)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
