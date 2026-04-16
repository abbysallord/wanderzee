import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RedisService } from '@/common/redis/redis.service';

@Injectable()
export class SafetyService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getActiveAdvisories(district?: string) {
    const cacheKey = `safety:advisories:${district ?? 'all'}`;
    const cached = await this.redis.getJson<unknown[]>(cacheKey);
    if (cached) return cached;

    const where: Record<string, unknown> = {
      isActive: true,
      OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
    };

    if (district) where.district = district;

    const advisories = await this.prisma.safetyAdvisory.findMany({
      where,
      orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
    });

    await this.redis.setJson(cacheKey, advisories, 1800);
    return advisories;
  }

  getEmergencyContacts(_district: string) {
    return {
      police: { number: '100', description: 'Police Emergency' },
      ambulance: { number: '108', description: 'Karnataka Ambulance Service' },
      fire: { number: '101', description: 'Fire Emergency' },
      womenHelpline: { number: '181', description: 'Women Helpline' },
      tourismHelpline: { number: '1800-425-5255', description: 'Karnataka Tourism Helpline' },
      disasterManagement: { number: '1078', description: 'Disaster Management' },
    };
  }
}
