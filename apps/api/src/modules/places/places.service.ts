import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RedisService } from '@/common/redis/redis.service';
import { PlaceCategory } from '@prisma/client';

@Injectable()
export class PlacesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async findAll(query: {
    district?: string;
    category?: PlaceCategory;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { district, category, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isActive: true };
    if (district) where.district = district;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search.toLowerCase()] } },
      ];
    }

    const [places, total] = await Promise.all([
      this.prisma.place.findMany({
        where,
        skip,
        take: limit,
        orderBy: { avgRating: 'desc' },
      }),
      this.prisma.place.count({ where }),
    ]);

    return {
      data: places,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const cached = await this.redis.getJson<Record<string, unknown>>(`place:${id}`);
    if (cached) return cached;

    const place = await this.prisma.place.findUnique({
      where: { id },
      include: {
        safetyAdvisories: {
          where: { isActive: true },
        },
      },
    });

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    await this.redis.setJson(`place:${id}`, place, 3600);
    return place;
  }

  async findNearby(lat: number, lng: number, radiusKm = 10, limit = 20) {
    const places = await this.prisma.$queryRaw`
      SELECT *,
        ST_Distance(
          ST_MakePoint(${lng}, ${lat})::geography,
          ST_MakePoint(longitude::float, latitude::float)::geography
        ) / 1000 as distance_km
      FROM wanderzee.places
      WHERE is_active = true
        AND ST_DWithin(
          ST_MakePoint(${lng}, ${lat})::geography,
          ST_MakePoint(longitude::float, latitude::float)::geography,
          ${radiusKm * 1000}
        )
      ORDER BY distance_km
      LIMIT ${limit}
    `;
    return places;
  }

  async getDistricts() {
    const cached = await this.redis.getJson<string[]>('karnataka:districts');
    if (cached) return cached;

    const districts = await this.prisma.place.findMany({
      select: { district: true },
      distinct: ['district'],
      orderBy: { district: 'asc' },
    });

    const districtList = districts.map((d) => d.district);
    await this.redis.setJson('karnataka:districts', districtList, 86400);
    return districtList;
  }
}
