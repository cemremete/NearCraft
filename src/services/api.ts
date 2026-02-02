import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  signup: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data)
};

// Workshops
export const workshopsAPI = {
  getNearby: (lat: number, lng: number, radius: number = 50) =>
    api.get('/workshops/nearby', { params: { latitude: lat, longitude: lng, radius } }),
  getById: (id: string) =>
    api.get(`/workshops/${id}`),
  create: (data: any) =>
    api.post('/workshops', data)
};

// Bookings
export const bookingsAPI = {
  create: (data: any) =>
    api.post('/bookings', data),
  getMyBookings: () =>
    api.get('/bookings/my')
};
