import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { AiUsageService, MonthlyUsage } from './ai-usage.service';
import { GenerateTripDto } from './dto/generate-trip.dto';
import { QuickChatDto } from './dto/quick-chat.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(
    private aiService: AiService,
    private usageService: AiUsageService,
  ) {}

  @Post('generate-trip')
  @ApiOperation({ summary: 'Generate an AI trip plan' })
  generateTrip(@CurrentUser('id') userId: string, @Body() dto: GenerateTripDto) {
    return this.aiService.generateTripPlan(userId, dto);
  }

  @Post('quick-chat')
  @ApiOperation({ summary: 'Quick travel Q&A via fast Groq AI' })
  @ApiResponse({ status: 200, description: 'Quick chat response', schema: { example: { answer: 'Kerala is known for...', cached: false } } })
  quickChat(@CurrentUser('id') userId: string, @Body() dto: QuickChatDto) {
    return this.aiService.quickChat(userId, dto);
  }

  @Get('usage')
  @ApiOperation({ summary: 'Get current user\'s monthly AI usage stats' })
  @ApiResponse({
    status: 200,
    description: 'Monthly AI usage statistics',
    schema: {
      example: {
        tripPlansGenerated: 2,
        totalTokens: 15000,
      },
    },
  })
  getUsageStats(@CurrentUser('id') userId: string): Promise<MonthlyUsage> {
    return this.usageService.getMonthlyUsage(userId);
  }
}
