const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TODO: Add more robust error handling
// FIXME: Add rate limiting for auth endpoints

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Middleware for debugging
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// AUTH ENDPOINTS
app.post('/api/auth/signup', async (req, res) => {
  try {
    console.log('📝 Signup attempt for:', req.body.email);
    const { email, password, name } = req.body;
    
    // Email kontrolü
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed for:', email);
    
    // User oluştur
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });
    
    console.log('✅ User created:', user.id);
    
    // JWT token
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      user: { id: user.id, email: user.email, name: user.name }, 
      token 
    });
  } catch (error) {
    console.error('💥 Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt for:', req.body.email);
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log('✅ Login successful for:', email);
    
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      user: { id: user.id, email: user.email, name: user.name }, 
      token 
    });
  } catch (error) {
    console.error('💥 Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// WORKSHOPS ENDPOINTS
app.get('/api/workshops/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query;
    
    console.log('🔍 Fetching nearby workshops:', { latitude, longitude, radius });
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }
    
    // Haversine formula ile yakındaki workshop'ları bul
    const workshops = await prisma.$queryRaw`
      SELECT *, 
        (6371 * acos(
          cos(radians(${Number(latitude)})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${Number(longitude)})) +
          sin(radians(${Number(latitude)})) * sin(radians(latitude))
        )) AS distance
      FROM "Workshop"
      HAVING distance < ${Number(radius)}
      ORDER BY distance
      LIMIT 50
    `;
    
    console.log('✅ Found workshops:', (workshops as any[]).length);
    res.json({ workshops });
  } catch (error) {
    console.error('💥 Failed to fetch workshops:', error);
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
});

app.get('/api/workshops/:id', async (req, res) => {
  try {
    console.log('🔍 Fetching workshop:', req.params.id);
    
    const workshop = await prisma.workshop.findUnique({
      where: { id: req.params.id },
      include: {
        host: { select: { id: true, name: true } },
        reviews: { include: { user: { select: { name: true } } } }
      }
    });
    
    if (!workshop) {
      console.log('❌ Workshop not found:', req.params.id);
      return res.status(404).json({ error: 'Workshop not found' });
    }
    
    console.log('✅ Workshop found:', workshop.title);
    res.json(workshop);
  } catch (error) {
    console.error('💥 Failed to fetch workshop:', error);
    res.status(500).json({ error: 'Failed to fetch workshop' });
  }
});

// BOOKINGS ENDPOINT
app.post('/api/bookings', async (req, res) => {
  try {
    console.log('📝 Creating booking...');
    const { userId, workshopId, date, participants } = req.body;
    
    const workshop = await prisma.workshop.findUnique({ 
      where: { id: workshopId } 
    });
    
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    
    const booking = await prisma.booking.create({
      data: {
        userId,
        workshopId,
        date: new Date(date),
        participants,
        totalPrice: workshop.price * participants,
        status: 'pending'
      }
    });
    
    console.log('✅ Booking created:', booking.id);
    res.json(booking);
  } catch (error) {
    console.error('💥 Booking failed:', error);
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
