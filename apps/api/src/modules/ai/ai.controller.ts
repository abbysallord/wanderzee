import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateTripDto } from './dto/generate-trip.dto';
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
}
