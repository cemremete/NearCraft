import { Calendar, Clock, MapPin, QrCode } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { workshops } from '@/data/workshops';

const BookingsView = () => {
  const { t } = useLanguage();

  // Mock bookings
  const upcomingBookings = [workshops[0], workshops[3]];
  const pastBookings = [workshops[1]];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCountdown = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days` : 'Today';
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 font-serif">{t('bookings')}</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="upcoming" className="flex-1">
            {t('upcoming')}
            {upcomingBookings.length > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {upcomingBookings.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            {t('past')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div 
              key={booking.id}
              className="bg-card rounded-2xl border border-border p-4 shadow-sm"
            >
              <div className="flex gap-4">
                <img 
                  src={booking.image}
                  alt={booking.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-1">{booking.title}</h3>
                    <Badge className="text-xs shrink-0">
                      {getCountdown(booking.date)}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(booking.date)}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {booking.time} • {booking.duration}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {booking.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <QrCode className="w-4 h-4" />
                  Show QR
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Get Directions
                </Button>
              </div>
            </div>
          ))}

          {upcomingBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming bookings</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.map((booking) => (
            <div 
              key={booking.id}
              className="bg-card rounded-2xl border border-border p-4 shadow-sm opacity-80"
            >
              <div className="flex gap-4">
                <img 
                  src={booking.image}
                  alt={booking.title}
                  className="w-20 h-20 rounded-xl object-cover grayscale"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{booking.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(booking.date)}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Leave Review
                    </Button>
                    <Button variant="ghost" size="sm">
                      Book Again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsView;
