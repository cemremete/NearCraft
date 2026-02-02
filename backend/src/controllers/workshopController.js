const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

console.log('✅ Workshop controller loaded with Prisma client');

const getNearbyWorkshops = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;
    
    console.log('🔍 Nearby workshops request received');
    console.log('📍 Parameters:', { latitude, longitude, radius });
    
    // Şimdilik tüm workshop'ları döndür
    const workshops = await prisma.workshop.findMany({
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    console.log(`✅ Found ${workshops.length} workshops`);
    res.json(workshops);
    
  } catch (error) {
    console.error('❌ ERROR in getNearbyWorkshops:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch workshops',
      details: error.message 
    });
  }
};

const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await prisma.workshop.findMany({
      include: {
        host: true
      }
    });
    res.json(workshops);
  } catch (error) {
    console.error('❌ ERROR in getAllWorkshops:', error);
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
};

module.exports = {
  getNearbyWorkshops,
  getAllWorkshops
};
