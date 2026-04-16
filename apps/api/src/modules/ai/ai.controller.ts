import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateTripDto } from './dto/generate-trip.dto';
import { QuickChatDto } from './dto/quick-chat.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

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
}
