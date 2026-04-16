import { PrismaClient, PlaceCategory } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding WanderZee database...');

  const places = [
    // Bengaluru
    {
      name: 'Lalbagh Botanical Garden',
      nameKannada: 'ಲಾಲ್‌ಬಾಗ್ ಸಸ್ಯೋದ್ಯಾನ',
      description: 'Historic botanical garden with a famous glass house, spread over 240 acres in the heart of Bangalore.',
      category: PlaceCategory.PARK_GARDEN,
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      latitude: new Decimal('12.95070000'),
      longitude: new Decimal('77.58480000'),
      avgTimeSpent: 120,
      entryFee: new Decimal('30'),
      openingTime: '06:00',
      closingTime: '19:00',
      tags: ['garden', 'nature', 'heritage', 'photography', 'family-friendly'],
      isVerified: true,
    },
    {
      name: 'Bangalore Palace',
      nameKannada: 'ಬೆಂಗಳೂರು ಅರಮನೆ',
      description: "Tudor-style palace built in 1887, inspired by England's Windsor Castle.",
      category: PlaceCategory.PALACE,
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      latitude: new Decimal('12.99880000'),
      longitude: new Decimal('77.59210000'),
      avgTimeSpent: 90,
      entryFee: new Decimal('230'),
      openingTime: '10:00',
      closingTime: '17:30',
      tags: ['heritage', 'palace', 'photography', 'history'],
      isVerified: true,
    },
    {
      name: 'ISKCON Temple Bangalore',
      nameKannada: 'ಇಸ್ಕಾನ್ ದೇವಸ್ಥಾನ',
      description: 'One of the largest ISKCON temples in the world, dedicated to Lord Krishna.',
      category: PlaceCategory.TEMPLE,
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      latitude: new Decimal('13.00980000'),
      longitude: new Decimal('77.55110000'),
      avgTimeSpent: 90,
      entryFee: new Decimal('0'),
      openingTime: '04:15',
      closingTime: '20:30',
      dressCode: 'Conservative clothing recommended. No shorts or sleeveless tops.',
      culturalNotes: 'Remove footwear before entering. Photography may be restricted inside the main sanctum.',
      tags: ['temple', 'religious', 'spiritual', 'architecture', 'vegetarian-food'],
      isVerified: true,
    },
    // Coorg (Kodagu)
    {
      name: 'Abbey Falls',
      nameKannada: 'ಅಬ್ಬೆ ಜಲಪಾತ',
      description: 'Scenic waterfall located between coffee plantations and spice estates in Madikeri.',
      category: PlaceCategory.WATERFALL,
      district: 'Kodagu',
      city: 'Madikeri',
      latitude: new Decimal('12.45630000'),
      longitude: new Decimal('75.72940000'),
      avgTimeSpent: 60,
      entryFee: new Decimal('15'),
      openingTime: '09:00',
      closingTime: '17:00',
      bestTimeToVisit: ['monsoon', 'post-monsoon'],
      tags: ['waterfall', 'nature', 'photography', 'coorg', 'trekking'],
      isVerified: true,
    },
    {
      name: "Raja's Seat",
      nameKannada: 'ರಾಜ ಸೀಟ್',
      description: 'Famous garden and viewpoint where Kodagu kings used to watch the sunset.',
      category: PlaceCategory.VIEWPOINT,
      district: 'Kodagu',
      city: 'Madikeri',
      latitude: new Decimal('12.42260000'),
      longitude: new Decimal('75.73680000'),
      avgTimeSpent: 60,
      entryFee: new Decimal('10'),
      openingTime: '05:30',
      closingTime: '19:30',
      bestTimeToVisit: ['evening'],
      tags: ['viewpoint', 'sunset', 'garden', 'coorg', 'family-friendly'],
      isVerified: true,
    },
    // Hampi
    {
      name: 'Virupaksha Temple',
      nameKannada: 'ವಿರೂಪಾಕ್ಷ ದೇವಸ್ಥಾನ',
      description: 'Ancient temple dedicated to Lord Shiva, part of the UNESCO World Heritage Site of Hampi.',
      category: PlaceCategory.TEMPLE,
      district: 'Vijayanagara',
      city: 'Hampi',
      latitude: new Decimal('15.33500000'),
      longitude: new Decimal('76.46000000'),
      avgTimeSpent: 90,
      entryFee: new Decimal('0'),
      openingTime: '06:00',
      closingTime: '18:00',
      dressCode: 'Conservative clothing recommended.',
      culturalNotes: 'Active Hindu temple. Remove footwear. Be respectful during aarti times.',
      tags: ['temple', 'UNESCO', 'heritage', 'hampi', 'history', 'architecture'],
      isVerified: true,
    },
    {
      name: 'Vittala Temple Complex',
      nameKannada: 'ವಿಠ್ಠಲ ದೇವಸ್ಥಾನ',
      description: 'Famous for its stone chariot and musical pillars, a masterpiece of Vijayanagara architecture.',
      category: PlaceCategory.HERITAGE,
      district: 'Vijayanagara',
      city: 'Hampi',
      latitude: new Decimal('15.34310000'),
      longitude: new Decimal('76.47280000'),
      avgTimeSpent: 120,
      entryFee: new Decimal('40'),
      openingTime: '06:00',
      closingTime: '18:00',
      tags: ['heritage', 'UNESCO', 'hampi', 'architecture', 'must-visit'],
      isVerified: true,
    },
    // Gokarna
    {
      name: 'Om Beach',
      nameKannada: 'ಓಂ ಬೀಚ್',
      description: 'Iconic beach shaped like the Om symbol, popular for surfing and relaxation.',
      category: PlaceCategory.BEACH,
      district: 'Uttara Kannada',
      city: 'Gokarna',
      latitude: new Decimal('14.52160000'),
      longitude: new Decimal('74.31780000'),
      avgTimeSpent: 180,
      entryFee: new Decimal('0'),
      bestTimeToVisit: ['winter', 'post-monsoon'],
      tags: ['beach', 'gokarna', 'surfing', 'relaxation', 'sunset'],
      isVerified: true,
    },
    // Chikmagalur
    {
      name: 'Mullayanagiri Peak',
      nameKannada: 'ಮುಳ್ಳಯ್ಯನಗಿರಿ',
      description: 'Highest peak in Karnataka at 1,930m, offering stunning views and trekking trails.',
      category: PlaceCategory.NATURE,
      district: 'Chikkamagaluru',
      city: 'Chikmagalur',
      latitude: new Decimal('13.39240000'),
      longitude: new Decimal('75.72260000'),
      avgTimeSpent: 180,
      bestTimeToVisit: ['winter', 'post-monsoon'],
      culturalNotes: 'There is a small Shiva temple at the peak.',
      tags: ['trekking', 'nature', 'peak', 'adventure', 'photography', 'chikmagalur'],
      isVerified: true,
    },
    // Mysuru
    {
      name: 'Mysore Palace',
      nameKannada: 'ಮೈಸೂರು ಅರಮನೆ',
      description: 'The magnificent royal palace of the Wodeyar dynasty, lit up with 97,000 bulbs on Sundays and public holidays.',
      category: PlaceCategory.PALACE,
      district: 'Mysuru',
      city: 'Mysuru',
      latitude: new Decimal('12.30510000'),
      longitude: new Decimal('76.65510000'),
      avgTimeSpent: 120,
      entryFee: new Decimal('70'),
      openingTime: '10:00',
      closingTime: '17:30',
      dressCode: 'Shoes must be removed. Cameras not allowed inside.',
      tags: ['palace', 'heritage', 'mysore', 'must-visit', 'architecture', 'lighting'],
      isVerified: true,
    },
  ];

  for (const place of places) {
    await prisma.place.create({ data: place });
  }

  console.log(`✅ Seeded ${places.length} places`);

  const advisories = [
    {
      title: 'Western Ghats Monsoon Travel',
      description: 'Heavy rainfall and landslide risk in Kodagu, Chikmagalur, and Uttara Kannada districts during June-September. Check road conditions before traveling.',
      severity: 'HIGH' as const,
      district: 'Kodagu',
      validFrom: new Date('2024-06-01'),
      validUntil: new Date('2024-09-30'),
      source: 'Karnataka State Disaster Management Authority',
    },
    {
      title: 'Hampi Summer Heat Advisory',
      description: 'Temperatures in Hampi can exceed 40°C during March-May. Carry water, wear sun protection, and avoid midday exploration.',
      severity: 'MEDIUM' as const,
      district: 'Vijayanagara',
      validFrom: new Date('2024-03-01'),
      validUntil: new Date('2024-05-31'),
      source: 'Local Tourism Office',
    },
  ];

  for (const advisory of advisories) {
    await prisma.safetyAdvisory.create({ data: advisory });
  }

  console.log(`✅ Seeded ${advisories.length} safety advisories`);
  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
