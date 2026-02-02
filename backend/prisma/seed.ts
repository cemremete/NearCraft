import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Veritabanı seed ediliyor...');

  // Test kullanıcısı
  const testPassword = await bcrypt.hash('test123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@nearcraft.com' },
    update: {},
    create: {
      email: 'test@nearcraft.com',
      name: 'Test Kullanıcı',
      password: testPassword
    }
  });
  console.log('✅ Test kullanıcı oluşturuldu:', testUser.email);

  // Workshop host
  const hostPassword = await bcrypt.hash('host123', 10);
  const host = await prisma.user.upsert({
    where: { email: 'host@nearcraft.com' },
    update: {},
    create: {
      email: 'host@nearcraft.com',
      name: 'Workshop Sahibi',
      password: hostPassword
    }
  });
  console.log('✅ Host kullanıcı oluşturuldu:', host.email);

  // Workshop'lar (Lizbon yakınında)
  const workshopsData = [
    {
      title: 'Artisan Candle Making',
      description: 'Doğal malzemelerle güzel kokulu mumlar yapmayı öğrenin',
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
      title: 'Pottery Wheel Basics',
      description: 'Kendi seramik parçanızı oluşturacağınız uygulamalı çömlekçilik dersi',
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
    },
    {
      title: 'Embroidery Basics',
      description: 'Nakış temellerini öğrenin ve güzel bir parça oluşturun',
      category: 'sewing',
      price: 35,
      duration: 150,
      maxParticipants: 10,
      latitude: 38.7077,
      longitude: -9.1365,
      address: 'Rua do Carmo 78',
      city: 'Lisboa',
      country: 'Portugal',
      imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400',
      hostId: host.id
    },
    {
      title: 'Abstract Painting',
      description: 'Renklerle kendinizi ifade edin ve soyut sanat yaratın',
      category: 'painting',
      price: 55,
      duration: 180,
      maxParticipants: 15,
      latitude: 38.7250,
      longitude: -9.1500,
      address: 'Praça do Comércio 10',
      city: 'Lisboa',
      country: 'Portugal',
      imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
      hostId: host.id
    }
  ];

  for (const workshopData of workshopsData) {
    const workshop = await prisma.workshop.create({
      data: workshopData
    });
    console.log('✅ Workshop oluşturuldu:', workshop.title);
  }

  console.log('🎉 Seed tamamlandı!');
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
