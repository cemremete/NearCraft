import { Heart, Star, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Workshop } from '@/data/workshops';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WorkshopCardProps {
  workshop: Workshop;
  variant?: 'default' | 'compact';
}

const WorkshopCard = ({ workshop, variant = 'default' }: WorkshopCardProps) => {
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  
  const spotsLeft = workshop.spotsTotal - workshop.spotsTaken;
  const isFull = spotsLeft === 0;
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= 3;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return t('beginner');
      case 'intermediate': return t('intermediate');
      case 'advanced': return t('advanced');
      default: return t('allLevels');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-20 h-20 flex-shrink-0">
          <img 
            src={workshop.image} 
            alt={workshop.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute top-1 left-1 text-lg">{workshop.categoryIcon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate text-gray-900 dark:text-white">{workshop.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            {workshop.distance}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {workshop.currency}{workshop.price}
            </span>
            <Badge variant={isFull ? "secondary" : "outline"} className="text-xs">
              {isFull ? 'Full' : `${spotsLeft} ${t('spotsLeft')}`}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={workshop.image} 
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
            "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 active:scale-90",
            isSaved && "text-red-500 dark:text-red-400"
          )}
        >
          <Heart 
            className={cn("w-5 h-5", isSaved && "fill-current")} 
          />
        </button>

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <span className="text-sm">{workshop.categoryIcon}</span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">{t(workshop.category)}</span>
        </div>

        {/* Date and time overlay */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-sm font-semibold">{formatDate(workshop.date)}</p>
          <p className="text-xs opacity-90">{workshop.time}</p>
        </div>

        {/* Availability indicator */}
        <div className={cn(
          "absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium",
          isFull ? "bg-gray-500 dark:bg-gray-600 text-white" :
          isAlmostFull ? "bg-orange-500 dark:bg-orange-600 text-white" :
          "bg-green-500 dark:bg-green-600 text-white"
        )}>
          {isFull ? 'Waitlist' : `${spotsLeft} ${t('spotsLeft')}`}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base line-clamp-1 text-gray-900 dark:text-white">{workshop.title}</h3>
          <div className="flex items-center gap-0.5 text-sm">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">{workshop.hostRating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {workshop.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {workshop.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {workshop.distance}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {workshop.spotsTotal}
          </span>
        </div>

        {/* Level badge */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            {getLevelLabel(workshop.level)}
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {workshop.currency}{workshop.price}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {t('perPerson')}
            </span>
          </div>
          <Button 
            size="sm" 
            disabled={isFull}
            className="touch-manipulation active:scale-95"
          >
            {isFull ? 'Join Waitlist' : t('bookNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
