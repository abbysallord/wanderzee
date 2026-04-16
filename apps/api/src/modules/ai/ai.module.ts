import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiUsageService } from './ai-usage.service';
import { GroqProvider } from './providers/groq.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { PromptBuilder } from './prompts/prompt-builder';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [PlacesModule],
  controllers: [AiController],
  providers: [AiService, AiUsageService, GroqProvider, GeminiProvider, PromptBuilder],
  exports: [AiService],
})
export class AiModule {}
