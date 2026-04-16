import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

interface AiResult {
  content: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

@Injectable()
export class GroqProvider {
  private client: Groq;
  private readonly logger = new Logger(GroqProvider.name);

  constructor(private configService: ConfigService) {
    this.client = new Groq({
      apiKey: configService.get<string>('GROQ_API_KEY'),
    });
  }

  async generate(
    prompt: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
      jsonMode?: boolean;
    },
  ): Promise<AiResult> {
    const model = options?.model ?? 'llama-3.3-70b-versatile';

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are WanderZee AI, an expert travel planner for Karnataka, India. You provide detailed, accurate, and culturally sensitive travel recommendations. Always respond in valid JSON when asked.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: options?.maxTokens ?? 4096,
        temperature: options?.temperature ?? 0.7,
        response_format: options?.jsonMode ? { type: 'json_object' } : undefined,
      });

      return {
        content: response.choices[0]?.message?.content ?? '',
        model,
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
      };
    } catch (error) {
      this.logger.error(`Groq API error: ${(error as Error).message}`);
      throw error;
    }
  }
}
