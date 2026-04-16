import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { GroqProvider } from './providers/groq.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { PromptBuilder } from './prompts/prompt-builder';
import { GenerateTripDto } from './dto/generate-trip.dto';
import { QuickChatDto } from './dto/quick-chat.dto';
import { RedisService } from '@/common/redis/redis.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PlacesService } from '../places/places.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private groq: GroqProvider,
    private gemini: GeminiProvider,
    private promptBuilder: PromptBuilder,
    private redis: RedisService,
    private prisma: PrismaService,
    private placesService: PlacesService,
  ) {}

  async generateTripPlan(userId: string, dto: GenerateTripDto) {
    const cacheKey = this.buildCacheKey(dto);
    const cached = await this.redis.getJson<Record<string, unknown>>(cacheKey);
    if (cached) {
      this.logger.log('Returning cached trip plan');
      return { ...cached, fromCache: true };
    }

    const places = await this.placesService.findAll({
      district: this.mapDestinationToDistrict(dto.destination),
      limit: 50,
    });

    const placesContext = places.data
      .map(
        (p) =>
          `- ${p.name} (${p.category}): ${p.description?.slice(0, 100) ?? ''}. Rating: ${p.avgRating}. Fee: ₹${p.entryFee ?? 0}. Time: ${p.avgTimeSpent ?? '?'} mins.`,
      )
      .join('\n');

    const prompt = this.promptBuilder.buildTripPlanPrompt(dto, placesContext);

    let result: { content: string; model: string; promptTokens: number; completionTokens: number };

    try {
      this.logger.log('Generating trip plan with Gemini...');
      result = await this.gemini.generate(prompt, { maxTokens: 8192, temperature: 0.7 });
    } catch (error) {
      this.logger.warn(`Gemini failed, falling back to Groq: ${(error as Error).message}`);
      result = await this.groq.generate(prompt, {
        maxTokens: 4096,
        temperature: 0.7,
        jsonMode: true,
      });
    }

    let tripPlan: Record<string, unknown>;
    try {
      let jsonStr = result.content;
      const jsonMatch = jsonStr.match(/```json\s*([\s\S]*?)```/);
      if (jsonMatch) jsonStr = jsonMatch[1];
      tripPlan = JSON.parse(jsonStr.trim()) as Record<string, unknown>;
    } catch {
      this.logger.error('Failed to parse AI response as JSON');
      throw new Error('AI generated an invalid response. Please try again.');
    }

    const trip = await this.prisma.trip.create({
      data: {
        userId,
        title: (tripPlan.title as string) || `Trip to ${dto.destination}`,
        tripType: dto.tripType,
        status: 'PLANNED',
        budgetLevel: dto.budgetLevel,
        estimatedBudget:
          (tripPlan.estimatedTotalBudget as Record<string, number>)?.max ?? dto.budgetAmount,
        currency: 'INR',
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        groupSize: dto.groupSize,
        groupComposition: dto.groupComposition,
        specialRequests: dto.specialRequests,
        aiModelUsed: result.model,
        aiPromptTokens: result.promptTokens,
        aiResponseTokens: result.completionTokens,
      },
    });

    const days = tripPlan.days as Array<Record<string, unknown>>;
    if (days) {
      for (const day of days) {
        const tripDay = await this.prisma.tripDay.create({
          data: {
            tripId: trip.id,
            dayNumber: day.dayNumber as number,
            date: new Date(day.date as string),
            title: day.title as string | undefined,
            summary: day.summary as string | undefined,
          },
        });

        const activities = day.activities as Array<Record<string, unknown>>;
        if (activities) {
          for (const activity of activities) {
            await this.prisma.tripActivity.create({
              data: {
                tripDayId: tripDay.id,
                orderIndex: activity.orderIndex as number,
                title: activity.title as string,
                description: activity.description as string | undefined,
                startTime: activity.startTime as string | undefined,
                endTime: activity.endTime as string | undefined,
                estimatedCost: activity.estimatedCost as number | undefined,
                activityType: activity.activityType as string | undefined,
                transportMode: activity.transportMode as string | undefined,
                notes: (activity.tips as string[] | undefined)?.join('; '),
              },
            });
          }
        }
      }
    }

    const response = {
      tripId: trip.id,
      plan: tripPlan,
      aiModel: result.model,
      tokensUsed: result.promptTokens + result.completionTokens,
    };

    await this.redis.setJson(cacheKey, response, 7200);
    return response;
  }

  private buildCacheKey(dto: GenerateTripDto): string {
    const keyData = `${dto.destination}-${dto.tripType}-${dto.budgetLevel}-${dto.startDate}-${dto.endDate}-${dto.groupSize}`;
    const hash = crypto.createHash('md5').update(keyData).digest('hex');
    return `trip-plan:${hash}`;
  }

  private mapDestinationToDistrict(destination: string): string {
    const mapping: Record<string, string> = {
      coorg: 'Kodagu',
      kodagu: 'Kodagu',
      madikeri: 'Kodagu',
      hampi: 'Vijayanagara',
      gokarna: 'Uttara Kannada',
      chikmagalur: 'Chikkamagaluru',
      chikkamagaluru: 'Chikkamagaluru',
      mysore: 'Mysuru',
      mysuru: 'Mysuru',
      bangalore: 'Bengaluru Urban',
      bengaluru: 'Bengaluru Urban',
      mangalore: 'Dakshina Kannada',
      mangaluru: 'Dakshina Kannada',
      udupi: 'Udupi',
    };
    return mapping[destination.toLowerCase()] ?? destination;
  }

  async quickChat(userId: string, dto: QuickChatDto) {
    // Build cache key for quick chat
    const cacheKey = `quick-chat:${crypto.createHash('md5').update(dto.query).digest('hex')}`;

    // Check cache first (1 hour TTL)
    const cached = await this.redis.getJson<{ answer: string }>(cacheKey);
    if (cached) {
      this.logger.log('Returning cached quick chat response');
      return { answer: cached.answer, cached: true };
    }

    // Build prompt for quick chat
    const prompt = `You are WanderZee AI. Answer this traveler's quick question about Karnataka travel. Be concise (max 200 words).

Question: ${dto.query}
${dto.context ? `Context: ${dto.context}` : ''}

Provide a direct, helpful answer.`;

    // Use Groq for fast responses
    try {
      this.logger.log('Generating quick chat response with Groq...');
      const result = await this.groq.generate(prompt, {
        maxTokens: 300,
        temperature: 0.7,
      });

      const answer = result.content.trim();

      // Cache the response
      await this.redis.setJson(cacheKey, { answer }, 3600);

      return { answer, cached: false };
    } catch (error) {
      this.logger.error(`Quick chat failed: ${(error as Error).message}`);
      throw new Error('Failed to generate quick chat response. Please try again.');
    }
  }
}
