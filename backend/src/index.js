const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TODO: Add more robust error handling
// FIXME: Add rate limiting for auth endpoints

dotenv.config();

console.log('📦 Loading workshop routes...');
const workshopRoutes = require('./routes/workshops');
console.log('✅ Workshop routes loaded successfully');

const app = express();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

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
      process.env.JWT_SECRET,
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
      process.env.JWT_SECRET,
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

// WORKSHOP ROUTES
console.log('🔗 Registering workshop routes at /api/workshops');
app.use('/api/workshops', workshopRoutes);
console.log('✅ Workshop routes registered');

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
