export interface Booking {
  id: string;
  workshopId: string;
  workshopTitle: string;
  workshopImage: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

const BOOKINGS_KEY = 'nearcraft_bookings';

const getBookingsKey = (userId: string) => `${BOOKINGS_KEY}_${userId}`;

export const getBookings = (userId: string): Booking[] => {
  try {
    const bookingsJson = localStorage.getItem(getBookingsKey(userId));
    return bookingsJson ? JSON.parse(bookingsJson) : [];
  } catch {
    return [];
  }
};

export const getUpcomingBookings = (userId: string): Booking[] => {
  const bookings = getBookings(userId);
  const now = new Date();
  return bookings.filter(b => {
    const bookingDate = new Date(b.date);
    return bookingDate >= now && b.status === 'upcoming';
  });
};

export const getPastBookings = (userId: string): Booking[] => {
  const bookings = getBookings(userId);
  const now = new Date();
  return bookings.filter(b => {
    const bookingDate = new Date(b.date);
    return bookingDate < now || b.status === 'completed';
  });
};

export const addBooking = (userId: string, booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const bookings = getBookings(userId);
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(getBookingsKey(userId), JSON.stringify(bookings));
  return newBooking;
};

export const cancelBooking = (userId: string, bookingId: string): boolean => {
  const bookings = getBookings(userId);
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    bookings[index].status = 'cancelled';
    localStorage.setItem(getBookingsKey(userId), JSON.stringify(bookings));
    return true;
  }
  return false;
};

export const getBookingCount = (userId: string): number => {
  return getUpcomingBookings(userId).length;
};

export const getTotalBookingsCount = (userId: string): number => {
  return getBookings(userId).length;
};
