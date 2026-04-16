import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { RedisService } from '@/common/redis/redis.service';
import { PrismaService } from '@/common/prisma/prisma.service';

interface MonthlyUsage {
  tripPlansGenerated: number;
  totalTokens: number;
}

@Injectable()
export class AiUsageService {
  private readonly logger = new Logger(AiUsageService.name);
  private readonly FREE_TIER_LIMIT = 3; // 3 trip plans per month

  constructor(
    private redis: RedisService,
    private prisma: PrismaService,
  ) {}

  async trackUsage(
    userId: string,
    model: string,
    promptTokens: number,
    completionTokens: number,
  ): Promise<void> {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const key = `ai-usage:${userId}:${monthKey}`;

    // Get current usage
    const current = await this.redis.getJson<Record<string, number>>(key);

    const updated = {
      tripPlansGenerated: (current?.tripPlansGenerated ?? 0) + 1,
      totalTokens: (current?.totalTokens ?? 0) + promptTokens + completionTokens,
    };

    // Set with expiry (45 days to ensure we cover full month + some buffer)
    await this.redis.setJson(key, updated, 45 * 24 * 60 * 60);

    this.logger.log(
      `Tracked AI usage for user ${userId}: ${updated.tripPlansGenerated} trips, ${updated.totalTokens} tokens`,
    );
  }

  async getMonthlyUsage(userId: string): Promise<MonthlyUsage> {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const key = `ai-usage:${userId}:${monthKey}`;

    const usage = await this.redis.getJson<MonthlyUsage>(key);
    return usage ?? { tripPlansGenerated: 0, totalTokens: 0 };
  }

  async canGenerateTrip(userId: string, userRole: string): Promise<boolean> {
    // Pro users have unlimited access
    if (userRole === 'PRO') {
      return true;
    }

    // Check FREE tier limit
    const usage = await this.getMonthlyUsage(userId);
    return usage.tripPlansGenerated < this.FREE_TIER_LIMIT;
  }
}
