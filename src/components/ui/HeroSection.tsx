import { Search, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// placeholder hero img
const heroImage = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 mt-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Workshop atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/60 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-10 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3 font-serif">
          {t('discoverWorkshops')}
        </h1>
        <p className="text-sm sm:text-base text-primary-foreground/90 mb-6 max-w-md mx-auto">
          {t('heroSubtitle')}
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm rounded-full p-1.5 shadow-xl">
            <div className="flex items-center gap-2 flex-1 pl-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder={t('search')}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
            </div>
            <Button size="sm" className="rounded-full px-4 gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nearby')}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
      <div className="absolute bottom-4 right-4 w-32 h-32 bg-accent/30 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
