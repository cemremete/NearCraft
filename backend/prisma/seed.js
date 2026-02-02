const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Test user
  const testPassword = await bcrypt.hash('test123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@nearcraft.com' },
    update: {},
    create: {
      email: 'test@nearcraft.com',
      name: 'Test User',
      password: testPassword
    }
  });
  console.log('✅ Test user created');

  // Host user
  const hostPassword = await bcrypt.hash('host123', 10);
  const host = await prisma.user.upsert({
    where: { email: 'host@nearcraft.com' },
    update: {},
    create: {
      email: 'host@nearcraft.com',
      name: 'Workshop Host',
      password: hostPassword
    }
  });
  console.log('✅ Host user created');

  // Workshops
  const workshops = [
    {
      title: 'Artisan Candle Making',
      description: 'Learn candle making',
      category: 'candlemaking',
      price: 45,
      duration: 120,
      maxParticipants: 12,
      latitude: 38.7223,
      longitude: -9.1393,
      address: 'Rua Augusta 123',
      city: 'Lisboa',
      country: 'Portugal',
      imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400',
      hostId: host.id
    },
    {
      title: 'Pottery Wheel Class',
      description: 'Create ceramic pieces',
      category: 'pottery',
      price: 65,
      duration: 180,
      maxParticipants: 8,
      latitude: 38.7169,
      longitude: -9.1399,
      address: 'Avenida da Liberdade 45',
      city: 'Lisboa',
      country: 'Portugal',
      imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
      hostId: host.id
    }
  ];

  for (const workshop of workshops) {
    await prisma.workshop.create({ data: workshop });
    console.log(`✅ Created: ${workshop.title}`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
